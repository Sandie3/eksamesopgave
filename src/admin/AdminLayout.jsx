import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import './Admin.scss'

const AdminLayout = () => {
	return (
		<div className="adminApp">
			<Nav />
			<Outlet />
		</div>
	)
}

export default AdminLayout