import React, { useContext } from 'react'
import { CartContext } from '../../../context/cart'
import { CartItem } from '../../../types'
import * as CartTotalStyles from './styled'

interface CartTotalProps {
  adds?: number
}

const CartTotal: React.FC<CartTotalProps> = ({ adds }) => {
  const [cart] = useContext(CartContext)

  const cartTotal = cart.items.reduce((acc: number, curr: CartItem) => {
    const productPrice = parseFloat(curr.product_price.replace(/[^\d.-]/g, ''))
    return acc + curr.quantity * productPrice
  }, 0)

  return (
    <CartTotalStyles.Total>
      £{adds && adds > 0 ? adds + cartTotal : cartTotal}
    </CartTotalStyles.Total>
  )
}

export default React.memo(CartTotal)
