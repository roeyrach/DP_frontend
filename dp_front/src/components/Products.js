import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import { DataGrid, useGridApiRef, GridActionsCellItem } from "@mui/x-data-grid"
import { getProducts, saveProducts } from "../HttpRequests"
import FormDialog from "./FormDialog"

function Products() {
	const [products, setProducts] = useState([])
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [idEditProduct, setIdEditProduct] = useState(0)
	const [label, setLabel] = useState("")
	const apiRef = useGridApiRef()
	const btnStyle = {
		backgroundColor: "white",
		border: "none",
		fontWeight: "bold",
	}

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
		console.log("Updated products:", products)
	}, [products])

	const addNewProduct = () => {
		setLabel("Add Product")
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
		console.log(products, productsWithIndex)
		apiRef.current.setRowSelectionModel([])
	}

	const handleEdit = (id) => {
		setLabel("Edit Product")
		setIdEditProduct(id)
		setIsDialogOpen(true)
	}

	const handleSave = () => {
		const productsWithoutId = products.map(({ id, ...product }) => product)
		console.log("before:", productsWithoutId)

		saveProducts(productsWithoutId)
			.then((pros) => {
				const updatedPros = pros.map((product, index) => ({
					...product,
					id: index + 1,
				}))
				console.log("after:", updatedPros)
				setProducts(updatedPros)
				alert("The changes has been saved successfully!")
			})
			.catch((error) => {
				console.error("Error adding product:", error)
			})
	}

	const handleExit = () => {
		const confirmExit = window.confirm(
			"If you have unsaved changes that will be lost."
		)
		if (confirmExit) {
			window.location.href = "https://www.google.com"
		}
	}

	const columns = [
		{ field: "id", headerName: "ID" },
		{ field: "name", headerName: "Name" },
		{ field: "sku", headerName: "SKU" },
		{
			field: "desc",
			headerName: "Description",
			width: 200,
			sortable: false,
		},
		{ field: "type", headerName: "Type" },
		{
			field: "date",
			headerName: "Date",
			width: 150,
			type: "Date",
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={() => handleEdit(id)}
						color="inherit"
					/>,
				]
			},
		},
	]

	return (
		<div style={{ width: "95%", margin: "0 auto", textAlign: "center" }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "row",
					gap: 10,
				}}
			>
				<h1>Products</h1>
				<Button
					style={btnStyle}
					onClick={() => addNewProduct()}
					size="small"
					variant="outlined"
				>
					Add new
				</Button>
				<Button
					style={btnStyle}
					onClick={() => deleteRows()}
					size="small"
					variant="outlined"
				>
					Delete
				</Button>
				<Button
					style={btnStyle}
					onClick={handleSave}
					size="small"
					variant="outlined"
				>
					save
				</Button>
				<Button
					style={btnStyle}
					onClick={handleExit}
					size="small"
					variant="outlined"
				>
					Exit
				</Button>
			</div>

			<div style={{ height: "auto", backgroundColor: "white" }}>
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
				setProducts={setProducts}
				products={products}
				label={label}
				idEditProduct={idEditProduct}
			/>
		</div>
	)
}

export default Products
