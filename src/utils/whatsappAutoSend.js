// Script para automação de envio no WhatsApp Web
// Este script tenta automatizar o processo de envio

export class WhatsAppAutomation {
  constructor() {
    this.isActive = false
    this.messageToSend = ''
    this.attempts = 0
    this.maxAttempts = 10
  }

  // Inicia o processo de automação
  startAutomation(message) {
    this.messageToSend = message
    this.isActive = true
    this.attempts = 0
    
    // Adiciona listener para detectar quando o WhatsApp Web carrega
    this.addMessageListener()
    
    // Inicia tentativas de automação
    this.attemptAutoSend()
  }

  // Adiciona listener para comunicação entre janelas
  addMessageListener() {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.action === 'whatsapp_loaded') {
        this.attemptAutoSend()
      }
    })
  }

  // Tenta automatizar o envio
  attemptAutoSend() {
    if (!this.isActive || this.attempts >= this.maxAttempts) {
      return
    }

    this.attempts++

    // Estratégia 1: Tentar usar seletores do WhatsApp Web
    setTimeout(() => {
      this.tryWhatsAppWebAutomation()
    }, 1000 * this.attempts)

    // Estratégia 2: Tentar simular eventos de teclado
    setTimeout(() => {
      this.tryKeyboardSimulation()
    }, 2000 * this.attempts)

    // Estratégia 3: Tentar usar clipboard
    setTimeout(() => {
      this.tryClipboardMethod()
    }, 3000 * this.attempts)
  }

  // Tenta automatizar usando seletores do WhatsApp Web
  tryWhatsAppWebAutomation() {
    try {
      // Seletores comuns do WhatsApp Web
      const selectors = [
        '[data-testid="conversation-compose-box-input"]',
        '[contenteditable="true"][data-tab="10"]',
        'div[contenteditable="true"][role="textbox"]',
        '._13NKt[contenteditable="true"]',
        '.selectable-text[contenteditable="true"]'
      ]

      for (const selector of selectors) {
        const textBox = document.querySelector(selector)
        if (textBox) {
          // Limpa o campo
          textBox.innerHTML = ''
          textBox.textContent = ''
          
          // Insere a mensagem
          textBox.innerHTML = this.messageToSend.replace(/\n/g, '<br>')
          textBox.textContent = this.messageToSend
          
          // Dispara eventos
          textBox.dispatchEvent(new Event('input', { bubbles: true }))
          textBox.dispatchEvent(new Event('change', { bubbles: true }))
          
          // Tenta encontrar e clicar no botão de envio
          setTimeout(() => {
            this.clickSendButton()
          }, 500)
          
          return true
        }
      }
    } catch (error) {
      console.log('Automação WhatsApp Web falhou:', error)
    }
    return false
  }

  // Tenta clicar no botão de envio
  clickSendButton() {
    const sendSelectors = [
      '[data-testid="send"]',
      '[data-icon="send"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="Enviar"]',
      'span[data-icon="send"]'
    ]

    for (const selector of sendSelectors) {
      const sendButton = document.querySelector(selector)
      if (sendButton) {
        sendButton.click()
        this.isActive = false
        return true
      }
    }
    return false
  }

  // Simula eventos de teclado
  tryKeyboardSimulation() {
    try {
      // Simula Ctrl+A para selecionar tudo
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'a',
        ctrlKey: true,
        bubbles: true
      }))

      // Simula digitação da mensagem
      setTimeout(() => {
        for (let char of this.messageToSend) {
          document.dispatchEvent(new KeyboardEvent('keydown', {
            key: char,
            bubbles: true
          }))
        }

        // Simula Enter para enviar
        setTimeout(() => {
          document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true
          }))
          this.isActive = false
        }, 500)
      }, 200)
    } catch (error) {
      console.log('Simulação de teclado falhou:', error)
    }
  }

  // Tenta usar o clipboard
  tryClipboardMethod() {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.messageToSend).then(() => {
          // Simula Ctrl+V para colar
          document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'v',
            ctrlKey: true,
            bubbles: true
          }))

          // Simula Enter para enviar
          setTimeout(() => {
            document.dispatchEvent(new KeyboardEvent('keydown', {
              key: 'Enter',
              bubbles: true
            }))
            this.isActive = false
          }, 500)
        })
      }
    } catch (error) {
      console.log('Método clipboard falhou:', error)
    }
  }

  // Para a automação
  stop() {
    this.isActive = false
  }
}

// Instância global
const automation = new WhatsAppAutomation()

// Função para injetar script na janela do WhatsApp
export function injectAutomationScript(whatsappWindow, message) {
  if (!whatsappWindow || whatsappWindow.closed) {
    return false
  }

  try {
    // Script que será injetado na janela do WhatsApp
    const scriptContent = `
      (function() {
        const message = ${JSON.stringify(message)};
        
        function waitForWhatsApp() {
          // Aguarda o WhatsApp carregar
          if (document.querySelector('[data-testid="conversation-compose-box-input"]') || 
              document.querySelector('div[contenteditable="true"][role="textbox"]')) {
            
            // Encontra o campo de texto
            const textBox = document.querySelector('[data-testid="conversation-compose-box-input"]') ||
                           document.querySelector('div[contenteditable="true"][role="textbox"]') ||
                           document.querySelector('.selectable-text[contenteditable="true"]');
            
            if (textBox) {
              // Força a inserção da mensagem
              textBox.innerHTML = message.replace(/\\n/g, '<br>');
              textBox.textContent = message;
              
              // Dispara eventos
              textBox.dispatchEvent(new Event('input', { bubbles: true }));
              textBox.dispatchEvent(new Event('change', { bubbles: true }));
              
              // Tenta enviar automaticamente
              setTimeout(() => {
                const sendButton = document.querySelector('[data-testid="send"]') ||
                                 document.querySelector('[data-icon="send"]') ||
                                 document.querySelector('button[aria-label*="Send"]') ||
                                 document.querySelector('button[aria-label*="Enviar"]');
                
                if (sendButton) {
                  sendButton.click();
                  // Fecha a janela após envio
                  setTimeout(() => window.close(), 1000);
                }
              }, 1000);
            }
          } else {
            // Tenta novamente em 1 segundo
            setTimeout(waitForWhatsApp, 1000);
          }
        }
        
        // Inicia quando a página carregar
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', waitForWhatsApp);
        } else {
          waitForWhatsApp();
        }
      })();
    `;

    // Tenta injetar o script
    const script = whatsappWindow.document.createElement('script');
    script.textContent = scriptContent;
    whatsappWindow.document.head.appendChild(script);
    
    return true;
  } catch (error) {
    console.log('Falha ao injetar script:', error);
    return false;
  }
}

export default automation;