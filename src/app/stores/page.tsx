import React from 'react'
import StoresList from './components/stores-list'
import { getStores } from '@/services/store-service'

const Stores = () => {
    const storesPromise = getStores()
    return (
        <div>
            <StoresList storesPromise={storesPromise} />
        </div>
    )
}

export default Stores