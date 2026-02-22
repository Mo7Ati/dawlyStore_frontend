import { Skeleton } from '@/components/ui/skeleton'

const StoreRowSkeleton = () => (
    <div className='flex items-center gap-4 border-b py-4 last:border-0'>
        <Skeleton className='size-14 shrink-0 rounded-full' />
        <div className='min-w-0 flex-1 space-y-2'>
            <div className='flex items-center justify-between gap-2'>
                <Skeleton className='h-5 w-40' />
                <Skeleton className='h-5 w-14 shrink-0 rounded-full' />
            </div>
            <Skeleton className='h-4 w-full max-w-md' />
            <div className='flex flex-wrap gap-2'>
                <Skeleton className='h-5 w-20 rounded-full' />
                <Skeleton className='h-5 w-24 rounded-full' />
            </div>
        </div>
        <div className='hidden shrink-0 sm:flex items-center gap-1'>
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='size-4 rounded-sm' />
            ))}
            <Skeleton className='h-4 w-12 ms-2' />
        </div>
    </div>
)

interface StoresSkeletonProps {
    count?: number
}

const StoresSkeleton = ({ count = 6 }: StoresSkeletonProps) => {
    return (
        <div className='divide-y rounded-lg border'>
            {[...Array(count)].map((_, index) => (
                <StoreRowSkeleton key={index} />
            ))}
        </div>
    )
}

export default StoresSkeleton
