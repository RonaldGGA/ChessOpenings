// app/explore/utils/fetchOpenings.ts
interface FetchOpeningsParams {
  search?: string
  eco?: string
  page?: number
  limit?: number
}

interface FetchOpeningsResponse {
  openings: any[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export async function fetchOpenings(params: FetchOpeningsParams): Promise<FetchOpeningsResponse> {
  try {
    // Construir query parameters
    const queryParams = new URLSearchParams()
    
    if (params.search) queryParams.append('search', params.search)
    if (params.eco && params.eco !== 'all') queryParams.append('eco', params.eco)
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())

    const response = await fetch(`/api/openings?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching openings:', error)
    throw error
  }
}