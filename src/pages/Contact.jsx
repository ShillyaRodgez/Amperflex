import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, User, Building } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create WhatsApp message
    let message = '*CONTATO AMPERFLEX*\n\n'
    message += `*Nome:* ${formData.name}\n`
    message += `*E-mail:* ${formData.email}\n`
    message += `*Telefone:* ${formData.phone}\n`
    if (formData.company) {
      message += `*Empresa:* ${formData.company}\n`
    }
    message += `*Assunto:* ${formData.subject}\n\n`
    message += `*Mensagem:*\n${formData.message}`
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    })
  }

  const contactMethods = [
    {
      icon: <Phone size={32} />,
      title: 'Telefone',
      info: [
        { label: 'WhatsApp / Celular', value: '(11) 9999-9999' },
        { label: 'Telefone Fixo', value: '(11) 3333-3333' }
      ],
      action: { text: 'Ligar Agora', href: 'tel:+5511999999999' }
    },
    {
      icon: <MessageCircle size={32} />,
      title: 'WhatsApp',
      info: [
        { label: 'Atendimento Rápido', value: '(11) 9999-9999' },
        { label: 'Disponível', value: 'Seg a Sex: 8h às 18h' }
      ],
      action: { text: 'Abrir WhatsApp', href: 'https://wa.me/5511999999999' }
    },
    {
      icon: <Mail size={32} />,
      title: 'E-mail',
      info: [
        { label: 'Vendas', value: 'vendas@amperflex.com.br' },
        { label: 'Suporte', value: 'contato@amperflex.com.br' }
      ],
      action: { text: 'Enviar E-mail', href: 'mailto:vendas@amperflex.com.br' }
    },
    {
      icon: <MapPin size={32} />,
      title: 'Endereço',
      info: [
        { label: 'Rua dos Eletricistas, 123', value: 'São Paulo, SP' },
        { label: 'CEP', value: '01234-567' }
      ],
      action: { text: 'Ver no Mapa', href: '/localizacao' }
    }
  ]

  return (
    <div className="contact">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Entre em Contato</h1>
          <p>Estamos prontos para atender suas necessidades em cabos e fios elétricos</p>
        </div>

        <div className="contact-content">
          {/* Contact Methods */}
          <div className="contact-methods">
            <h2>Formas de Contato</h2>
            <div className="methods-grid">
              {contactMethods.map((method, index) => (
                <div key={index} className="method-card">
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <h3>{method.title}</h3>
                  <div className="method-info">
                    {method.info.map((item, idx) => (
                      <div key={idx} className="info-item">
                        <span className="label">{item.label}:</span>
                        <span className="value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <a 
                    href={method.action.href} 
                    className="btn btn-primary"
                    target={method.action.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    {method.action.text}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Envie sua Mensagem</h2>
            <p>Preencha o formulário abaixo e entraremos em contato rapidamente</p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <User size={18} />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={18} />
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={18} />
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">
                    <Building size={18} />
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa (opcional)"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">
                  Assunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione o assunto</option>
                  <option value="Orçamento">Solicitar Orçamento</option>
                  <option value="Dúvidas Técnicas">Dúvidas Técnicas</option>
                  <option value="Informações de Produtos">Informações de Produtos</option>
                  <option value="Suporte">Suporte</option>
                  <option value="Parceria">Parceria Comercial</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Descreva sua necessidade, dúvida ou solicitação..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                <Send size={20} />
                Enviar via WhatsApp
              </button>
              
              <p className="form-note">
                * Ao clicar em "Enviar via WhatsApp", você será redirecionado para o WhatsApp 
                com sua mensagem já formatada para envio.
              </p>
            </form>
          </div>
        </div>

        {/* Business Hours */}
        <div className="business-hours">
          <div className="hours-content">
            <div className="hours-icon">
              <Clock size={48} />
            </div>
            <div className="hours-info">
              <h3>Horário de Atendimento</h3>
              <div className="hours-list">
                <div className="hour-item">
                  <span>Segunda a Sexta:</span>
                  <span>8h às 18h</span>
                </div>
                <div className="hour-item">
                  <span>Sábado:</span>
                  <span>8h às 12h</span>
                </div>
                <div className="hour-item">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
            <div className="hours-note">
              <p>Atendimento via WhatsApp disponível 24h para urgências</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact