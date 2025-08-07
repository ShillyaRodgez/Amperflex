import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice, 
    generateWhatsAppMessage 
  } = useCart()

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!')
      return
    }
    
    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`
    window.open(whatsappUrl, '_blank')
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
                  <div className="item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-specs">
                      Metragem: {item.length}m por unidade
                    </p>
                    <p className="item-price">
                      R$ {item.pricePerMeter.toFixed(2)} por metro
                    </p>
                  </div>

                  <div className="item-controls">
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
                        <span>Total de metros: {item.quantity * item.length}m</span>
                      </div>
                      <div className="calc-line total">
                        <span>Subtotal: R$ {item.totalPrice.toFixed(2)}</span>
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
                <h4>Como funciona?</h4>
                <ol>
                  <li>Clique em "Finalizar via WhatsApp"</li>
                  <li>Você será redirecionado para o WhatsApp</li>
                  <li>Uma mensagem com seu orçamento será criada automaticamente</li>
                  <li>Envie a mensagem para nossa equipe</li>
                  <li>Receba seu orçamento oficial em poucos minutos</li>
                </ol>
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
                      <span>• Quantidade: {item.quantity} unidade(s)</span>
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