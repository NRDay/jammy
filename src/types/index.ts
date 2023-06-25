export interface Product {
  name: string
  slug?: string
  id: number
  featured: boolean
  type: string
  status: string
  images: Array<{
    src: string
    alt: string
  }>
  itl_track_audio: string
  itl_track_data: {
    wave_json: string
    preview_times: {
      start: string
      duration: string
      wavDuration: string
    }
  }
  price: string
  regular_price: string
  sale_price: string
  short_description: string
  description: string
  categories: Array<{
    name: string
  }>
}

export interface Category {
  id: number
  name: string
  image: { [key: string]: string }
  count: { [key: string]: number }
}

export interface CartItem {
  key: string
  product_id: number
  quantity: number
  product_price: any
  product_name: string
  image?: string
  slug: string
  line_total?: number
}

export interface Cart {
  key: string | null
  timestamp: number
  items: CartItem[]
}

export interface Customer {
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  city?: string
  state?: string
  postcode?: string
  country?: string
  email?: string
  phone?: string
  customer_note?: string
  shipping?: string
}

export interface Order {
  id: number
  status: string
  total: string
  date_created: string
}

export interface Track {
  key?: string
  product_id: number
  product_price?: string
  product_name?: string
  image?: string
  slug?: string
  audioUrl?: string
  audioPeakData?: string
  previewTimes?: PreviewTimes
}

export interface Playlist {
  key: string | null
  timestamp: number
  items: Track[]
}

export type PlayerProps = {
  key?: string
  product_id: number
  product_price?: string
  product_name?: string
  image?: string
  slug?: string
  audioUrl?: string
  audioPeakData?: string
  previewTimes?: PreviewTimes
}

export type PreviewTimes = {
  start: string
  duration: string
  wavDuration: string
}
