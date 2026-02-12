import { getStoreById } from '@/services/stores/store-service'
import StoreOverview from './components/store-overview'

const StorePage = async (props: PageProps<'/stores/[id]'>) => {
    const { id } = await props.params
    const storePromise = getStoreById(id)
    return (
        <div>
            <StoreOverview storePromise={storePromise} />
        </div>
    )
}

export default StorePage