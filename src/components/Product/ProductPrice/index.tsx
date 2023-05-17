import React, { FC } from 'react'
import * as ProductPriceStyles from './styled'
import useSwr from 'swr'
import { Product } from '../../../types'
import { Loader } from '../../../styles/utils'
import { getSingleProduct } from '../../../utils/functions'

interface ProductPriceProps {
  product: Product
  center: boolean
  size: number
}

const ProductPrice: FC<ProductPriceProps> = ({ product, center, size }) => {
  const { data } = useSwr(`/api/products/retrieve`)

  if (!data) {
    return <Loader />
  }

  const { regular_price } = getSingleProduct(product.id, data)

  return (
    <ProductPriceStyles.Wrapper center={center}>
      <ProductPriceStyles.Regular isOnSale={false} size={size}>
        ${parseFloat(regular_price).toFixed(2)}
      </ProductPriceStyles.Regular>
    </ProductPriceStyles.Wrapper>
  )
}

export default ProductPrice
