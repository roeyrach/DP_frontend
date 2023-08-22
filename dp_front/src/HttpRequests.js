const url = "http://localhost:5000/api"

export const getProducts = async () => {
	try {
		const response = await fetch(`${url}/getProducts`)
		if (!response.ok) {
			throw new Error("Failed to fetch products", response.status)
		}
		const products = response.json()
		return products
	} catch (error) {
		console.error("Error fetching products:", error)
		throw error
	}
}

export const saveProducts = async (products) => {
	try {
		const response = await fetch(url + "/saveProducts", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(products),
		})

		if (response.ok) {
			const data = await response.json()
			return data
		} else {
			throw new Error("Failed to save products")
		}
	} catch (error) {
		console.error("Error saving products:", error)
		throw error
	}
}
