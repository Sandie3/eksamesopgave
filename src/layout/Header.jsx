import React from 'react'
import Logo from '../Assets/logo/logo.png'
import heroLogo from '../Assets/logo/gero.png'
import Arrow from '../Assets/arrow2.png'

const Header = () => {
	return (
		<header id='top'>
			<img src={ Logo } alt="Logo" className='headerLogo' />
			<div className="heroText">
				<h1>Events</h1>
				<div className="heroLogo">
					<img src={ heroLogo } alt="Hero logo" />
				</div>
				<h1>Travels</h1>
			</div>
			<div className='arrow'>
				<a href="#nav">
					<img src={ Arrow } alt="Arrow" />
				</a>
			</div>
		</header>
	)
}

export default Header