export class ApiService {
	constructor(baseURL) {
		this.url = baseURL
	}

	async createOrder(post) {
		try {
			const request = new Request('https://jsonplaceholder.typicode.com/posts', {
				method: 'post',
				body: JSON.stringify(post)
			})
			return useRequest(request)
		} catch (error) {
			console.error(error)
		}

	}

	async fetchProducts() {
		try {
			const request = new Request(this.url, {
				method: 'get'
			})
			return useRequest(request)
		} catch (error) {
			console.error(error)
		}
	}

}

async function useRequest(request) {
	const response = await fetch(request)
	return response.json()
}

export const apiService = new ApiService('http://5e445ee23dfe6c001421f771.mockapi.io/products')



