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

  const generateWhatsAppMessage = () => {
    let message = '*ORÇAMENTO AMPERFLEX*\n\n'
    message += '*Produtos solicitados:*\n\n'
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   - Quantidade: ${item.quantity} unidade\n`
      message += `   - Metragem: ${item.length}m por unidade\n`
      message += `   - Total de metros: ${item.quantity * item.length}m\n`
      message += `   - Preço unitário: R$ ${item.pricePerMeter.toFixed(2)}/m\n`
      message += `   - Subtotal: R$ ${item.totalPrice.toFixed(2)}\n\n`
    })
    
    message += `*TOTAL GERAL: R$ ${getTotalPrice().toFixed(2)}*\n\n`
    message += 'Gostaria de solicitar um orçamento oficial para estes produtos.'
    
    return encodeURIComponent(message)
  }

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage()
    // Clear cart after generating the message for WhatsApp
    clearCart()
    return message
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
    sendWhatsAppOrder
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}