import { LoadingSpinner } from '@/components/ui/loading-spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  )
}

export default Loading