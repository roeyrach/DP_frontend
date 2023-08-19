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

export const addProduct = async (product) => {
	try {
		const response = await fetch(url + "/addProduct", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(product),
		})

		if (response.ok) {
			const addedProduct = await response.json()
			return addedProduct
		} else {
			throw new Error("Failed to add product", response.status)
		}
	} catch (error) {
		console.error("Error adding product:", error)
		throw error
	}
}
