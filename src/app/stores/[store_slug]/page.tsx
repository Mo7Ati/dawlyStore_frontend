import { getStore } from '@/services/stores/store-service'
import StoreOverview from './components/store-overview'

const StorePage = async (props: PageProps<'/stores/[store_slug]'>) => {
    const { store_slug } = await props.params
    const filters = await props.searchParams
    const storePromise = getStore(store_slug, filters)

    return (
        <div>
            <StoreOverview storePromise={storePromise} />
        </div>
    )
}

export default StorePage