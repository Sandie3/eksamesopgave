import React, { useState, useEffect } from 'react'
import { getInfo, editInfo } from '../api/Contact'
const Contactinfo = () => {

	const [ info, setInfo ] = useState()
	const [ loading, setLoading ] = useState( false )
	const [ err, setErr ] = useState()
	const [ editor, setEditor ] = useState()
	const [ message, setMessage ] = useState()

	useEffect( () => {
		setLoading( true )
		getInfo().then( res => {
			if ( res ) {
				setInfo( res )
				setErr( false )
			} else {
				setInfo()
				setErr( true )
			}
			setLoading( false )
		} )
	}, [] )

	const handleSubmit = ( e ) => {
		e.preventDefault();
		editInfo( e.target ).then( res => {
			if ( res ) {
				setMessage( "Edited content successfully" )
				setTimeout( () => {
					setMessage()
				}, 5000 );

			} else {
				setMessage( "Error while editing!" )
				setTimeout( () => {
					setMessage()
				}, 5000 );
			}
		} )
	}

	return (
		<section>
			{
				info &&
				<>
					<h1>Contact info</h1>
					{ message && message }
					<label>
						Company:
						<input type="text" name="company" id="company" defaultValue={ info.company } />
					</label>
					<label>
						CVR:
						<input type="text" name="cvr" id="cvr" defaultValue={ info.cvr } />
					</label>
					<label>
						Address:
						<input type="text" name="address" id="address" defaultValue={ info.address } />
					</label>
					<label>
						Zip code:
						<input type="text" name="zipcity" id="zipcity" defaultValue={ info.zipcity } />
					</label>
					<label>
						Country:
						<input type="text" name="country" id="country" defaultValue={ info.country } />
					</label>
					<label>
						Phone number:
						<input type="text" name="phone" id="phone" defaultValue={ info.phone } />
					</label>
					<label>
						E-mail:
						<input type="text" name="email" id="email" defaultValue={ info.email } />
					</label>
					<label>
						Opening hours:
						<input type="text" name="openinghours" id="openinghours" defaultValue={ info.openinghours } />
					</label>

					<input type="submit" value="Edit" />
				</>
			}
			{
				loading && !info && <>Loading....</>
			}
			{
				err && <>Error!</>
			}
		</section>
	)
}

export default Contactinfo