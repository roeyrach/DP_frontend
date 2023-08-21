import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { DataGrid, useGridApiRef } from "@mui/x-data-grid"
import { getProducts, addProduct } from "../HttpRequests"
import FormDialog from "./FormDialog"

const columns = [
	{ field: "id", headerName: "ID" },
	{ field: "name", headerName: "Name", editable: true },
	{ field: "sku", headerName: "SKU", editable: true },
	{ field: "desc", headerName: "Description", sortable: false, editable: true },
	{ field: "type", headerName: "Type", editable: true },
	{
		field: "date",
		headerName: "Date",
		width: 150,
		type: "Date",
		editable: true,
	},
]

function Products() {
	const [products, setProducts] = useState([])
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editProduct, setEditProduct] = useState({})
	const apiRef = useGridApiRef()

	const renderProducts = async () => {
		try {
			const pros = await getProducts()
			const productsWithIndex = pros.map((product, index) => ({
				...product,
				id: index + 1,
			}))
			setProducts(productsWithIndex)
		} catch (error) {
			console.error("Error fetching products:", error)
		}
	}

	// Fetch products on component mount and whenever 'products' change
	useEffect(() => {
		renderProducts()
	}, [])

	useEffect(() => {
		console.log("addeddddddddd")
	}, [products])

	// useEffect(() => {
	// 	handleEdit()
	// }, [editProduct])

	const addNewProduct = () => {
		// const newProduct = {
		// 	name: "haim",
		// 	sku: "1654",
		// 	desc: "handsome",
		// 	type: "man",
		// 	date: new Date(),
		// }
		// addProduct(newProduct)
		// 	.then(() => {
		// 		setProducts([...products, { newProduct, id: products.length + 1 }]) // Update products array with the new product
		// 	})
		// 	.then(() => renderProducts())
		// 	.catch((error) => {
		// 		console.error("Error adding product:", error)
		// 	})
		setIsDialogOpen(true)
	}

	const deleteRows = () => {
		const selectedRowKeys = Array.from(apiRef.current.getSelectedRows().keys())
		console.log(selectedRowKeys)
		const updatedProducts = products.filter((row) => {
			return !selectedRowKeys.includes(row.id)
		})
		const productsWithIndex = updatedProducts.map((product, index) => ({
			...product,
			id: index + 1,
		}))
		setProducts(productsWithIndex)
		apiRef.current.setRowSelectionModel([])
	}

	// const handleEdit = () => {
	// 	const selectedRowKeys = Array.from(apiRef.current.getSelectedRows().keys())
	// 	if (selectedRowKeys.length === 1) {
	// 		setIsDialogOpen(true)
	// 		alert("can edit now")
	// 		const productIdToEdit = selectedRowKeys[0]

	// 		const productIndexToEdit = products.findIndex(
	// 			(product) => product.id === productIdToEdit
	// 		)

	// 		const idToEdit = parseInt(selectedRowKeys[0])

	// 		if (productIndexToEdit !== -1) {
	// 			const updatedProductList = [...products] // Create a shallow copy of the products array
	// 			updatedProductList[productIndexToEdit] = {
	// 				name: "roey",
	// 				sku: "7777",
	// 				desc: "tall",
	// 				type: "manly",
	// 				date: new Date(),
	// 				id: idToEdit,
	// 			}

	// 			setProducts(updatedProductList)
	// 			setIsDialogOpen(false)
	// 		}
	// 	} else {
	// 		alert("You have to select only one item to edit")
	// 	}
	// 	setIsDialogOpen(false)
	// }

	return (
		<div>
			<h1>Products</h1>
			<Button onClick={() => addNewProduct()} size="small" variant="outlined">
				Add new
			</Button>
			<Button onClick={() => deleteRows()} size="small" variant="outlined">
				Delete
			</Button>
			<Button size="small" variant="outlined">
				Edit
			</Button>
			<Button size="small" variant="outlined">
				save
			</Button>

			<div style={{ height: "auto", width: "100%" }}>
				<DataGrid
					rows={products}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
					checkboxSelection
					disableRowSelectionOnClick={true}
					apiRef={apiRef}
				></DataGrid>
			</div>
			<FormDialog
				open={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				setEditProduct={setEditProduct}
				setProducts={setProducts}
				products={products}
			/>
		</div>
	)
}

export default Products
