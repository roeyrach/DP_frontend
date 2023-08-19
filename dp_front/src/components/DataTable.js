import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { getProducts, addProduct } from "../HttpRequests"

const c = [
	{ field: "id", headerName: "ID" },
	{ field: "name", headerName: "Name" },
	{ field: "sku", headerName: "SKU" },
	{ field: "desc", headerName: "Description", sortable: false },
	{ field: "type", headerName: "Type" },
	{ field: "date", headerName: "Date", width: 150, type: "Date" },
]

// const r = [
// 	{
// 		id: 1,
// 		name: "Roey",
// 		sku: "1654",
// 		desc: "handsome",
// 		type: "man",
// 		date: new Date(),
// 	},
// ]
export default function DataTable({ products }) {
	return (
		<div style={{ height: "auto", width: "100%" }}>
			<DataGrid
				rows={products}
				columns={c}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
			/>
		</div>
	)
}
