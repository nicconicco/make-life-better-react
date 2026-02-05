import { useEffect } from 'react'
import '../styles/admin.css'
import { initAdminApp } from '../legacy/modules/admin/admin-app.js'

function AdminPage() {
  useEffect(() => {
    const win = window as unknown as { __mlbAdminInit?: boolean }
    if (win.__mlbAdminInit) return
    win.__mlbAdminInit = true
    initAdminApp()
  }, [])

  return (
    <div className="admin-page">
      <div className="container">
        <h1>MakeLifeBetter - Gerenciamento</h1>

        <div id="auth-section">
          <h2>Login</h2>
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Senha" />
          <button type="button" onClick={() => (window as any).login?.()}>
            Login
          </button>
          <button type="button" onClick={() => (window as any).register?.()}>
            Registrar
          </button>
        </div>

        <div id="main-section" style={{ display: 'none' }}>
          <div className="nav-tabs">
            <button
              className="tab-btn active"
              type="button"
              onClick={(event) => (window as any).showTab?.('eventos', event)}
            >
              Eventos
            </button>
            <button className="tab-btn" type="button" onClick={(event) => (window as any).showTab?.('event_location', event)}>
              Locais
            </button>
            <button className="tab-btn" type="button" onClick={(event) => (window as any).showTab?.('duvidas', event)}>
              Duvidas
            </button>
            <button className="tab-btn" type="button" onClick={(event) => (window as any).showTab?.('lista_geral', event)}>
              Chat Geral
            </button>
            <button className="tab-btn" type="button" onClick={(event) => (window as any).showTab?.('users', event)}>
              Usuarios
            </button>
            <button
              className="tab-btn produtos-tab-btn"
              type="button"
              onClick={(event) => (window as any).showTab?.('produtos', event)}
            >
              Produtos
            </button>
          </div>

          <div id="eventos-tab" className="tab-content active">
            <h2>Gerenciar Eventos</h2>
            <div className="form-section">
              <input type="text" id="evento-titulo" placeholder="Titulo do Evento" />
              <input type="text" id="evento-subtitulo" placeholder="Subtitulo" />
              <textarea id="evento-descricao" placeholder="Descricao" />
              <input type="text" id="evento-hora" placeholder="Hora (ex: 09:00)" />
              <input type="text" id="evento-lugar" placeholder="Lugar" />
              <select id="evento-categoria" defaultValue="">
                <option value="">Selecione a categoria</option>
                <option value="agora">Agora</option>
                <option value="programado">Programado</option>
                <option value="novidade">Novidade</option>
                <option value="contato">Contato</option>
                <option value="cupom">Cupom</option>
                <option value="cerimonia">Cerimonia</option>
                <option value="intervalo">Intervalo</option>
                <option value="palestra">Palestra</option>
                <option value="refeicao">Refeicao</option>
                <option value="workshop">Workshop</option>
              </select>
              <button type="button" onClick={() => (window as any).addEvento?.()}>
                Adicionar Evento
              </button>
            </div>
            <div id="eventos-list" className="items-list" />
          </div>

          <div id="event_location-tab" className="tab-content">
            <h2>Gerenciar Locais de Eventos</h2>
            <div className="form-section">
              <input type="text" id="location-name" placeholder="Nome do Local" />
              <input type="text" id="location-address" placeholder="Endereco" />
              <input type="text" id="location-city" placeholder="Cidade" />
              <input type="number" id="location-latitude" step="any" placeholder="Latitude" />
              <input type="number" id="location-longitude" step="any" placeholder="Longitude" />
              <button type="button" onClick={() => (window as any).addEventLocation?.()}>
                Adicionar Local
              </button>
            </div>
            <div id="event_location-list" className="items-list" />
          </div>

          <div id="duvidas-tab" className="tab-content">
            <h2>Duvidas e Perguntas</h2>
            <div className="form-section">
              <input type="text" id="duvida-title" placeholder="Titulo da Duvida" />
              <textarea id="duvida-description" placeholder="Descricao da sua duvida..." />
              <button type="button" onClick={() => (window as any).addDuvida?.()}>
                Fazer Pergunta
              </button>
            </div>
            <div id="duvidas-list" className="items-list" />
          </div>

          <div id="lista_geral-tab" className="tab-content">
            <h2>Chat Geral</h2>
            <div id="lista_geral-list" className="chat-container" />
            <div className="chat-input-section">
              <textarea id="chat-message" placeholder="Digite sua mensagem..." />
              <button type="button" onClick={() => (window as any).addListaGeral?.()}>
                Enviar
              </button>
            </div>
          </div>

          <div id="users-tab" className="tab-content">
            <h2>Gerenciar Usuarios</h2>
            <div className="form-section">
              <input type="text" id="user-username" placeholder="Username" />
              <input type="email" id="user-email" placeholder="Email" />
              <button type="button" onClick={() => (window as any).addUser?.()}>
                Adicionar Usuario
              </button>
            </div>
            <div id="users-list" className="items-list" />
          </div>

          <div id="produtos-tab" className="tab-content">
            <h2>Gerenciar Produtos</h2>
            <div className="store-link">
              <a href="#/store" className="view-store-btn">
                Ver Loja Publica
              </a>
              <button type="button" className="example-btn" onClick={() => (window as any).popularProdutosExemplo?.()}>
                Preencher Exemplos
              </button>
              <button type="button" className="delete-all-btn" onClick={() => (window as any).deletarTodosProdutos?.()}>
                Deletar Todos
              </button>
            </div>
            <div className="form-section produto-form">
              <input type="hidden" id="produto-edit-id" />
              <div className="form-row">
                <input type="text" id="produto-nome" placeholder="Nome do Produto" required />
                <input type="text" id="produto-categoria" placeholder="Categoria (ex: Eletronicos, Roupas)" />
              </div>
              <textarea id="produto-descricao" placeholder="Descricao detalhada do produto..." />
              <div className="form-row">
                <input type="number" id="produto-preco" placeholder="Preco (R$)" step="0.01" min="0" required />
                <input
                  type="number"
                  id="produto-preco-promocional"
                  placeholder="Preco Promocional (opcional)"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-row">
                <input type="number" id="produto-estoque" placeholder="Quantidade em Estoque" min="0" />
                <select id="produto-ativo" defaultValue="true">
                  <option value="true">Ativo (visivel na loja)</option>
                  <option value="false">Inativo (oculto)</option>
                </select>
              </div>
              <input type="url" id="produto-imagem" placeholder="URL da Imagem do Produto" />
              <div className="image-preview" id="produto-imagem-preview" />
              <div className="form-actions">
                <button type="button" id="produto-submit-btn" onClick={() => (window as any).addOrUpdateProduto?.()}>
                  Adicionar Produto
                </button>
                <button
                  type="button"
                  id="produto-cancel-btn"
                  className="cancel-btn"
                  style={{ display: 'none' }}
                  onClick={() => (window as any).cancelEditProduto?.()}
                >
                  Cancelar Edicao
                </button>
              </div>
            </div>
            <div className="produtos-filter">
              <input
                type="text"
                id="produtos-search"
                placeholder="Buscar produtos..."
                onInput={() => (window as any).filterProdutos?.()}
              />
              <select
                id="produtos-filter-categoria"
                defaultValue=""
                onChange={() => (window as any).filterProdutos?.()}
              >
                <option value="">Todas as categorias</option>
              </select>
              <select id="produtos-filter-status" defaultValue="" onChange={() => (window as any).filterProdutos?.()}>
                <option value="">Todos os status</option>
                <option value="true">Ativos</option>
                <option value="false">Inativos</option>
              </select>
            </div>
            <div id="produtos-list" className="produtos-grid" />
          </div>

          <div className="logout-section">
            <button type="button" className="logout-btn" onClick={() => (window as any).logout?.()}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
