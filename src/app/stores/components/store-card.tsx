import { Store } from '@/types/store'
import React from 'react'

const StoreCard = ({ store }: { store: Store }) => {
  console.log(store);
  
  return (
    <div>
        <h1>{store.name}</h1>
    </div>
  )
}

export default StoreCard