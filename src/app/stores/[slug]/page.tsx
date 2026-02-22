import { getStore } from '@/services/stores/store-service'
import StoreOverview from './components/store-overview'

const StorePage = async (props: PageProps<'/stores/[slug]'>) => {
    const { slug } = await props.params
    const filters = await props.searchParams
    const storePromise = getStore(slug, filters)

    return (
        <div>
            <StoreOverview storePromise={storePromise} />
        </div>
    )
}

export default StorePage