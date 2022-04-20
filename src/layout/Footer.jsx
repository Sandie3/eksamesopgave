import React, { useState, useEffect } from 'react'
import parser from 'html-react-parser'

import { getFooter } from '../api/Footer'

const Footer = () => {

	const [ footer, setFooter ] = useState()
	const [ loading, setLoading ] = useState( false )
	const [ err, setErr ] = useState()

	useEffect( () => {

		getFooter().then( res => {
			setLoading( true )
			if ( res ) {
				setFooter( res.footertext.replace( "FTA Travels", "<span>FTA Travels</span>" ) )
				setLoading( false )
				setErr( false )
			} else {
				setFooter()
				setErr( true )
				setLoading( false )
			}
		} )

	}, [] )



	return (
		<footer>
			{
				footer &&
				<p>&copy; { parser( footer ) }</p>
			}
		</footer>
	)
}

export default Footer