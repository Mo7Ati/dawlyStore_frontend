import api from '@/lib/api'
import { Response } from '@/types/general'
import { Section } from '@/types/home-types'

/**
 * Fetches all sections from the Laravel API
 * @returns Promise<Section[]> Array of sections
 */
export const getSections = async (): Promise<Response<Section[]>> => {
  const response = await api.get('/home')
  return response.data
}
