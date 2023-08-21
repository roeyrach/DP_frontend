import React, { useEffect, useState } from "react"
import { DataGrid, useGridApiRef } from "@mui/x-data-grid"
import { getRowIdFromRowModel } from "@mui/x-data-grid/internals"

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

export default function DataTable({ products, setProducts }) {
	const apiRef = useGridApiRef()

	const handleRowClick = (params) => {
		console.log("Clicked Row ID:", params.id)
	}

	const deleteRows = () => {
		const selectedRowKeys = Array.from(apiRef.current.getSelectedRows().keys())
		const updatedProducts = products.filter((row) => {
			return !selectedRowKeys.includes(row.id)
		})
		const productsWithIndex = updatedProducts.map((product, index) => ({
			...product,
			id: index + 1,
		}))
		setProducts(productsWithIndex)
	}

	return (
		<div style={{ height: "auto", width: "100%" }}>
			<button onClick={() => deleteRows()}>delete</button>
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
				disableRowSelectionOnClick={false}
				onRowClick={handleRowClick}
				apiRef={apiRef}
			></DataGrid>
		</div>
	)
}
