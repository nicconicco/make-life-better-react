import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren

function Layout({ children }: LayoutProps) {
  return <div className="app">{children}</div>
}

export default Layout
