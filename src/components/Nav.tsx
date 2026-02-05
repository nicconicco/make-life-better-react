import { APP_NAME } from '../config/app'
import type { RouteName } from '../types/routes'

type NavProps = {
  currentRoute: RouteName
}

function Nav({ currentRoute }: NavProps) {
  return (
    <header className="app-header">
      <div className="app-brand">
        <span className="app-brand-mark" />
        <span className="app-brand-text">{APP_NAME}</span>
      </div>
      <nav className="app-nav">
        <a
          className={currentRoute === 'store' ? 'nav-link active' : 'nav-link'}
          href="#/store"
        >
          Loja
        </a>
        <a
          className={currentRoute === 'admin' ? 'nav-link active' : 'nav-link'}
          href="#/admin"
        >
          Admin
        </a>
      </nav>
    </header>
  )
}

export default Nav
