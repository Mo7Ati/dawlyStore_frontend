import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StoreProduct } from '@/services/stores/store-types'
import Image from 'next/image'
import Link from 'next/link'

interface StoreProductCardProps {
    product: StoreProduct
}

const StoreProductCard = ({ product }: StoreProductCardProps) => {
    const { id, name, description, price, compare_price, image_url } = product

    const hasDiscount = compare_price && compare_price > price
    const discountPercentage = hasDiscount
        ? Math.round(((compare_price - price) / compare_price) * 100)
        : 0

    return (
        <Link href={`/products/${id}`} className="block h-full">
            <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                    {image_url ? (
                        <Image
                            src={image_url.toString()}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <span className="text-4xl font-bold text-muted-foreground/30">
                                {name.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                    )}

                    {/* Discount Badge */}
                    {hasDiscount && (
                        <Badge className="absolute top-2 right-2 bg-green-600/90 hover:bg-green-600">
                            {discountPercentage}% OFF
                        </Badge>
                    )}
                </div>

                <CardContent className="p-4">
                    {/* Product Name */}
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {name}
                    </h3>

                    {/* Product Description */}
                    {description && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                            {description}
                        </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-lg font-bold">${price.toFixed(2)}</span>
                        {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${compare_price.toFixed(2)}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default StoreProductCard
