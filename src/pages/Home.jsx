import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Truck, Award, Users, Phone, CheckCircle } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: <Shield size={48} />,
      title: 'Qualidade Garantida',
      description: 'Produtos certificados e testados seguindo as normas técnicas mais rigorosas do mercado.'
    },
    {
      icon: <Truck size={48} />,
      title: 'Entrega Rápida',
      description: 'Logística eficiente com entrega em todo o território nacional em prazos reduzidos.'
    },
    {
      icon: <Award size={48} />,
      title: 'Experiência Comprovada',
      description: 'Mais de 20 anos fornecendo soluções em cabos e fios para o setor da construção.'
    },
    {
      icon: <Users size={48} />,
      title: 'Atendimento Especializado',
      description: 'Equipe técnica qualificada para orientar na escolha dos produtos ideais.'
    }
  ]

  const products = [
    {
      category: 'Cabos Flexíveis',
      description: 'Ideais para instalações que requerem flexibilidade e durabilidade.',
      image: '🔌'
    },
    {
      category: 'Cabos Rígidos',
      description: 'Perfeitos para instalações fixas em construções residenciais e comerciais.',
      image: '⚡'
    },
    {
      category: 'Fios Elétricos',
      description: 'Ampla variedade de fios para diferentes aplicações elétricas.',
      image: '🔧'
    },
    {
      category: 'Cabos de Força',
      description: 'Soluções robustas para transmissão de energia em alta potência.',
      image: '⚙️'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Soluções Completas em
                <span className="highlight"> Cabos e Fios Elétricos</span>
              </h1>
              <p className="hero-description">
                Fornecemos produtos de alta qualidade para empresas de construção e empreiteiras. 
                Qualidade garantida, preços competitivos e entrega rápida em todo o Brasil.
              </p>
              <div className="hero-actions">
                <Link to="/produtos" className="btn btn-primary">
                  Ver Produtos
                  <ArrowRight size={20} />
                </Link>
                <a href="tel:+5511966361328" className="btn btn-secondary">
                  <Phone size={20} />
                  Falar com Vendedor
                </a>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Anos de Experiência</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5000+</span>
                  <span className="stat-label">Clientes Atendidos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Produtos Certificados</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-visual">
                <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
                  <rect width="400" height="300" rx="12" fill="#f8f9fa"/>
                  <circle cx="200" cy="150" r="80" fill="#FF6B35" opacity="0.1"/>
                  <circle cx="200" cy="150" r="60" fill="#FF6B35" opacity="0.2"/>
                  <circle cx="200" cy="150" r="40" fill="#FF6B35" opacity="0.3"/>
                  <path d="M120 150h160M120 130h160M120 170h160" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="300" cy="150" r="8" fill="#FFD700"/>
                  <circle cx="100" cy="150" r="8" fill="#FFD700"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Por que escolher a Amperflex?</h2>
            <p>Oferecemos as melhores soluções em cabos e fios elétricos para seu projeto</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="products-preview">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Produtos</h2>
            <p>Ampla variedade de cabos e fios para todas as suas necessidades</p>
          </div>
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{product.image}</div>
                <h3>{product.category}</h3>
                <p>{product.description}</p>
                <Link to="/produtos" className="product-link">
                  Ver mais <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <div className="products-cta">
            <Link to="/produtos" className="btn btn-primary">
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Precisa de um Orçamento?</h2>
              <p>Nossa equipe está pronta para atender suas necessidades com soluções personalizadas</p>
              <ul className="cta-benefits">
                <li><CheckCircle size={20} /> Orçamento gratuito e sem compromisso</li>
                <li><CheckCircle size={20} /> Atendimento técnico especializado</li>
                <li><CheckCircle size={20} /> Entrega rápida em todo o Brasil</li>
              </ul>
            </div>
            <div className="cta-actions">
              <Link to="/contato" className="btn btn-primary">
                Solicitar Orçamento
              </Link>
              <a href="https://wa.me/5511966361328" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home