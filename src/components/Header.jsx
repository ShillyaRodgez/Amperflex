import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Phone, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems } = useCart()
  const location = useLocation()

  const navigation = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/produtos' },
    { name: 'Localização', path: '/localizacao' },
    { name: 'Contato', path: '/contato' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Depoimentos', path: '/depoimentos' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span className="contact-item">
                <Phone size={16} />
                (11) 9999-9999
              </span>
              <span className="contact-item">
                <MapPin size={16} />
                São Paulo, SP
              </span>
            </div>
            <div className="top-bar-right">
              <span>Especialistas em Cabos e Fios Elétricos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-content">
                <div className="logo-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="#FF6B35"/>
                    <path d="M10 15h20M10 20h20M10 25h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="32" cy="20" r="3" fill="#FFD700"/>
                  </svg>
                </div>
                <div className="logo-text">
                  <h1>Amperflex</h1>
                  <span>Flexibilidade que impulsiona</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="header-actions">
              <Link to="/carrinho" className="cart-button">
                <ShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </Link>
              
              <button
                className="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="container">
            <nav className="mobile-nav-content">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/carrinho"
                className="mobile-nav-link cart-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                Carrinho ({getTotalItems()})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header