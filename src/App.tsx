import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import AdminPage from './pages/Admin'
import StorePage from './pages/Store'
import type { RouteName } from './types/routes'

function parseRouteFromHash(): RouteName {
  const raw = window.location.hash.replace('#', '').replace('/', '').trim()
  if (raw === 'admin') return 'admin'
  return 'store'
}

function App() {
  const [route, setRoute] = useState<RouteName>(() => parseRouteFromHash())

  useEffect(() => {
    const onHashChange = () => setRoute(parseRouteFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <Layout>
      {route === 'admin' ? <AdminPage /> : <StorePage />}
    </Layout>
  )
}

export default App
