import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, MessageCircle, AlertTriangle } from 'lucide-react'
import { useCart } from '../context/CartContext'

// Ícones SVG para cada categoria de produto (versão maior para o carrinho)
const CableIconLarge = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h18M3 8h18M3 16h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="21" cy="12" r="2" fill="currentColor"/>
    <circle cx="21" cy="8" r="2" fill="currentColor"/>
    <circle cx="21" cy="16" r="2" fill="currentColor"/>
  </svg>
)

const WireIconLarge = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="22" cy="12" r="2" fill="currentColor"/>
    <path d="M2 8h20M2 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
)

const ConductorIconLarge = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10h20M2 12h20M2 14h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="20" y="9" width="3" height="6" rx="1.5" fill="currentColor"/>
    <path d="M2 8h20M2 16h20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
  </svg>
)

// Função para obter o ícone grande baseado na categoria
const getProductIconLarge = (category) => {
  switch (category) {
    case 'cabos':
      return <CableIconLarge />
    case 'fios':
      return <WireIconLarge />
    case 'condutores':
      return <ConductorIconLarge />
    default:
      return <CableIconLarge />
  }
}

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    sendWhatsAppOrder,
    sendDirectWhatsAppMessage 
  } = useCart()
  
  const [securityAlert, setSecurityAlert] = useState(null)
  
  // Efeito para limpar alertas automaticamente
  useEffect(() => {
    if (securityAlert) {
      const timer = setTimeout(() => {
        setSecurityAlert(null)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [securityAlert])

  const handleWhatsAppOrder = async () => {
    if (cartItems.length === 0) {
      return
    }
    
    // Mostra mensagem de processamento
    setSecurityAlert({
      type: 'info',
      message: 'Processando pedido... Aguarde um momento.'
    })
    
    try {
      // Usa a nova função de envio direto
      const result = await sendDirectWhatsAppMessage()
      
      if (result.success) {
        setSecurityAlert({
          type: 'info',
          message: 'Pedido enviado com sucesso! O WhatsApp foi aberto automaticamente. Seu carrinho foi limpo.'
        })
      } else {
        throw new Error(result.error || 'Erro desconhecido')
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error)
      setSecurityAlert({
        type: 'error',
        message: 'Erro ao enviar pedido. Tente novamente ou entre em contato conosco.'
      })
    }
    
    // Remove o alerta após 5 segundos
    setTimeout(() => setSecurityAlert(null), 5000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <ShoppingCart size={80} />
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione alguns produtos ao seu carrinho para continuar</p>
            <Link to="/produtos" className="btn btn-primary">
              <ArrowLeft size={20} />
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="container">
        {/* Security Alert */}
        {securityAlert && (
          <div className={`security-alert alert-${securityAlert.type}`}>
            <div className="alert-content">
              <AlertTriangle size={20} />
              <span>{securityAlert.message}</span>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="page-header">
          <h1>Carrinho de Compras</h1>
          <p>Revise seus produtos e finalize seu pedido via WhatsApp</p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <h3>Produtos ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})</h3>
              <button 
                onClick={clearCart}
                className="clear-cart-btn"
                title="Limpar carrinho"
              >
                <Trash2 size={18} />
                Limpar Carrinho
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.length}`} className="cart-item">
                  <div className="product-icon-large">
                    {getProductIconLarge(item.category)}
                  </div>
                  
                  <div className="item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-specs">
                      Metragem: {item.length}m por unidade
                    </p>
                    <p className="item-price">
                      R$ {item.pricePerMeter.toFixed(2)} por metro
                    </p>
                  </div>

                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.id, item.length, item.quantity - 1)}
                      className="qty-btn"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.length, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="item-calculations">
                    <div className="calc-line">
                      <span>Total: {item.quantity * item.length}m</span>
                    </div>
                    <div className="calc-line total">
                      <span>R$ {item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.length)}
                    className="remove-btn"
                    title="Remover item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumo do Pedido</h3>
              
              <div className="summary-details">
                <div className="summary-line">
                  <span>Total de itens:</span>
                  <span>{getTotalItems()}</span>
                </div>
                
                <div className="summary-line">
                  <span>Total de metros:</span>
                  <span>
                    {cartItems.reduce((total, item) => total + (item.quantity * item.length), 0)}m
                  </span>
                </div>
                
                <div className="summary-line total">
                  <span>Total Geral:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={20} />
                  Finalizar via WhatsApp
                </button>
                
                <Link to="/produtos" className="btn btn-secondary">
                  <ArrowLeft size={20} />
                  Continuar Comprando
                </Link>
              </div>

              <div className="whatsapp-info">
                <h4>📋 Sistema de Solicitação de Orçamento:</h4>
                <ol>
                  <li>Clique em "Finalizar via WhatsApp"</li>
                  <li><strong>Envio:</strong> Apenas descrição dos produtos (sem valores)</li>
                  <li><strong>Conteúdo:</strong> Nome, quantidade e metragem dos itens</li>
                  <li>Solicitação profissional de orçamento</li>
                  <li>Carrinho limpo automaticamente após processamento</li>
                  <li>Receba seu orçamento oficial em poucos minutos</li>
                </ol>
                
                <div className="security-info">
                    <h5>💼 Orçamento Profissional</h5>
                    <p>Sistema que envia apenas as especificações técnicas dos produtos, permitindo que você receba um orçamento personalizado com valores atualizados diretamente do vendedor.</p>
                  </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="order-details">
              <h4>Detalhes do Pedido</h4>
              <div className="details-list">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.length}`} className="detail-item">
                    <div className="detail-header">
                      <span className="item-number">{index + 1}.</span>
                      <span className="item-name">{item.name}</span>
                    </div>
                    <div className="detail-specs">
                      <span>• Quantidade: {item.quantity} unidade</span>
                      <span>• Metragem: {item.length}m por unidade</span>
                      <span>• Total: {item.quantity * item.length}m</span>
                      <span>• Subtotal: R$ {item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart