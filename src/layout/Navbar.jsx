import React from 'react'
import Logo from '../Assets/logo/logo.png'

const Navbar = () => {
	return (
		<nav id='nav'>
			<div className="navLogo">
				<a href="#top">
					<img src={ Logo } alt="Logo" />
				</a>
			</div>
			<a href="#about">Om os</a>
			<a href="#tours">Produkter</a>
			<a href="#contact">Kontakt</a>
			<div className="searchBox">
				<input type="text" placeholder='Search' />
				<input type="submit" value="Search" />
			</div>
		</nav>
	)
}

export default Navbar