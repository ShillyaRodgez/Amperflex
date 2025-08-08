import React, { useState, useEffect } from 'react'
import { ShoppingCart, Plus, Minus, Filter } from 'lucide-react'
import { useCart, formatCurrency } from '../context/CartContext'

// Ícones SVG para cada categoria de produto
const CableIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h18M3 8h18M3 16h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="21" cy="12" r="2" fill="currentColor"/>
    <circle cx="21" cy="8" r="2" fill="currentColor"/>
    <circle cx="21" cy="16" r="2" fill="currentColor"/>
  </svg>
)

const WireIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12h20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="22" cy="12" r="2" fill="currentColor"/>
    <path d="M2 8h20M2 16h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
)

const ConductorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10h20M2 12h20M2 14h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="20" y="9" width="3" height="6" rx="1.5" fill="currentColor"/>
    <path d="M2 8h20M2 16h20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
  </svg>
)

// Função para obter o ícone baseado na categoria
const getProductIcon = (category) => {
  switch (category) {
    case 'cabos':
      return <CableIcon />
    case 'fios':
      return <WireIcon />
    case 'condutores':
      return <ConductorIcon />
    default:
      return <CableIcon />
  }
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('todos')
  const { addToCart } = useCart()
  
  // Clear any potential cached data on component mount
  useEffect(() => {
    // Clear any localStorage data that might interfere
    try {
      localStorage.removeItem('product-quantities')
      localStorage.removeItem('product-lengths')
    } catch (error) {
      console.log('No cached data to clear')
    }
  }, [])

  const products = [
    // Cabos
    {
      id: 1,
      name: 'Cabo Flexível 2,5mm²',
      category: 'cabos',
      type: 'Cabo Flexível',
      description: 'Cabo flexível de cobre nu, isolação em PVC, ideal para instalações residenciais e comerciais.',
      pricePerMeter: 8.50,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 2,
      name: 'Cabo Flexível 4mm²',
      category: 'cabos',
      type: 'Cabo Flexível',
      description: 'Cabo flexível de alta qualidade para instalações que exigem maior capacidade de corrente.',
      pricePerMeter: 12.80,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 3,
      name: 'Cabo Flexível 6mm²',
      category: 'cabos',
      type: 'Cabo Flexível',
      description: 'Cabo flexível robusto para aplicações industriais e residenciais de alta demanda.',
      pricePerMeter: 18.90,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 4,
      name: 'Cabo Flexível 10mm²',
      category: 'cabos',
      type: 'Cabo Flexível',
      description: 'Cabo flexível para instalações de alta potência, ideal para quadros elétricos.',
      pricePerMeter: 28.50,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    // Fios
    {
      id: 5,
      name: 'Fio Rígido 1,5mm²',
      category: 'fios',
      type: 'Fio Rígido',
      description: 'Fio rígido de cobre nu, ideal para instalações fixas em eletrodutos.',
      pricePerMeter: 5.20,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 6,
      name: 'Fio Rígido 2,5mm²',
      category: 'fios',
      type: 'Fio Rígido',
      description: 'Fio rígido resistente para circuitos de tomadas e iluminação.',
      pricePerMeter: 7.80,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 7,
      name: 'Fio Rígido 4mm²',
      category: 'fios',
      type: 'Fio Rígido',
      description: 'Fio rígido para circuitos de maior capacidade de corrente.',
      pricePerMeter: 11.40,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    // Condutores
    {
      id: 8,
      name: 'Condutor Flexível 16mm²',
      category: 'condutores',
      type: 'Condutor Flexível',
      description: 'Condutor flexível para instalações industriais de alta potência.',
      pricePerMeter: 45.60,
      specifications: ['Tensão: 1000V', 'Temperatura: 90°C', 'Norma: NBR NM 280'],
      colors: ['Preto', 'Azul', 'Marrom']
    },
    {
      id: 9,
      name: 'Condutor Flexível 25mm²',
      category: 'condutores',
      type: 'Condutor Flexível',
      description: 'Condutor flexível para aplicações industriais pesadas.',
      pricePerMeter: 68.90,
      specifications: ['Tensão: 1000V', 'Temperatura: 90°C', 'Norma: NBR NM 280'],
      colors: ['Preto', 'Azul', 'Marrom']
    }
  ]

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(() => 1) // Force function initialization
    const [length, setLength] = useState(() => 10) // Force function initialization
    
    // Debug log to check initial values
    console.log(`Product ${product.id} initialized with quantity: ${quantity}, length: ${length}`)

    const handleQuantityChange = (change) => {
      const newQuantity = Math.max(1, quantity + change)
      setQuantity(newQuantity)
    }

    const handleLengthChange = (newLength) => {
      const validLength = Math.max(1, parseInt(newLength) || 1)
      setLength(validLength)
    }

    const handleAddToCart = () => {
      addToCart(product, quantity, length)
      // Reset to default values
      setQuantity(1)
      setLength(10)
    }

    const totalPrice = product.pricePerMeter * quantity * length

    return (
      <div className="product-card">
        <div className="product-header">
          <div className="product-category-with-icon">
            <span className="product-icon">{getProductIcon(product.category)}</span>
            <span className="product-category">{product.type}</span>
          </div>
          <span className="product-price">{formatCurrency(product.pricePerMeter)}/m</span>
        </div>
        
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-specs">
          <h4>Especificações:</h4>
          <ul>
            {product.specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
        
        <div className="product-colors">
          <h4>Cores disponíveis:</h4>
          <div className="colors-list">
            {product.colors.map((color, index) => (
              <span key={index} className="color-tag">{color}</span>
            ))}
          </div>
        </div>
        
        <div className="product-controls">
          <div className="control-group">
            <label>Quantidade:</label>
            <div className="quantity-control">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="qty-btn"
              >
                <Minus size={16} />
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="qty-btn"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="control-group">
            <label>Metragem por unidade:</label>
            <div className="length-container">
              <input
                type="number"
                min="1"
                value={length}
                onChange={(e) => handleLengthChange(e.target.value)}
                className="length-input"
              />
              <span className="unit">metros</span>
            </div>
          </div>
        </div>
        
        <div className="product-total">
          <p>Total de metros: {quantity * length}m</p>
          <p className="total-price">Total: {formatCurrency(totalPrice)}</p>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          <ShoppingCart size={20} />
          Adicionar ao Carrinho
        </button>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Catálogo de Produtos</h1>
          <p>Encontre os melhores cabos, fios e condutores elétricos para seu projeto</p>
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <span>Filtrar por categoria:</span>
            <div className="filter-buttons">
              <button 
                className={activeCategory === 'todos' ? 'active' : ''}
                onClick={() => setActiveCategory('todos')}
              >
                Todos
              </button>
              <button 
                className={activeCategory === 'cabos' ? 'active' : ''}
                onClick={() => setActiveCategory('cabos')}
              >
                Cabos
              </button>
              <button 
                className={activeCategory === 'fios' ? 'active' : ''}
                onClick={() => setActiveCategory('fios')}
              >
                Fios
              </button>
              <button 
                className={activeCategory === 'condutores' ? 'active' : ''}
                onClick={() => setActiveCategory('condutores')}
              >
                Condutores
              </button>
            </div>
          </div>
        </div>
        
        <div className="products-grid">
           {filteredProducts.map(product => (
             <ProductCard key={`clean-${product.id}`} product={product} />
           ))}
         </div>
      </div>
    </div>
  )
}

export default Products