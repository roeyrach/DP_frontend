import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import DataTable from "./DataTable"
import { getProducts, addProduct } from "../HttpRequests"

function Products() {
	const [products, setProducts] = useState([])

	const renderProducts = () => {
		getProducts()
			.then((pros) => {
				const productsWithIndex = pros.map((product, index) => ({
					...product,
					id: index + 1,
				}))
				setProducts(productsWithIndex)
			})
			.catch((error) => {
				console.error("Error fetching products:", error)
			})
	}

	// Fetch products on component mount and whenever 'products' change
	useEffect(() => {
		renderProducts()
	}, []) // This will re-fetch products whenever 'products' change

	const addNewProduct = () => {
		const newProduct = {
			name: "haim",
			sku: "1654",
			desc: "handsome",
			type: "man",
			date: new Date(),
		}
		addProduct(newProduct)
			.then(() => {
				setProducts([...products, { newProduct, id: products.length + 1 }]) // Update products array with the new product
			})
			.then(() => renderProducts())
			.catch((error) => {
				console.error("Error adding product:", error)
			})
	}

	const deleteProducts = (products) => {}

	return (
		<div>
			<h1>Products</h1>
			<Button onClick={() => addNewProduct()} size="small" variant="outlined">
				Add new
			</Button>
			<Button size="small" variant="outlined">
				Delete
			</Button>
			<Button size="small" variant="outlined">
				Edit
			</Button>

			<DataTable products={products}></DataTable>
		</div>
	)
}

export default Products
