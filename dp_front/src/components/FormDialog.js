import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

export default function FormDialog({
	open,
	setIsDialogOpen,
	setEditProduct,
	setProducts,
	products,
}) {
	const [name, setName] = useState("")
	const [sku, setSku] = useState(0)
	const [description, setDescription] = useState("")
	const [type, setType] = useState("")
	const [date, setDate] = useState(new Date() + "")
	const [isSaveBtn, setIsSaveBtn] = useState(true)
	// Calculate the date one week ago
	const oneWeekAgo = new Date()
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

	useEffect(() => {
		// Update date state with the calculated value
		setDate(oneWeekAgo.toISOString().slice(0, 10))
	}, [])

	const handleClose = () => {
		setIsDialogOpen(false)
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
		console.log(addedProduct)
		setProducts([...products, addedProduct])

		// Close the dialog
		setIsDialogOpen(false)
	}

	// Update isSaveBtn based on the conditions
	useEffect(() => {
		if (name !== "" && sku !== 0) {
			setIsSaveBtn(false)
		} else {
			setIsSaveBtn(true)
		}
	}, [name, sku])

	return (
		<div>
			<Dialog open={open}>
				<DialogTitle>Add Product</DialogTitle>
				<DialogContent>
					<DialogContentText>
						The Name and the SKU field are mandatory.
					</DialogContentText>
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
							<option value="volvo">Volvo</option>
							<option value="saab">Saab</option>
							<option value="mercedes">Mercedes</option>
							<option value="audi">Audi</option>
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
