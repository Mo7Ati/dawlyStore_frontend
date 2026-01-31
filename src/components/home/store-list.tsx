'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

type EmblaEventType =
    | 'init'
    | 'pointerDown'
    | 'pointerUp'
    | 'scroll'
    | 'select'
    | 'settle'
    | 'destroy'
    | 'reInit'
    | 'resize'

type CarouselApi = {
    scrollPrev: () => void
    scrollNext: () => void
    scrollTo: (index: number) => void
    canScrollPrev: () => boolean
    canScrollNext: () => boolean
    selectedScrollSnap: () => number
    scrollSnapList: () => number[]
    on: (event: EmblaEventType, callback: () => void) => void
    off: (event: EmblaEventType, callback: () => void) => void
}
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import StoreCard from './store-card'
import { Store } from '@/types/store'


export function StoreList({ data }: { data: Store[] }) {
    const [api, setApi] = React.useState<CarouselApi | null>(null)
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap())
        }

        api.on('select', onSelect)
        return () => {
            api.off('select', onSelect)
        }
    }, [api])

    return (
        <section className='py-12 lg:py-20'>
            <div className='container mx-auto max-w-7xl px-6 lg:px-16'>
                <header className='mb-16 text-center'>
                    <h2 className='text-3xl font-bold text-balance md:text-4xl'>Our Clients Review</h2>
                </header>

                <Carousel
                    className='w-full'
                    setApi={api => {
                        // Only update state if api is defined
                        if (api) {
                            setApi(api)
                        } else {
                            setApi(null)
                        }
                    }}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                >
                    <CarouselContent className='-ml-1'>
                        {data.map(store => (
                            <CarouselItem key={store.id} className='basis-full px-4 last:pe-0 sm:basis-1/2 lg:basis-1/3'>
                                {
                                    <StoreCard key={store.id} store={store} />
                                }
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious variant='outline' className='hidden cursor-pointer lg:flex' />
                    <CarouselNext variant='outline' className='hidden cursor-pointer lg:flex' />
                    <div className='mt-8 flex items-center justify-center gap-2'>
                        {data.map((_, index) => (
                            <Button
                                variant='ghost'
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    'size-2 cursor-pointer rounded-full !p-0 transition-all',
                                    current === index ? 'bg-foreground w-6' : 'bg-muted',
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={current === index ? 'true' : 'false'}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
        </section>
    )
}
export default StoreList
