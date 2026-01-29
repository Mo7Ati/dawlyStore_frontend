import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const StoreCardSkeleton = () => (
    <Card className='h-full overflow-hidden'>
        <CardHeader className='gap-0 pb-4'>
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-4'>
                    <Skeleton className='size-14 rounded-full' />
                    <div className='flex-1'>
                        <Skeleton className='h-5 w-32 mb-2' />
                        <Skeleton className='h-4 w-24' />
                    </div>
                </div>
                <Skeleton className='h-5 w-14 rounded-full' />
            </div>
        </CardHeader>

        <CardContent className='pb-4'>
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-3/4 mb-4' />
            
            <div className='flex gap-2'>
                <Skeleton className='h-5 w-20 rounded-full' />
                <Skeleton className='h-5 w-24 rounded-full' />
            </div>
        </CardContent>

        <CardFooter className='pt-0 border-t mt-auto'>
            <div className='w-full pt-4'>
                <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className='size-4 rounded-sm' />
                    ))}
                    <Skeleton className='h-4 w-16 ms-2' />
                </div>
            </div>
        </CardFooter>
    </Card>
)

interface StoresSkeletonProps {
    count?: number
}

const StoresSkeleton = ({ count = 6 }: StoresSkeletonProps) => {
    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {[...Array(count)].map((_, index) => (
                <StoreCardSkeleton key={index} />
            ))}
        </div>
    )
}

export default StoresSkeleton
