import { Card, CardHeader, CardFooter, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StoreListSectionData } from '@/types/home-types'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const StoreCard = ({ store }: { store: StoreListSectionData }) => {

    const RatingStars = ({ rating }: { rating: number }) => (
        <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, index) => (
                <Star key={index} className={cn('size-4', index < Math.floor(rating) ? 'fill-foreground' : 'fill-none')} />
            ))}
            <span className='text-muted-foreground ms-2 text-sm'>({rating})</span>
        </div>
    )
    return (
        <Card className='h-full overflow-hidden'>
            <CardHeader className='gap-0'>
                <div className='flex items-center gap-4'>
                    <Avatar className='bg-muted size-12'>
                        <AvatarImage src={store.image_url?.toString()} alt={store.name} className='size-12' />
                        <AvatarFallback className='bg-card'>{store.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className='text-foreground font-semibold'>{store.name}</CardTitle>
                        <p className='text-muted-foreground text-sm'>{store.category_name}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className='text-muted-foreground'>{store.description}</p>
            </CardContent>
            <CardFooter>
                <RatingStars rating={store.rating} />
            </CardFooter>
        </Card>
    )
}

export default StoreCard   