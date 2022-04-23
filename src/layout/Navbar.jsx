import React from 'react'
import Logo from '../Assets/logo/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

	const toggleNav = ( e ) => {
		e.target.classList.toggle( 'change' )
		var x = document.getElementById( "myLinks" );
		if ( x.style.display === "block" ) {
			x.style.display = "none";
		} else {
			x.style.display = "block";
		}
	}

	return (
		<>
			<nav id='nav'>
				<div className="navbar">
					<div className="navLogo">
						<a href="#top">
							<img src={ Logo } alt="Logo" />
						</a>
					</div>
					<div className="navLinks">
						<a href="#about">Om os</a>
						<a href="#tours">Produkter</a>
						<a href="#contact">Kontakt</a>
						<Link to="admin">Admin</Link>
					</div>

					<div className="mobileNavIcon" onClick={ toggleNav }>
						<div className="bar1"></div>
						<div className="bar2"></div>
						<div className="bar3"></div>
					</div>

					<div className="searchBox">
						<input type="text" placeholder='Search' />
						<input type="submit" value="Search" />
					</div>
				</div>
				<div className="mobileNav">
					<div id="myLinks">
						<a href="#about">Om os</a>
						<a href="#tours">Produkter</a>
						<a href="#contact">Kontakt</a>
						<Link to="admin">Admin</Link>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar