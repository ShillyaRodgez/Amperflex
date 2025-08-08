import React from 'react'
import { MapPin, Clock, Phone, Mail, Car, Bus, Train } from 'lucide-react'

const Location = () => {
  return (
    <div className="location">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Nossa Localização</h1>
          <p>Visite nossa loja física ou entre em contato para atendimento personalizado</p>
        </div>

        <div className="location-content">
          {/* Map Section */}
          <div className="map-section">
            <div className="map-container">
              <div className="map-placeholder">
                <MapPin size={48} />
                <h3>Mapa Interativo</h3>
                <p>Rua Tapuias, 660<br />Diadema - SP - CEP: 09990-280</p>
                <a 
                  href="https://maps.google.com/?q=Rua+Tapuias+660+Diadema+SP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="location-info">
            <div className="info-cards">
              {/* Address Card */}
              <div className="info-card">
                <div className="card-icon">
                  <MapPin size={32} />
                </div>
                <div className="card-content">
                  <h3>Endereço</h3>
                  <p>
                    Rua Tapuias, 660<br />
                    Bairro Industrial<br />
                    Diadema - SP<br />
                    CEP 09990-280
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="info-card">
                <div className="card-icon">
                  <Clock size={32} />
                </div>
                <div className="card-content">
                  <h3>Horário de Funcionamento</h3>
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
              </div>

              {/* Contact Card */}
              <div className="info-card">
                <div className="card-icon">
                  <Phone size={32} />
                </div>
                <div className="card-content">
                  <h3>Contato</h3>
                  <div className="contact-list">
                    <div className="contact-item">
                      <Phone size={18} />
                      <div>
                        <p>(11)99888-8220</p>
                        <span>WhatsApp / Celular</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <Phone size={18} />
                      <div>
                        <p>(11) 3333-3333</p>
                        <span>Telefone Fixo</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <Mail size={18} />
                      <div>
                        <p>vendas@amperflexcondutores.com.br</p>
                        <span>E-mail Comercial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="transportation">
              <h3>Como Chegar</h3>
              <div className="transport-options">
                <div className="transport-option">
                  <div className="transport-icon">
                    <Car size={24} />
                  </div>
                  <div className="transport-info">
                    <h4>De Carro</h4>
                    <p>Estacionamento gratuito disponível. Acesso fácil pela Marginal Tietê e Radial Leste.</p>
                  </div>
                </div>
                
                <div className="transport-option">
                  <div className="transport-icon">
                    <Train size={24} />
                  </div>
                  <div className="transport-info">
                    <h4>Metrô</h4>
                    <p>Estação Brás (Linha 3-Vermelha) - 10 minutos a pé. Estação Bresser-Mooca (Linha 3-Vermelha) - 15 minutos a pé.</p>
                  </div>
                </div>
                
                <div className="transport-option">
                  <div className="transport-icon">
                    <Bus size={24} />
                  </div>
                  <div className="transport-info">
                    <h4>Ônibus</h4>
                    <p>Linhas 2027, 3041, 4019 param próximo à nossa loja. Ponto de ônibus a 2 minutos de caminhada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby References */}
            <div className="references">
              <h3>Pontos de Referência</h3>
              <div className="references-list">
                <div className="reference-item">
                  <MapPin size={20} />
                  <span>Shopping Center Norte (5 km)</span>
                </div>
                <div className="reference-item">
                  <MapPin size={20} />
                  <span>Terminal Rodoviário Tietê (8 km)</span>
                </div>
                <div className="reference-item">
                  <MapPin size={20} />
                  <span>Mercado Municipal (6 km)</span>
                </div>
                <div className="reference-item">
                  <MapPin size={20} />
                  <span>Estação da Luz (7 km)</span>
                </div>
              </div>
            </div>

            {/* Visit Info */}
            <div className="visit-info">
              <h3>Informações para Visita</h3>
              <div className="visit-details">
                <div className="visit-item">
                  <h4>🏢 Showroom</h4>
                  <p>Visite nosso showroom com mais de 200 tipos diferentes de cabos e fios em exposição.</p>
                </div>
                <div className="visit-item">
                  <h4>👥 Atendimento Técnico</h4>
                  <p>Nossa equipe técnica está disponível para orientações e especificações de produtos.</p>
                </div>
                <div className="visit-item">
                  <h4>📋 Orçamentos</h4>
                  <p>Orçamentos personalizados na hora, com condições especiais para grandes volumes.</p>
                </div>
                <div className="visit-item">
                  <h4>🚚 Retirada</h4>
                  <p>Área de carga e descarga para facilitar a retirada de grandes pedidos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="location-cta">
          <div className="cta-content">
            <h3>Prefere Atendimento Online?</h3>
            <p>Nossa equipe também está disponível para atendimento via WhatsApp, e-mail ou telefone</p>
            <div className="cta-buttons">
              <a href="https://wa.me/551199888822" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href="tel:+551199888822" className="btn btn-secondary">
                Ligar Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location