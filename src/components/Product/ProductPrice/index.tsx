import React, { FC } from 'react'
import * as ProductPriceStyles from './styled'
import { Product } from '../../../types'

interface ProductPriceProps {
  product: Product
  center: boolean
  size: number
}

const ProductPrice: FC<ProductPriceProps> = ({ product, center, size }) => {
  const { regular_price } = product

  return (
    <ProductPriceStyles.Wrapper center={center}>
      <ProductPriceStyles.Regular isOnSale={false} size={size}>
        ${parseFloat(regular_price).toFixed(2)}
      </ProductPriceStyles.Regular>
    </ProductPriceStyles.Wrapper>
  )
}

export default ProductPrice
