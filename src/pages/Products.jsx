import React, { useState } from 'react'
import { ShoppingCart, Plus, Minus, Filter } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [quantities, setQuantities] = useState({})
  const [lengths, setLengths] = useState({})
  const { addToCart } = useCart()

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
      name: 'Cabo Rígido 2,5mm²',
      category: 'cabos',
      type: 'Cabo Rígido',
      description: 'Cabo rígido de cobre nu, isolação em PVC, perfeito para instalações fixas.',
      pricePerMeter: 7.20,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Marrom', 'Verde/Amarelo']
    },
    {
      id: 4,
      name: 'Cabo de Força 10mm²',
      category: 'cabos',
      type: 'Cabo de Força',
      description: 'Cabo de força para aplicações industriais e comerciais de alta potência.',
      pricePerMeter: 28.90,
      specifications: ['Tensão: 1000V', 'Temperatura: 90°C', 'Norma: NBR 7288'],
      colors: ['Preto', 'Azul', 'Marrom']
    },
    // Fios
    {
      id: 5,
      name: 'Fio Elétrico 1,5mm²',
      category: 'fios',
      type: 'Fio Elétrico',
      description: 'Fio elétrico de cobre nu, isolação em PVC, ideal para circuitos de iluminação.',
      pricePerMeter: 4.80,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Branco', 'Verde/Amarelo']
    },
    {
      id: 6,
      name: 'Fio Elétrico 2,5mm²',
      category: 'fios',
      type: 'Fio Elétrico',
      description: 'Fio elétrico para tomadas e circuitos de força em instalações residenciais.',
      pricePerMeter: 6.50,
      specifications: ['Tensão: 750V', 'Temperatura: 70°C', 'Norma: NBR NM 247-3'],
      colors: ['Azul', 'Preto', 'Branco', 'Verde/Amarelo']
    },
    {
      id: 7,
      name: 'Fio de Cobre Nu 4mm²',
      category: 'fios',
      type: 'Fio de Cobre',
      description: 'Fio de cobre nu para aterramento e aplicações especiais.',
      pricePerMeter: 15.20,
      specifications: ['Condutor: Cobre nu', 'Temperatura: 90°C', 'Norma: NBR 5410'],
      colors: ['Natural (Cobre)']
    },
    {
      id: 8,
      name: 'Fio Paralelo 2x2,5mm²',
      category: 'fios',
      type: 'Fio Paralelo',
      description: 'Fio paralelo para extensões e aplicações temporárias.',
      pricePerMeter: 11.40,
      specifications: ['Tensão: 300V', 'Temperatura: 60°C', 'Norma: NBR 13249'],
      colors: ['Branco', 'Preto']
    }
  ]

  const categories = [
    { id: 'todos', name: 'Todos os Produtos' },
    { id: 'cabos', name: 'Cabos' },
    { id: 'fios', name: 'Fios' }
  ]

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory)

  const getQuantity = (productId) => quantities[productId] || 1
  const getLength = (productId) => lengths[productId] || 10

  const updateQuantity = (productId, change) => {
    const currentQty = getQuantity(productId)
    const newQty = Math.max(1, currentQty + change)
    setQuantities(prev => ({ ...prev, [productId]: newQty }))
  }

  const updateLength = (productId, length) => {
    setLengths(prev => ({ ...prev, [productId]: Math.max(1, length) }))
  }

  const handleAddToCart = (product) => {
    const quantity = getQuantity(product.id)
    const length = getLength(product.id)
    addToCart(product, quantity, length)
    
    // Reset values after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }))
    setLengths(prev => ({ ...prev, [product.id]: 10 }))
    
    // Show success message (you could implement a toast notification here)
    alert(`${product.name} adicionado ao carrinho!`)
  }

  return (
    <div className="products">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Nossos Produtos</h1>
          <p>Cabos e fios elétricos de alta qualidade para suas obras e projetos</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <div className="filter-header">
            <Filter size={20} />
            <span>Filtrar por categoria:</span>
          </div>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <div className="product-category">{product.type}</div>
                <div className="product-price">
                  R$ {product.pricePerMeter.toFixed(2)}/m
                </div>
              </div>
              
              <h3 className="product-name">{product.name}</h3>
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
                      onClick={() => updateQuantity(product.id, -1)}
                      className="qty-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-display">{getQuantity(product.id)}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, 1)}
                      className="qty-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="control-group">
                  <label>Metragem por unidade:</label>
                  <input
                    type="number"
                    min="1"
                    value={getLength(product.id)}
                    onChange={(e) => updateLength(product.id, parseInt(e.target.value) || 1)}
                    className="length-input"
                  />
                  <span className="unit">metros</span>
                </div>
                
                <div className="total-calculation">
                  <div className="calc-line">
                    <span>Total de metros: {getQuantity(product.id) * getLength(product.id)}m</span>
                  </div>
                  <div className="calc-line total">
                    <span>Total: R$ {(product.pricePerMeter * getQuantity(product.id) * getLength(product.id)).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-btn"
                >
                  <ShoppingCart size={20} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products