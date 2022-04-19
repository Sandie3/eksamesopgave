import React from 'react'
import Logo from '../Assets/logo/logo.png'
import heroLogo from '../Assets/logo/gero.png'

const Header = () => {
	return (
		<header>
			<img src={Logo} alt="Logo" className='headerLogo' />
			<div className="heroText">
				<h1>Events</h1>
				<img src={ heroLogo } alt="Hero logo" className='heroLogo' />
				<h1>Travels</h1>
			</div>
		</header>
	)
}

export default Header