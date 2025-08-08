import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initialization
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('amperflex-cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      return []
    }
  })

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('amperflex-cart', JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cartItems])

  const addToCart = (product, quantity, length) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.length === length
    )

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.length === length
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, {
        ...product,
        quantity,
        length,
        totalPrice: product.pricePerMeter * length * quantity
      }])
    }
  }

  const removeFromCart = (productId, length) => {
    setCartItems(cartItems.filter(
      item => !(item.id === productId && item.length === length)
    ))
  }

  const updateQuantity = (productId, length, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, length)
      return
    }

    setCartItems(cartItems.map(item =>
      item.id === productId && item.length === length
        ? { 
            ...item, 
            quantity: newQuantity,
            totalPrice: item.pricePerMeter * item.length * newQuantity
          }
        : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
    // Also clear localStorage
    try {
      localStorage.removeItem('amperflex-cart')
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error)
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  // Função para gerar hash simples da mensagem
  const generateMessageHash = (message) => {
    let hash = 0
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Converte para 32bit integer
    }
    return Math.abs(hash).toString(36)
  }

  const generateWhatsAppMessage = () => {
    let message = '*SOLICITAÇÃO DE ORÇAMENTO - AMPERFLEX*\n\n'
    message += '*Produtos solicitados:*\n\n'
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   - Quantidade: ${item.quantity} unidade(s)\n`
      message += `   - Metragem: ${item.length}m por unidade\n`
      message += `   - Total de metros: ${item.quantity * item.length}m\n\n`
    })
    
    message += 'Gostaria de solicitar um orçamento oficial para estes produtos.\n\n'
    message += 'Aguardo retorno com valores e condições de pagamento.'
    
    // Adiciona hash de verificação no final da mensagem
    const hash = generateMessageHash(message)
    message += `\n\n[Código: ${hash}]`
    
    return encodeURIComponent(message)
  }

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    // Clear cart after generating the message for WhatsApp
    clearCart()
    return message
  }

  const sendDirectWhatsAppMessage = async () => {
    const message = generateWhatsAppMessage()
    const phoneNumber = '5511966361328'
    
    try {
      // Salva os dados do pedido no localStorage para recuperação
      const orderData = {
        timestamp: Date.now(),
        items: cartItems,
        total: getTotalPrice(),
        message: decodeURIComponent(message),
        sent: false
      }
      localStorage.setItem('amperflex_last_order', JSON.stringify(orderData))
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Mobile: Usa o protocolo whatsapp:// que é mais confiável
        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`
        window.location.href = whatsappUrl
        
        // Fallback para mobile se o app não estiver instalado
        setTimeout(() => {
          if (document.hasFocus()) {
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
          }
        }, 2000)
      } else {
        // Desktop: Estratégia avançada com automação
        const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
        
        // Abre o WhatsApp Web com configurações específicas
        const whatsappWindow = window.open(whatsappWebUrl, 'whatsapp_sender', 
          'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no')
        
        if (whatsappWindow) {
          // Script de automação para injetar na janela do WhatsApp
          const automationScript = `
            (function() {
              let attempts = 0;
              const maxAttempts = 30;
              
              function tryAutoSend() {
                attempts++;
                
                // Procura pelo botão de enviar
                const sendButton = document.querySelector('[data-testid="send"], [aria-label*="Send"], [aria-label*="Enviar"], button[aria-label*="send"], span[data-icon="send"]');
                
                if (sendButton && !sendButton.disabled) {
                  // Simula clique no botão de enviar
                  sendButton.click();
                  
                  // Fecha a janela após envio
                  setTimeout(() => {
                    window.close();
                  }, 2000);
                  
                  return true;
                }
                
                // Se não encontrou o botão e ainda há tentativas
                if (attempts < maxAttempts) {
                  setTimeout(tryAutoSend, 1000);
                } else {
                  // Fallback: fecha a janela após timeout
                  setTimeout(() => {
                    window.close();
                  }, 3000);
                }
                
                return false;
              }
              
              // Aguarda o carregamento completo da página
              if (document.readyState === 'complete') {
                setTimeout(tryAutoSend, 3000);
              } else {
                window.addEventListener('load', () => {
                  setTimeout(tryAutoSend, 3000);
                });
              }
            })();
          `;
          
          // Injeta o script após a janela carregar
          const checkAndInject = () => {
            try {
              if (whatsappWindow.document && whatsappWindow.document.readyState === 'complete') {
                const script = whatsappWindow.document.createElement('script');
                script.textContent = automationScript;
                whatsappWindow.document.head.appendChild(script);
              } else {
                setTimeout(checkAndInject, 1000);
              }
            } catch (e) {
              // Erro de CORS - normal para WhatsApp Web
              console.log('Automação limitada por CORS, mas janela foi aberta com sucesso');
            }
          };
          
          setTimeout(checkAndInject, 2000);
          
          // Monitora se a janela foi fechada (indica envio)
          const checkClosed = setInterval(() => {
            if (whatsappWindow.closed) {
              clearInterval(checkClosed);
              // Considera como enviado se a janela foi fechada
              orderData.sent = true;
              localStorage.setItem('amperflex_last_order', JSON.stringify(orderData));
            }
          }, 1000);
          
          // Timeout de segurança
          setTimeout(() => {
            clearInterval(checkClosed);
            if (!whatsappWindow.closed) {
              // Ainda considera como enviado mesmo se a janela não foi fechada
              orderData.sent = true;
              localStorage.setItem('amperflex_last_order', JSON.stringify(orderData));
            }
          }, 60000); // 1 minuto
        }
      }
      
      // Marca como enviado no localStorage
      orderData.sent = true
      localStorage.setItem('amperflex_last_order', JSON.stringify(orderData))
      
      // Limpa o carrinho
      clearCart()
      
      return { success: true, method: 'advanced_automation' }
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      return { success: false, error: error.message }
    }
  }
  
  // Função para verificar se há pedidos pendentes
  const checkPendingOrders = () => {
    const savedOrder = localStorage.getItem('amperflex_last_order')
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder)
      const timeDiff = Date.now() - orderData.timestamp
      
      // Se passou mais de 1 hora, remove o pedido salvo
      if (timeDiff > 3600000) {
        localStorage.removeItem('amperflex_last_order')
        return null
      }
      
      return orderData
    }
    return null
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    generateWhatsAppMessage,
    sendWhatsAppOrder,
    sendDirectWhatsAppMessage,
    checkPendingOrders
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}