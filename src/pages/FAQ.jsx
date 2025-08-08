import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      category: 'Produtos',
      questions: [
        {
          id: 1,
          question: 'Qual a diferença entre cabo flexível e cabo rígido?',
          answer: 'O cabo flexível é composto por vários fios finos de cobre entrelaçados, oferecendo maior flexibilidade para instalações que requerem movimentação. Já o cabo rígido possui um condutor sólido de cobre, sendo ideal para instalações fixas em paredes e eletrodutos.'
        },
        {
          id: 2,
          question: 'Como escolher a bitola correta do cabo?',
          answer: 'A escolha da bitola depende da corrente elétrica que o cabo irá conduzir e da distância do circuito. Para circuitos de iluminação, geralmente usa-se 1,5mm². Para tomadas de uso geral, 2,5mm². Para chuveiros e equipamentos de alta potência, 4mm² ou superior. Sempre consulte um eletricista qualificado.'
        },
        {
          id: 3,
          question: 'Todos os produtos possuem certificação?',
          answer: 'Sim, todos os nossos cabos e fios possuem certificação do INMETRO e seguem as normas técnicas brasileiras (NBR). Fornecemos certificados de qualidade e conformidade com todos os produtos.'
        },
        {
          id: 4,
          question: 'Qual a diferença entre fio e cabo?',
          answer: 'O fio é composto por um único condutor (sólido), enquanto o cabo é formado por vários condutores (fios) entrelaçados. Os cabos oferecem maior flexibilidade, enquanto os fios são mais econômicos para instalações fixas.'
        }
      ]
    },
    {
      category: 'Pedidos e Orçamentos',
      questions: [
        {
          id: 5,
          question: 'Como solicitar um orçamento?',
          answer: 'Você pode solicitar orçamento através do nosso site adicionando produtos ao carrinho e finalizando via WhatsApp, ou entrando em contato diretamente pelos nossos canais: telefone (11)99888-8220, e-mail vendas@amperflexcondutores.com.br ou visitando nossa loja física.'
        },
        {
          id: 6,
          question: 'Qual o prazo para receber o orçamento?',
          answer: 'Orçamentos são enviados em até 2 horas durante nosso horário comercial (Segunda a Sexta: 8h às 18h, Sábado: 8h às 12h). Para orçamentos urgentes, entre em contato via WhatsApp.'
        },
        {
          id: 7,
          question: 'Há desconto para grandes quantidades?',
          answer: 'Sim, oferecemos descontos progressivos para grandes volumes. Entre em contato com nossa equipe comercial para condições especiais em pedidos acima de 1000 metros ou compras recorrentes.'
        },
        {
          id: 8,
          question: 'Como funciona o sistema de metragem?',
          answer: 'Nossos produtos são vendidos por metro linear. No carrinho, você especifica a quantidade de unidades e a metragem por unidade. Por exemplo: 2 unidades de 50 metros = 100 metros totais do produto.'
        }
      ]
    },
    {
      category: 'Entrega e Logística',
      questions: [
        {
          id: 9,
          question: 'Vocês fazem entrega em todo o Brasil?',
          answer: 'Sim, atendemos todo o território nacional. O prazo de entrega varia conforme a região: Grande São Paulo (1-2 dias úteis), Interior de SP (2-3 dias úteis), Outras capitais (3-5 dias úteis), Interior (5-7 dias úteis).'
        },
        {
          id: 10,
          question: 'Qual o valor do frete?',
          answer: 'O frete é calculado conforme o peso, volume e destino da mercadoria. Para pedidos acima de R$ 500,00 na Grande São Paulo, o frete é gratuito. Consulte nossa equipe para valores específicos.'
        },
        {
          id: 11,
          question: 'É possível retirar na loja?',
          answer: 'Sim, você pode retirar seu pedido em nossa loja física. Temos área de carga e descarga para facilitar a retirada de grandes volumes. Agende sua retirada pelo telefone (11) 3333-3333.'
        },
        {
          id: 12,
          question: 'Como acompanhar meu pedido?',
          answer: 'Após a confirmação do pedido, você receberá um código de rastreamento via WhatsApp ou e-mail. Também pode acompanhar o status entrando em contato com nossa equipe.'
        }
      ]
    },
    {
      category: 'Pagamento',
      questions: [
        {
          id: 13,
          question: 'Quais formas de pagamento vocês aceitam?',
          answer: 'Aceitamos: Dinheiro, PIX, Cartão de débito/crédito (à vista ou parcelado), Boleto bancário, Transferência bancária e Cheque. Para empresas, oferecemos condições especiais de pagamento.'
        },
        {
          id: 14,
          question: 'É possível parcelar a compra?',
          answer: 'Sim, oferecemos parcelamento em até 12x no cartão de crédito. Para empresas cadastradas, temos condições especiais de pagamento a prazo (15, 30 ou 45 dias).'
        },
        {
          id: 15,
          question: 'Emitem nota fiscal?',
          answer: 'Sim, emitimos nota fiscal para todas as vendas. Para pessoa física, emitimos cupom fiscal ou nota fiscal de consumidor. Para empresas, emitimos nota fiscal eletrônica (NFe).'
        }
      ]
    },
    {
      category: 'Suporte Técnico',
      questions: [
        {
          id: 16,
          question: 'Oferecem consultoria técnica?',
          answer: 'Sim, nossa equipe técnica está disponível para orientações sobre especificações, dimensionamento e escolha dos produtos adequados para seu projeto. Consulte sem compromisso.'
        },
        {
          id: 17,
          question: 'Têm garantia os produtos?',
          answer: 'Todos os produtos possuem garantia de fabricação conforme especificações do fabricante. Em caso de defeito de fabricação, realizamos a troca imediata do produto.'
        },
        {
          id: 18,
          question: 'Fazem instalação dos produtos?',
          answer: 'Não realizamos instalação, mas podemos indicar eletricistas qualificados e parceiros de confiança em sua região. Nosso foco é fornecer produtos de qualidade com o melhor suporte técnico.'
        }
      ]
    }
  ]

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="faq">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Perguntas Frequentes</h1>
          <p>Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços</p>
        </div>

        {/* Search */}
        <div className="faq-search">
          <div className="search-container">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar por palavra-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="faq-content">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <h2 className="category-title">
                  <HelpCircle size={24} />
                  {category.category}
                </h2>
                <div className="questions-list">
                  {category.questions.map((item) => (
                    <div key={item.id} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggleItem(item.id)}
                      >
                        <span>{item.question}</span>
                        {openItems[item.id] ? 
                          <ChevronUp size={20} /> : 
                          <ChevronDown size={20} />
                        }
                      </button>
                      {openItems[item.id] && (
                        <div className="faq-answer">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <HelpCircle size={48} />
              <h3>Nenhuma pergunta encontrada</h3>
              <p>Tente buscar com outras palavras-chave ou limpe o filtro de busca.</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="faq-cta">
          <div className="cta-content">
            <h3>Não encontrou sua resposta?</h3>
            <p>Nossa equipe está pronta para esclarecer todas as suas dúvidas</p>
            <div className="cta-buttons">
              <a href="https://wa.me/551199888822" className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                WhatsApp
              </a>
              <a href="tel:+551199888822" className="btn btn-secondary">
                Ligar Agora
              </a>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="quick-tips">
          <h3>Dicas Rápidas</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>🔍 Escolha do Produto</h4>
              <p>Sempre consulte um eletricista qualificado para dimensionamento correto dos cabos.</p>
            </div>
            <div className="tip-card">
              <h4>📏 Cálculo de Metragem</h4>
              <p>Meça com precisão e adicione 10% de margem de segurança para imprevistos.</p>
            </div>
            <div className="tip-card">
              <h4>🏷️ Certificação</h4>
              <p>Verifique sempre se os produtos possuem selo do INMETRO e certificação NBR.</p>
            </div>
            <div className="tip-card">
              <h4>💰 Economia</h4>
              <p>Para grandes volumes, solicite orçamento personalizado com condições especiais.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ