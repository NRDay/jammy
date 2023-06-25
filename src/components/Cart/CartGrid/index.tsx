import React from 'react'
import * as CartGridStyles from './styled'
import SingleCartItem from '../../../components/Cart/CartItem'
import { Cart, CartItem } from '../../../types'

interface CartGridProps {
  cart: Cart
  data: any
}

const CartGrid: React.FC<CartGridProps> = ({ cart, data }) => {
  return (
    <>
      <CartGridStyles.Wrapper>
        <CartGridStyles.FirstCol>
          {cart.items.map((item: CartItem) => {
            return (
              <CartGridStyles.DescriptionRow key={item.product_id?.toString()}>
                <CartGridStyles.Description></CartGridStyles.Description>
                <CartGridStyles.Description></CartGridStyles.Description>
                <CartGridStyles.Description>Product</CartGridStyles.Description>
                <CartGridStyles.Description>Price</CartGridStyles.Description>
                <CartGridStyles.Description>Quantity</CartGridStyles.Description>
                <CartGridStyles.Description>Subtotal</CartGridStyles.Description>
              </CartGridStyles.DescriptionRow>
            )
          })}
        </CartGridStyles.FirstCol>
        <CartGridStyles.SecondCol>
          {cart.items.map((item: CartItem) => {
            console.log('item product_price', item.product_price)
            return <SingleCartItem key={item.product_id} item={item} price={item.product_price} />
          })}
        </CartGridStyles.SecondCol>
      </CartGridStyles.Wrapper>
    </>
  )
}

export default CartGrid
