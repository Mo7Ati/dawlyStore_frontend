import { getStoreCategories, getStores } from '@/services/stores/store-service'
import StoresContainer from './_components/stores-container'

const StoresIndex = async (props: PageProps<'/stores'>) => {
    const filters = await props.searchParams;
    const storesResponsePromise = getStores(filters)
    const categoriesResponsePromise = getStoreCategories()

    return (
        <StoresContainer
            storesResponsePromise={storesResponsePromise}
            categoriesResponsePromise={categoriesResponsePromise}
        />
    )
}

export default StoresIndex
