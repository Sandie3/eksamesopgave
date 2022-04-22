import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {
	return (
		<aside>
			<ul>
				<li><Link to="/">Go Back</Link></li>
				<li><Link to="/admin/about">About</Link></li>
				<li><Link to="/admin/contact">Contact</Link></li>
				<li><Link to="/admin/contactinfo">Contact info</Link></li>
				<li><Link to="/admin/tours">Tours</Link></li>
				<li><Link to="/admin/footer">Footer</Link></li>
			</ul>
		</aside>
	)
}

export default Nav