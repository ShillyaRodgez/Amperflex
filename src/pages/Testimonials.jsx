import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, Building, User, Calendar } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      company: 'Construtora Silva & Associados',
      role: 'Engenheiro Civil',
      rating: 5,
      date: 'Dezembro 2024',
      text: 'Trabalho com a Amperflex há mais de 5 anos e posso afirmar que é a melhor fornecedora de cabos e fios da região. Produtos de excelente qualidade, preços justos e entrega sempre no prazo. Recomendo para qualquer empresa do ramo da construção.',
      project: 'Edifício Residencial - 120 apartamentos'
    },
    {
      id: 2,
      name: 'Maria Santos',
      company: 'Eletro Instalações Santos',
      role: 'Proprietária',
      rating: 5,
      date: 'Novembro 2024',
      text: 'Atendimento excepcional! A equipe técnica da Amperflex me ajudou a escolher os cabos corretos para um projeto complexo. Os produtos chegaram rapidamente e a qualidade superou minhas expectativas. Já indiquei para vários colegas.',
      project: 'Shopping Center - Instalação elétrica completa'
    },
    {
      id: 3,
      name: 'João Oliveira',
      company: 'Construtora Horizonte',
      role: 'Diretor de Obras',
      rating: 5,
      date: 'Outubro 2024',
      text: 'Parceria sólida e confiável. A Amperflex sempre atende nossos prazos apertados com produtos de primeira linha. O suporte técnico é diferenciado e os preços são competitivos. É nossa fornecedora preferencial.',
      project: 'Condomínio Industrial - 15 galpões'
    },
    {
      id: 4,
      name: 'Ana Costa',
      company: 'Elétrica Costa Ltda',
      role: 'Engenheira Eletricista',
      rating: 5,
      date: 'Setembro 2024',
      text: 'Produtos certificados e de alta qualidade. Nunca tive problemas com os cabos da Amperflex. O atendimento via WhatsApp é muito prático e eficiente. Recomendo sem hesitar!',
      project: 'Hospital Regional - Reforma elétrica'
    },
    {
      id: 5,
      name: 'Roberto Ferreira',
      company: 'RF Construções',
      role: 'Proprietário',
      rating: 5,
      date: 'Agosto 2024',
      text: 'Excelente custo-benefício! A Amperflex oferece os melhores preços sem comprometer a qualidade. A entrega é rápida e o atendimento é personalizado. Já realizei mais de 20 pedidos e sempre fui bem atendido.',
      project: 'Residencial Jardim das Flores - 80 casas'
    },
    {
      id: 6,
      name: 'Luciana Almeida',
      company: 'Almeida Engenharia',
      role: 'Engenheira Civil',
      rating: 5,
      date: 'Julho 2024',
      text: 'Profissionalismo e qualidade em primeiro lugar. A equipe da Amperflex entende as necessidades do mercado de construção e sempre oferece as melhores soluções. Parceria que vale a pena!',
      project: 'Centro Comercial - 3 torres'
    }
  ]

  const stats = [
    { number: '5000+', label: 'Clientes Atendidos' },
    { number: '98%', label: 'Satisfação dos Clientes' },
    { number: '20+', label: 'Anos de Experiência' },
    { number: '100%', label: 'Produtos Certificados' }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < rating ? 'star-filled' : 'star-empty'}
        fill={index < rating ? '#FFD700' : 'none'}
        stroke={index < rating ? '#FFD700' : '#ddd'}
      />
    ))
  }

  return (
    <div className="testimonials">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Depoimentos de Clientes</h1>
          <p>Veja o que nossos clientes falam sobre nossos produtos e serviços</p>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="featured-testimonial">
          <div className="testimonial-carousel">
            <button 
              onClick={prevTestimonial}
              className="carousel-btn prev"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="testimonial-content">
              <div className="quote-icon">
                <Quote size={48} />
              </div>
              
              <div className="testimonial-text">
                <p>"{testimonials[currentTestimonial].text}"</p>
              </div>
              
              <div className="testimonial-rating">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p className="author-role">{testimonials[currentTestimonial].role}</p>
                  <p className="author-company">
                    <Building size={16} />
                    {testimonials[currentTestimonial].company}
                  </p>
                  <p className="project-info">
                    <strong>Projeto:</strong> {testimonials[currentTestimonial].project}
                  </p>
                  <p className="testimonial-date">
                    <Calendar size={16} />
                    {testimonials[currentTestimonial].date}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={nextTestimonial}
              className="carousel-btn next"
              aria-label="Próximo depoimento"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="all-testimonials">
          <h2>Todos os Depoimentos</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="card-header">
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="date">
                    <Calendar size={14} />
                    {testimonial.date}
                  </div>
                </div>
                
                <div className="card-content">
                  <p>"{testimonial.text}"</p>
                </div>
                
                <div className="card-footer">
                  <div className="author">
                    <div className="author-avatar">
                      <User size={24} />
                    </div>
                    <div className="author-details">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                      <p className="company">
                        <Building size={14} />
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="project">
                    <strong>Projeto:</strong>
                    <span>{testimonial.project}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="testimonials-cta">
          <div className="cta-content">
            <h3>Seja Nosso Próximo Cliente Satisfeito!</h3>
            <p>Junte-se a milhares de empresas que confiam na qualidade Amperflex</p>
            <div className="cta-buttons">
              <a href="/produtos" className="btn btn-primary">
                Ver Produtos
              </a>
              <a href="https://wa.me/5511966361328" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>

        {/* Review Invitation */}
        <div className="review-invitation">
          <div className="invitation-content">
            <h4>Você é nosso cliente?</h4>
            <p>Compartilhe sua experiência conosco e ajude outros profissionais a conhecer nosso trabalho!</p>
            <a href="https://wa.me/5511966361328" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Enviar Depoimento
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials