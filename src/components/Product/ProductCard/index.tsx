import * as ProductCardStyles from './styled'

import Link from 'next/link'
import { Product } from '../../../types'
import React from 'react'
import ProductPrice from '../ProductPrice'
import PlayButton from '../../PlayButton'
import QueueButton from '../../QueueButton'

interface ProductItemProps {
  product: Product
}

const SingleProduct: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <>
      <Link href={`/products/${product.slug}`}>
        <ProductCardStyles.Wrapper>
          <ProductCardStyles.ImgWrapper>
            {product.images && product.images.length > 0 ? (
              <ProductCardStyles.Img src={product.images[0].src} alt={product.images[0].alt} />
            ) : null}
          </ProductCardStyles.ImgWrapper>

          <ProductCardStyles.Name>{product.name}</ProductCardStyles.Name>

          <ProductPrice product={product} center={true} size={1} />
        </ProductCardStyles.Wrapper>
      </Link>
      <div>
        {product.itl_track_audio ? (
          <>
            <PlayButton
              product_id={product.id}
              product_name={product.name}
              product_price={product.price}
              audioUrl={product.itl_track_audio}
            />
            <QueueButton
              product_id={product.id}
              product_name={product.name}
              product_price={product.price}
              audioUrl={product.itl_track_audio}
            />
          </>
        ) : null}
      </div>
    </>
  )
}

export default SingleProduct
