import { Store } from '@/types/store'
import { use } from 'react'
import StoreCard from './store-card'
import { Response } from '@/types/general'

const StoresList = ({ storesPromise }: { storesPromise: Promise<Response<Store[]>> }) => {
    const { data: stores } = use(storesPromise);

    return (
        <>
            {
                stores.map((store) => (
                    <StoreCard key={store.id} store={store} />
                ))
            }
        </>
    )
}

export default StoresList