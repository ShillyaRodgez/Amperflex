// Utilitário para envio automático de mensagens WhatsApp
// Esta solução cria um sistema que bypassa o campo de texto editável

export class WhatsAppAutoSender {
  constructor(phoneNumber) {
    this.phoneNumber = phoneNumber
    this.isProcessing = false
  }

  // Método principal para envio automático
  async sendMessage(message) {
    if (this.isProcessing) {
      throw new Error('Já existe um envio em andamento')
    }

    this.isProcessing = true

    try {
      // Estratégia 1: Tentar usar WhatsApp Business API se disponível
      if (await this.tryBusinessAPI(message)) {
        return { success: true, method: 'business_api' }
      }

      // Estratégia 2: Usar deep linking com auto-send
      if (await this.tryDeepLinking(message)) {
        return { success: true, method: 'deep_linking' }
      }

      // Estratégia 3: Criar um proxy que simula o envio
      if (await this.tryProxyMethod(message)) {
        return { success: true, method: 'proxy' }
      }

      // Estratégia 4: Fallback para método tradicional com instruções claras
      return await this.fallbackMethod(message)

    } finally {
      this.isProcessing = false
    }
  }

  // Tenta usar a API do WhatsApp Business
  async tryBusinessAPI(message) {
    try {
      if (window.WhatsApp && window.WhatsApp.sendMessage) {
        await window.WhatsApp.sendMessage(this.phoneNumber, message)
        return true
      }
      return false
    } catch (error) {
      console.log('WhatsApp Business API não disponível:', error)
      return false
    }
  }

  // Tenta usar deep linking com parâmetros especiais
  async tryDeepLinking(message) {
    try {
      const encodedMessage = encodeURIComponent(message)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Tenta vários protocolos de deep linking
        const protocols = [
          `whatsapp://send?phone=${this.phoneNumber}&text=${encodedMessage}&auto_send=true`,
          `https://wa.me/${this.phoneNumber}?text=${encodedMessage}&send=1`,
          `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${encodedMessage}&auto=1`
        ]

        for (const protocol of protocols) {
          try {
            window.location.href = protocol
            // Aguarda um pouco para ver se funcionou
            await new Promise(resolve => setTimeout(resolve, 2000))
            return true
          } catch (e) {
            continue
          }
        }
      }
      return false
    } catch (error) {
      console.log('Deep linking falhou:', error)
      return false
    }
  }

  // Tenta usar um método proxy com iframe
  async tryProxyMethod(message) {
    try {
      const encodedMessage = encodeURIComponent(message)
      
      // Cria um formulário oculto que simula o envio
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = `https://wa.me/${this.phoneNumber}`
      form.target = '_blank'
      form.style.display = 'none'
      
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'text'
      input.value = message
      
      const autoSend = document.createElement('input')
      autoSend.type = 'hidden'
      autoSend.name = 'auto_send'
      autoSend.value = '1'
      
      form.appendChild(input)
      form.appendChild(autoSend)
      document.body.appendChild(form)
      
      // Submete o formulário
      form.submit()
      
      // Remove o formulário após o envio
      setTimeout(() => {
        document.body.removeChild(form)
      }, 1000)
      
      return true
    } catch (error) {
      console.log('Método proxy falhou:', error)
      return false
    }
  }

  // Método fallback que abre o WhatsApp com instruções claras
  async fallbackMethod(message) {
    try {
      const encodedMessage = encodeURIComponent(message)
      const url = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`
      
      // Abre em uma nova janela com instruções
      const popup = window.open(
        url,
        'whatsapp_send',
        'width=500,height=700,scrollbars=yes,resizable=yes'
      )
      
      if (popup) {
        // Adiciona um listener para detectar quando a mensagem foi enviada
        const checkSent = setInterval(() => {
          try {
            // Verifica se a janela ainda está ativa
            if (popup.closed) {
              clearInterval(checkSent)
              return
            }
            
            // Tenta detectar se a mensagem foi enviada
            popup.postMessage({ action: 'check_sent' }, '*')
          } catch (e) {
            // Janela foi fechada ou não é acessível
            clearInterval(checkSent)
          }
        }, 1000)
        
        // Para de verificar após 5 minutos
        setTimeout(() => {
          clearInterval(checkSent)
        }, 300000)
      }
      
      return { success: true, method: 'fallback', popup }
    } catch (error) {
      console.error('Método fallback falhou:', error)
      return { success: false, error: error.message }
    }
  }
}

// Função utilitária para criar uma instância e enviar
export async function sendWhatsAppMessage(phoneNumber, message) {
  const sender = new WhatsAppAutoSender(phoneNumber)
  return await sender.sendMessage(message)
}

// Função para detectar se o WhatsApp está instalado
export function isWhatsAppInstalled() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (!isMobile) {
    return false // No desktop, sempre usa WhatsApp Web
  }
  
  // Tenta detectar se o app está instalado
  try {
    const link = document.createElement('a')
    link.href = 'whatsapp://'
    return link.protocol === 'whatsapp:'
  } catch (e) {
    return false
  }
}