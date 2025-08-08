import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-content">
                <img src="/amperflex.png" alt="Amperflex Logo" width="150" height="100" />
              </div>
            </div>
            <p className="footer-description">
              Especialistas em cabos e fios elétricos para empresas de construção e empreiteiras. 
              Qualidade, confiabilidade e os melhores preços do mercado.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Início</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
              <li><Link to="/localizacao">Localização</Link></li>
              <li><Link to="/contato">Contato</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/depoimentos">Depoimentos</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4>Nossos Produtos</h4>
            <ul className="footer-links">
              <li><a href="#">Cabos Flexíveis</a></li>
              <li><a href="#">Cabos Rígidos</a></li>
              <li><a href="#">Fios Elétricos</a></li>
              <li><a href="#">Fios de Cobre</a></li>
              <li><a href="#">Cabos de Força</a></li>
              <li><a href="#">Cabos de Comando</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contato</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} />
                <div>
                  <p>(11) 9999-9999</p>
                  <p>(11) 3333-3333</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <div>
                  <p>vendas@amperflex.com.br</p>
                  <p>contato@amperflex.com.br</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <div>
                  <p>Rua dos Eletricistas, 123</p>
                  <p>São Paulo, SP - CEP 01234-567</p>
                </div>
              </div>
              <div className="contact-item">
                <Clock size={18} />
                <div>
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Amperflex. Todos os direitos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
              <a href="#">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer