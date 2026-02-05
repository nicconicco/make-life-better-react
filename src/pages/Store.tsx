import { useEffect, useState } from 'react'
import '../styles/store/store.main.css'
import '../styles/store/bera-theme.css'
import { initStoreApp } from '../legacy/modules/store-app.js'

const AGE_KEY = 'mlb_age_gate'

function StorePage() {
  const [ageGateOpen, setAgeGateOpen] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(AGE_KEY) !== 'confirmed'
  })

  useEffect(() => {
    const win = window as unknown as { __mlbStoreInit?: boolean }
    if (win.__mlbStoreInit) return
    win.__mlbStoreInit = true
    initStoreApp()
  }, [])

  const handleAgeConfirm = () => {
    localStorage.setItem(AGE_KEY, 'confirmed')
    setAgeGateOpen(false)
  }

  const handleAgeReject = () => {
    window.location.href = 'https://www.google.com.br'
  }

  return (
    <div className="store-page">
      {ageGateOpen && (
        <div className="age-gate">
          <div className="age-gate-card">
            <span className="age-gate-badge">Conteudo +18</span>
            <h2>Voce tem mais de 18 anos?</h2>
            <p>
              Este site contem conteudo destinado a adultos. Para continuar,
              confirme sua idade.
            </p>
            <div className="age-gate-actions">
              <button className="age-btn primary" type="button" onClick={handleAgeConfirm}>
                Sim, continuar
              </button>
              <button className="age-btn ghost" type="button" onClick={handleAgeReject}>
                Nao
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="topbar">
        <div className="topbar-inner">
          <span className="topbar-text">Entrega para todo o Brasil</span>
          <div className="topbar-links">
            <button type="button" onClick={() => (window as any).showProfile?.()}>
              Minha conta
            </button>
            <button type="button" onClick={() => (window as any).showOrders?.()}>
              Meus pedidos
            </button>
            <button type="button" onClick={() => (window as any).showLoginModal?.()}>
              Favoritos
            </button>
            <button type="button" onClick={() => (window as any).doLogout?.()}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <header className="store-header bera-header">
        <div className="header-container">
          <a href="#/store" className="logo">
            <div className="logo-icon">
              <i className="fas fa-leaf" />
            </div>
            <div className="logo-text">
              <h1>MakeLifeBetter</h1>
              <span className="tagline">E-commerce & eventos</span>
            </div>
          </a>

          <div className="header-search">
            <i className="fas fa-search" />
            <input type="text" id="search-input" placeholder="Buscar produtos" />
          </div>

          <div className="header-actions">
            <div id="user-area" className="user-area" style={{ display: 'none' }}>
              <div
                className="user-menu"
                id="user-menu"
                onClick={() => (window as any).toggleUserDropdown?.()}
              >
                <div className="user-avatar" id="user-avatar">
                  <i className="fas fa-user" />
                </div>
                <span className="user-name" id="user-display-name">
                  Usuario
                </span>
                <i className="fas fa-chevron-down" />
              </div>
              <div className="user-dropdown" id="user-dropdown">
                <a
                  href="#/store"
                  onClick={(event) => {
                    event.preventDefault()
                    ;(window as any).showProfile?.()
                  }}
                >
                  <i className="fas fa-user-circle" /> Meu Perfil
                </a>
                <a
                  href="#/store"
                  onClick={(event) => {
                    event.preventDefault()
                    ;(window as any).showOrders?.()
                  }}
                >
                  <i className="fas fa-shopping-bag" /> Meus Pedidos
                </a>
                <a
                  href="#/admin"
                  id="admin-link"
                  style={{ display: 'none' }}
                  onClick={(event) => {
                    event.preventDefault()
                    ;(window as any).goToAdmin?.()
                  }}
                >
                  <i className="fas fa-cog" /> Painel Admin
                </a>
                <hr />
                <a
                  href="#/store"
                  className="logout-link"
                  onClick={(event) => {
                    event.preventDefault()
                    ;(window as any).doLogout?.()
                  }}
                >
                  <i className="fas fa-sign-out-alt" /> Sair
                </a>
              </div>
            </div>

            <button
              id="login-btn"
              className="login-btn"
              type="button"
              onClick={() => (window as any).showLoginModal?.()}
            >
              <i className="fas fa-user" />
              <span>Entrar</span>
            </button>

            <button className="cart-btn" type="button" onClick={() => (window as any).showCart?.()}>
              <i className="fas fa-shopping-cart" />
              <span className="cart-count" id="cart-count">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="category-bar">
        <div className="category-inner">
          <div className="category-left">
            <button className="brand-button" type="button">
              Marcas
            </button>
            <div className="brand-popover">
              <span>Colab Series</span>
              <span>Lagers</span>
              <span>IPA</span>
              <span>Weiss</span>
              <span>Zero</span>
            </div>
          </div>
          <div className="categories-scroll" id="categories-list">
            <button className="category-chip active" type="button">
              <span>Todos</span>
            </button>
            <button className="category-chip" type="button">
              <span>Lager</span>
            </button>
            <button className="category-chip" type="button">
              <span>IPA</span>
            </button>
            <button className="category-chip" type="button">
              <span>Session</span>
            </button>
          </div>
          <div className="category-actions">
            <span className="category-tag">Ofertas</span>
            <span className="category-tag">Lancamentos</span>
          </div>
        </div>
      </div>

      <main className="store-main bera-main">
        <section className="store-stats">
          <div className="stat-item">
            <span className="stat-label">Produtos</span>
            <span className="stat-number" id="total-products">
              0
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categorias</span>
            <span className="stat-number" id="total-categories">
              0
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Entrega</span>
            <span className="stat-number">Brasil</span>
          </div>
        </section>

        <section className="filters-section bera-filters">
          <div className="filters-container">
            <div className="filter-options">
              <select id="categoria-filter" defaultValue="">
                <option value="">Todas as Categorias</option>
              </select>
              <select id="ordenar-filter" defaultValue="recentes">
                <option value="recentes">Mais Recentes</option>
                <option value="preco-menor">Menor Preco</option>
                <option value="preco-maior">Maior Preco</option>
                <option value="nome">Nome A-Z</option>
              </select>
            </div>
          </div>
        </section>

        <section className="products-section">
          <div className="products-container">
            <div className="section-header">
              <div>
                <p className="section-eyebrow">Categoria em destaque</p>
                <h3>Todos os Produtos</h3>
              </div>
              <span className="products-count" id="products-count">
                0 produtos
              </span>
            </div>
            <div id="products-grid" className="products-grid">
              <div className="product-card">
                <div className="product-image">
                  <div className="placeholder-image">
                    <i className="fas fa-image" />
                  </div>
                </div>
                <div className="product-details">
                  <span className="product-name">Produto Exemplo</span>
                  <span className="product-sku">Codigo: 000</span>
                  <div className="product-price">
                    <span className="price-current">R$ 199,90</span>
                  </div>
                  <button className="product-cta" type="button">
                    Ver mais
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div className="newsletter-inner">
            <div>
              <p className="newsletter-eyebrow">Newsletter</p>
              <h2>Cadastre-se e ganhe 10% de desconto</h2>
              <p>Receba novidades, eventos e lancamentos em primeira mao.</p>
            </div>
            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <input type="email" placeholder="Digite seu email" />
              <button className="btn-primary" type="submit">
                Quero desconto
              </button>
            </form>
          </div>
        </section>
      </main>

      <div id="login-modal" className="modal">
        <div className="modal-content login-modal-content">
          <span className="close-modal" onClick={() => (window as any).closeLoginModal?.()}>
            &times;
          </span>
          <div className="login-container">
            <div className="login-header">
              <div className="login-logo">
                <i className="fas fa-leaf" />
              </div>
              <h2 id="login-title">Entrar</h2>
              <p id="login-subtitle">Acesse sua conta para continuar</p>
            </div>

            <form
              id="login-form"
              onSubmit={(event) => {
                ;(window as any).handleLogin?.(event)
              }}
            >
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <div className="input-icon">
                  <i className="fas fa-envelope" />
                  <input type="email" id="login-email" placeholder="seu@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Senha</label>
                <div className="input-icon">
                  <i className="fas fa-lock" />
                  <input type="password" id="login-password" placeholder="Sua senha" required />
                </div>
              </div>
              <button type="submit" className="btn-primary" id="login-submit-btn">
                <span>Entrar</span>
                <i className="fas fa-arrow-right" />
              </button>
            </form>

            <div className="login-divider">
              <span>ou</span>
            </div>

            <button
              className="btn-secondary"
              type="button"
              onClick={() => (window as any).toggleRegisterMode?.()}
            >
              <span id="toggle-register-text">Criar nova conta</span>
            </button>

            <p className="login-footer" id="login-footer-text">
              Ao continuar, voce concorda com nossos Termos de Uso
            </p>
          </div>
        </div>
      </div>

      <div id="profile-modal" className="modal">
        <div className="modal-content profile-modal-content">
          <span className="close-modal" onClick={() => (window as any).closeProfileModal?.()}>
            &times;
          </span>
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar" id="profile-avatar">
                <i className="fas fa-user" />
              </div>
              <h2 id="profile-name">Carregando...</h2>
              <p id="profile-email">email@example.com</p>
              <span className="profile-badge" id="profile-badge">
                Usuario
              </span>
            </div>

            <form
              id="profile-form"
              onSubmit={(event) => {
                ;(window as any).updateProfile?.(event)
              }}
            >
              <div className="form-section">
                <h3>
                  <i className="fas fa-user-edit" /> Informacoes Pessoais
                </h3>

                <div className="form-group">
                  <label htmlFor="profile-username">Nome de Usuario</label>
                  <div className="input-icon">
                    <i className="fas fa-at" />
                    <input type="text" id="profile-username" placeholder="Seu username" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="profile-display-email">Email</label>
                  <div className="input-icon">
                    <i className="fas fa-envelope" />
                    <input type="email" id="profile-display-email" placeholder="seu@email.com" disabled />
                  </div>
                  <small>O email nao pode ser alterado</small>
                </div>
              </div>

              <div className="form-section">
                <h3>
                  <i className="fas fa-lock" /> Alterar Senha
                </h3>

                <div className="form-group">
                  <label htmlFor="profile-new-password">
                    Nova Senha (deixe em branco para manter)
                  </label>
                  <div className="input-icon">
                    <i className="fas fa-key" />
                    <input type="password" id="profile-new-password" placeholder="Nova senha" />
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button type="submit" className="btn-primary">
                  <i className="fas fa-save" />
                  <span>Salvar Alteracoes</span>
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => (window as any).closeProfileModal?.()}
                >
                  <span>Cancelar</span>
                </button>
              </div>
            </form>

            <div className="profile-info">
              <p>
                <i className="fas fa-calendar" /> Membro desde:{' '}
                <span id="profile-created-at">-</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="product-modal" className="modal">
        <div className="modal-content product-modal-content">
          <span className="close-modal" onClick={() => (window as any).closeProductModal?.()}>
            &times;
          </span>
          <div id="modal-body">
            <div className="modal-product">
              <div className="modal-image">
                <div className="placeholder-image large">
                  <i className="fas fa-image" />
                </div>
              </div>
              <div className="modal-info">
                <span className="modal-category">Categoria</span>
                <h2 className="modal-title">Produto Exemplo</h2>
                <p className="modal-description">Descricao completa do produto para layout base.</p>
                <div className="modal-price-section">
                  <span className="modal-price">R$ 199,90</span>
                </div>
                <div className="modal-stock">
                  <span className="stock-status available">
                    <i className="fas fa-check-circle" /> Disponivel
                  </span>
                </div>
                <div className="modal-actions">
                  <button className="btn-buy" type="button">
                    <i className="fas fa-bolt" />
                    <span>Comprar Agora</span>
                  </button>
                  <button className="btn-cart" type="button">
                    <i className="fas fa-cart-plus" />
                    <span>Adicionar ao Carrinho</span>
                  </button>
                </div>
                <div className="modal-extras">
                  <div className="extra-item">
                    <i className="fas fa-truck" />
                    <span>Frete gratis acima de R$ 199</span>
                  </div>
                  <div className="extra-item">
                    <i className="fas fa-shield-alt" />
                    <span>Garantia de 30 dias</span>
                  </div>
                  <div className="extra-item">
                    <i className="fas fa-undo" />
                    <span>Devolucao facil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="cart-overlay" className="cart-overlay" onClick={() => (window as any).closeCart?.()} />
      <aside id="cart-sidebar" className="cart-sidebar">
        <div className="cart-header">
          <h2>
            <i className="fas fa-shopping-cart" /> Meu Carrinho
          </h2>
          <button className="close-cart-btn" type="button" onClick={() => (window as any).closeCart?.()}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div id="cart-items" className="cart-items">
          <div className="cart-item">
            <div className="cart-item-image">
              <div className="no-image">
                <i className="fas fa-image" />
              </div>
            </div>
            <div className="cart-item-details">
              <h4>Produto Exemplo</h4>
              <p className="cart-item-price">R$ 199,90</p>
              <div className="cart-item-quantity">
                <button className="qty-btn" type="button">
                  <i className="fas fa-minus" />
                </button>
                <span>1</span>
                <button className="qty-btn" type="button">
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              <span>R$ 199,90</span>
              <button className="remove-item-btn" type="button">
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        </div>
        <div id="cart-empty" className="cart-empty" style={{ display: 'none' }}>
          <i className="fas fa-shopping-basket" />
          <h3>Seu carrinho esta vazio</h3>
          <p>Adicione produtos para comecar suas compras</p>
          <button className="btn-primary" type="button" onClick={() => (window as any).closeCart?.()}>
            <i className="fas fa-store" />
            <span>Continuar Comprando</span>
          </button>
        </div>
        <div id="cart-footer" className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span id="cart-subtotal-value">R$ 0,00</span>
          </div>
          <div className="cart-shipping">
            <span>Frete</span>
            <span id="cart-shipping-value">Calcular no checkout</span>
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span id="cart-total-value">R$ 0,00</span>
          </div>
          <button className="btn-checkout" type="button" onClick={() => (window as any).goToCheckout?.()}>
            <i className="fas fa-lock" />
            <span>Finalizar Compra</span>
          </button>
          <button className="btn-continue" type="button" onClick={() => (window as any).closeCart?.()}>
            Continuar Comprando
          </button>
        </div>
      </aside>

      <div id="checkout-modal" className="modal">
        <div className="modal-content checkout-modal-content">
          <span className="close-modal" onClick={() => (window as any).closeCheckoutModal?.()}>
            &times;
          </span>
          <div className="checkout-container">
            <div className="checkout-stepper">
              <div className="step active" id="step-1">
                <div className="step-number">1</div>
                <span>Endereco</span>
              </div>
              <div className="step-line" />
              <div className="step" id="step-2">
                <div className="step-number">2</div>
                <span>Pagamento</span>
              </div>
              <div className="step-line" />
              <div className="step" id="step-3">
                <div className="step-number">3</div>
                <span>Confirmacao</span>
              </div>
            </div>

            <div id="checkout-step-1" className="checkout-step active">
              <h2>Endereco de Entrega</h2>
              <form id="address-form" className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-name">Nome Completo *</label>
                    <input type="text" id="checkout-name" placeholder="Seu nome completo" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-phone">Telefone *</label>
                    <input type="tel" id="checkout-phone" placeholder="(11) 99999-9999" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group small">
                    <label htmlFor="checkout-cep">CEP *</label>
                    <input type="text" id="checkout-cep" placeholder="00000-000" maxLength={9} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-street">Rua *</label>
                    <input type="text" id="checkout-street" placeholder="Nome da rua" required />
                  </div>
                  <div className="form-group small">
                    <label htmlFor="checkout-number">Numero *</label>
                    <input type="text" id="checkout-number" placeholder="123" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-complement">Complemento</label>
                    <input type="text" id="checkout-complement" placeholder="Apto, Bloco, etc." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-neighborhood">Bairro *</label>
                    <input type="text" id="checkout-neighborhood" placeholder="Seu bairro" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="checkout-city">Cidade *</label>
                    <input type="text" id="checkout-city" placeholder="Sua cidade" required />
                  </div>
                  <div className="form-group small">
                    <label htmlFor="checkout-state">Estado *</label>
                    <select id="checkout-state" required defaultValue="">
                      <option value="">UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                </div>
                <div className="shipping-options" id="shipping-options">
                  <h3>Opcoes de Frete</h3>
                  <div
                    className="shipping-option selected"
                    onClick={() => (window as any).selectShipping?.('normal')}
                  >
                    <input type="radio" name="shipping" value="normal" defaultChecked />
                    <div className="shipping-info">
                      <span className="shipping-name">Normal</span>
                      <span className="shipping-time">5-8 dias uteis</span>
                    </div>
                    <span className="shipping-price">R$ 15,90</span>
                  </div>
                  <div className="shipping-option" onClick={() => (window as any).selectShipping?.('express')}>
                    <input type="radio" name="shipping" value="express" />
                    <div className="shipping-info">
                      <span className="shipping-name">Expresso</span>
                      <span className="shipping-time">2-3 dias</span>
                    </div>
                    <span className="shipping-price">R$ 29,90</span>
                  </div>
                  <div className="shipping-option" onClick={() => (window as any).selectShipping?.('sameday')}>
                    <input type="radio" name="shipping" value="sameday" />
                    <div className="shipping-info">
                      <span className="shipping-name">Same Day</span>
                      <span className="shipping-time">Hoje</span>
                    </div>
                    <span className="shipping-price">R$ 49,90</span>
                  </div>
                </div>
              </form>
              <div className="checkout-actions">
                <button
                  className="btn-outline"
                  type="button"
                  onClick={() => (window as any).closeCheckoutModal?.()}
                >
                  Voltar ao Carrinho
                </button>
                <button className="btn-primary" type="button" onClick={() => (window as any).goToPaymentStep?.()}>
                  <span>Continuar para Pagamento</span>
                  <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>

            <div id="checkout-step-2" className="checkout-step">
              <h2>Forma de Pagamento</h2>
              <div className="payment-methods">
                <div
                  className="payment-method selected"
                  onClick={() => (window as any).selectPaymentMethod?.('credit')}
                >
                  <input type="radio" name="payment" value="credit" defaultChecked />
                  <i className="fas fa-credit-card" />
                  <span>Cartao de Credito</span>
                </div>
                <div className="payment-method" onClick={() => (window as any).selectPaymentMethod?.('debit')}>
                  <input type="radio" name="payment" value="debit" />
                  <i className="fas fa-credit-card" />
                  <span>Cartao de Debito</span>
                </div>
                <div className="payment-method" onClick={() => (window as any).selectPaymentMethod?.('pix')}>
                  <input type="radio" name="payment" value="pix" />
                  <i className="fas fa-qrcode" />
                  <span>PIX</span>
                </div>
                <div className="payment-method" onClick={() => (window as any).selectPaymentMethod?.('boleto')}>
                  <input type="radio" name="payment" value="boleto" />
                  <i className="fas fa-barcode" />
                  <span>Boleto Bancario</span>
                </div>
              </div>

              <div id="card-form" className="card-form">
                <div className="card-preview">
                  <div className="card-front">
                    <div className="card-chip" />
                    <div className="card-number" id="preview-card-number">
                      .... .... .... ....
                    </div>
                    <div className="card-bottom">
                      <div className="card-holder" id="preview-card-holder">
                        NOME NO CARTAO
                      </div>
                      <div className="card-expiry" id="preview-card-expiry">
                        MM/AA
                      </div>
                    </div>
                  </div>
                </div>
                <form id="payment-card-form" className="checkout-form">
                  <div className="form-group">
                    <label htmlFor="card-number">Numero do Cartao</label>
                    <input type="text" id="card-number" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-holder">Nome no Cartao</label>
                    <input type="text" id="card-holder" placeholder="Como esta no cartao" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="card-expiry">Validade</label>
                      <input type="text" id="card-expiry" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-cvv">CVV</label>
                      <input type="text" id="card-cvv" placeholder="123" maxLength={4} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-installments">Parcelas</label>
                    <select id="card-installments" defaultValue="1">
                      <option value="1">1x sem juros</option>
                      <option value="2">2x sem juros</option>
                      <option value="3">3x sem juros</option>
                      <option value="4">4x sem juros</option>
                      <option value="5">5x sem juros</option>
                      <option value="6">6x sem juros</option>
                    </select>
                  </div>
                </form>
              </div>

              <div id="pix-info" className="pix-info" style={{ display: 'none' }}>
                <div className="pix-qr">
                  <i className="fas fa-qrcode" />
                  <p>QR Code sera gerado apos confirmacao</p>
                </div>
                <p className="pix-instructions">
                  <i className="fas fa-info-circle" /> Apos confirmar, voce tera 30 minutos para
                  realizar o pagamento via PIX.
                </p>
              </div>

              <div id="boleto-info" className="boleto-info" style={{ display: 'none' }}>
                <p className="boleto-instructions">
                  <i className="fas fa-info-circle" /> O boleto sera gerado apos a confirmacao do
                  pedido. Prazo de vencimento: 3 dias uteis.
                </p>
              </div>

              <div className="order-summary">
                <h3>Resumo do Pedido</h3>
                <div id="checkout-items-summary">
                  <div className="summary-item">
                    <span>1x Produto Exemplo</span>
                    <span>R$ 199,90</span>
                  </div>
                </div>
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span id="summary-subtotal">R$ 0,00</span>
                </div>
                <div className="summary-line">
                  <span>Frete</span>
                  <span id="summary-shipping">R$ 0,00</span>
                </div>
                <div className="summary-line total">
                  <span>Total</span>
                  <span id="summary-total">R$ 0,00</span>
                </div>
              </div>

              <div className="checkout-actions">
                <button className="btn-outline" type="button" onClick={() => (window as any).goToAddressStep?.()}>
                  <i className="fas fa-arrow-left" />
                  <span>Voltar</span>
                </button>
                <button className="btn-primary" type="button" onClick={() => (window as any).processPayment?.()}>
                  <i className="fas fa-lock" />
                  <span>Confirmar Pagamento</span>
                </button>
              </div>
            </div>

            <div id="checkout-step-3" className="checkout-step">
              <div className="confirmation-success">
                <div className="success-icon">
                  <i className="fas fa-check-circle" />
                </div>
                <h2>Pedido Confirmado!</h2>
                <p className="order-number">
                  Pedido <strong id="order-number">#000000</strong>
                </p>
                <p className="confirmation-message">
                  Obrigado pela sua compra! Voce recebera um email com os detalhes do pedido.
                </p>

                <div className="order-details-card">
                  <h3>Detalhes do Pedido</h3>
                  <div className="detail-row">
                    <span>Status:</span>
                    <span className="status-badge pending">Aguardando Pagamento</span>
                  </div>
                  <div className="detail-row">
                    <span>Forma de Pagamento:</span>
                    <span id="confirm-payment-method">Cartao de Credito</span>
                  </div>
                  <div className="detail-row">
                    <span>Previsao de Entrega:</span>
                    <span id="confirm-delivery-date">-</span>
                  </div>
                  <div className="detail-row">
                    <span>Endereco:</span>
                    <span id="confirm-address">-</span>
                  </div>
                  <div className="detail-row total">
                    <span>Total:</span>
                    <span id="confirm-total">R$ 0,00</span>
                  </div>
                </div>

                <div className="confirmation-actions">
                  <button className="btn-primary" type="button" onClick={() => (window as any).viewMyOrders?.()}>
                    <i className="fas fa-list" />
                    <span>Ver Meus Pedidos</span>
                  </button>
                  <button className="btn-outline" type="button" onClick={() => (window as any).continueShopping?.()}>
                    <span>Continuar Comprando</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="orders-modal" className="modal">
        <div className="modal-content orders-modal-content">
          <span className="close-modal" onClick={() => (window as any).closeOrdersModal?.()}>
            &times;
          </span>
          <div className="orders-container">
            <h2>
              <i className="fas fa-shopping-bag" /> Meus Pedidos
            </h2>
            <div id="orders-list" className="orders-list">
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin" />
                <p>Carregando pedidos...</p>
              </div>
            </div>
            <div id="orders-empty" className="orders-empty" style={{ display: 'none' }}>
              <i className="fas fa-box-open" />
              <h3>Nenhum pedido encontrado</h3>
              <p>Voce ainda nao realizou nenhuma compra</p>
              <button className="btn-primary" type="button" onClick={() => (window as any).closeOrdersModal?.()}>
                <i className="fas fa-store" />
                <span>Ir as Compras</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="store-footer bera-footer">
        <div className="footer-container">
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <i className="fas fa-leaf" />
              <h4>MakeLifeBetter</h4>
            </div>
            <p>
              Tornando sua vida melhor, um produto de cada vez. Qualidade, preco justo e satisfacao garantida.
            </p>
          </div>
          <div className="footer-section">
            <h4>Categorias</h4>
            <ul>
              <li>
                <a href="#/store">Lager</a>
              </li>
              <li>
                <a href="#/store">IPA</a>
              </li>
              <li>
                <a href="#/store">Session</a>
              </li>
              <li>
                <a href="#/store">Marcas</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Institucional</h4>
            <ul>
              <li>
                <a href="#/store">Sobre a marca</a>
              </li>
              <li>
                <a href="#/store">Eventos</a>
              </li>
              <li>
                <a href="#/store">Politica de privacidade</a>
              </li>
              <li>
                <a href="#/store">Trocas e devolucoes</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p>
              <i className="fas fa-envelope" /> contato@makelifebetter.com
            </p>
            <p>
              <i className="fas fa-phone" /> (11) 99999-9999
            </p>
            <p>
              <i className="fas fa-map-marker-alt" /> Sao Paulo, SP
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 MakeLifeBetter. Todos os direitos reservados.</p>
        </div>
      </footer>

      <div id="toast-container" className="toast-container" />
    </div>
  )
}

export default StorePage
