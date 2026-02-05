export type Product = {
  id: string
  nome: string
  descricao?: string
  preco: number
  precoPromocional?: number | null
  imagem?: string
  categoria?: string
  estoque?: number
  ativo?: boolean
  createdAt?: number
  updatedAt?: number
}

export type UserProfile = {
  id: string
  username?: string
  email: string
  role?: string
  isAdmin?: boolean
  createdAt?: number
  updatedAt?: number
}

export type OrderItem = {
  productId: string
  nome: string
  preco: number
  quantity: number
}

export type Order = {
  id: string
  userId: string
  userEmail: string
  items: OrderItem[]
  address: Record<string, string>
  shipping: Record<string, unknown>
  payment: Record<string, unknown>
  subtotal: number
  shippingCost: number
  total: number
  status: string
  createdAt?: number
  updatedAt?: number
}

export type Evento = {
  id: string
  titulo: string
  subtitulo?: string
  descricao?: string
  hora?: string
  lugar?: string
  categoria?: string
  createdAt?: number
  updatedAt?: number
}

export type EventLocationContact = {
  id: string
  name: string
  phone: string
  createdAt?: number
}

export type EventLocation = {
  id: string
  name: string
  address: string
  city: string
  latitude?: number
  longitude?: number
  contacts?: EventLocationContact[]
  createdAt?: number
  updatedAt?: number
}

export type Duvida = {
  id: string
  title: string
  description: string
  author?: string
  replies?: number
  timestamp?: number
  updatedAt?: number
}

export type Resposta = {
  id: string
  author?: string
  content: string
  timestamp?: number
}

export type ChatMessage = {
  id: string
  author?: string
  message: string
  timestamp?: number
}
