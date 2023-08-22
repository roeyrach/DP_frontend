import React, { useState, useEffect, useMemo } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function FormDialog({
	label,
	open,
	setIsDialogOpen,
	setProducts,
	products,
	idEditProduct,
}) {
	const [name, setName] = useState("")
	const [sku, setSku] = useState(0)
	const [description, setDescription] = useState("")
	const [type, setType] = useState("")
	const [date, setDate] = useState(new Date() + "")
	const [isSaveBtn, setIsSaveBtn] = useState(true)

	useEffect(() => {
		if (label === "Edit Product") {
			const { name, sku, desc, type, date } = products.find(
				(product) => product.id === idEditProduct
			)
			setName(name)
			setSku(sku)
			setDescription(desc)
			setType(type)
			setDate(date)
		} else {
			setName("")
			setSku(0)
			setDescription("")
			setType("")
			setDate(oneWeekAgo.toISOString().slice(0, 10))
		}
	}, [label, idEditProduct, open])

	// Calculate the date one week ago
	const oneWeekAgo = useMemo(() => {
		const date = new Date()
		date.setDate(date.getDate() - 7)
		return date
	}, [])

	useEffect(() => {
		// Update date state with the calculated value
		setDate(oneWeekAgo.toISOString().slice(0, 10))
	}, [oneWeekAgo])

	const handleClose = () => {
		// Close the dialog
		clearForm()
	}

	const handleSave = () => {
		const addedProduct = {
			name: name,
			sku: sku,
			desc: description,
			type: type,
			date: date,
			id: products.length + 1,
		}
		if (label === "Add Product") {
			setProducts([...products, addedProduct])
		} else {
			const productIndex = products.findIndex(
				(product) => product.id === idEditProduct
			)
			if (productIndex !== -1) {
				const updatedProducts = [...products]
				updatedProducts[productIndex] = addedProduct
				addedProduct.id = productIndex + 1
				setProducts(updatedProducts)
			}
		}
		// Close the dialog
		clearForm()
	}

	const clearForm = () => {
		setIsDialogOpen(false)
		setName("")
		setSku(0)
		setDescription("")
		setType("")
	}

	useEffect(() => {
		if (
			name !== "" &&
			sku > 0 &&
			type !== "" &&
			description !== "" &&
			date !== ""
		) {
			setIsSaveBtn(false)
		} else {
			setIsSaveBtn(true)
		}
	}, [name, sku, type, description, date])

	return (
		<div>
			<Dialog open={open}>
				<DialogTitle>{label}</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill the fields</DialogContentText>
					<div>
						<input
							value={name}
							placeholder="Name"
							type="text"
							maxLength={50}
							autoFocus={true}
							onChange={(e) => setName(e.target.value)}
						></input>
						<input
							value={sku}
							placeholder="SKU"
							type="number"
							min={0}
							onChange={(e) => setSku(e.target.value)}
						></input>
						<select
							name="cars"
							id="cars"
							value={type}
							onChange={(e) => {
								setType(e.target.value)
							}}
						>
							<option value="" disabled>
								Select a type
							</option>{" "}
							{/* Placeholder option */}
							<option value="Fruit">Fruit</option>
							<option value="Vegtable">Vegtable</option>
							<option value="Field Crops">Field Crops</option>
						</select>
						<input
							type="date"
							value={date}
							onChange={(e) => {
								setDate(e.target.value)
							}}
						></input>
					</div>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
						rows={4} // Specify the number of visible rows
						cols={65} // Specify the number of visible columns
					></textarea>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button disabled={isSaveBtn} onClick={handleSave}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
