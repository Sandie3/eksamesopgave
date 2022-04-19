import React from 'react'
import Logo from '../Assets/logo/logo.png'

const Navbar = () => {
	return (
		<nav>
			<div className="navLogo">
				<img src={ Logo } alt="Logo" />
			</div>
				<a href="#about">Om os</a>
				<a href="#">Produkter</a>
				<a href="#">Kontakt</a>
				<div className="searchBox">
					<input type="text" placeholder='Search' />
					<input type="submit" value="Search" />
				</div>
		</nav>
	)
}

export default Navbar