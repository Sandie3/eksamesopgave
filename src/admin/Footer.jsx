import React, { useState, useEffect } from 'react'
import { RichTextEditor } from '@mantine/rte';
import { getFooter, editFooter } from '../api/Footer'
const Footer = () => {

	const [ footer, setFooter ] = useState()
	const [ loading, setLoading ] = useState()
	const [ err, setErr ] = useState()
	const [message, setMessage] = useState()

	const [ editor, setEditor ] = useState()

	useEffect( () => {
		setLoading(true)
		getFooter().then( res => {
			if ( res ) {
				setFooter(res)
				setEditor(res.footertext)
				setErr(false)
			} else {
				console.log( 'error' )
				setErr(true)
			}
			setLoading(false)
		} )

	}, [] )

	let handleSubmit = ( e ) => {
		e.preventDefault()
		if (window.confirm("Edit footer?")) {	
			console.log(e.target)
			editFooter( { "footertext": e.target.footertext.value } ).then( res => {
				if ( res ) {
					console.log( res )
				} else {
					console.log( 'error' )
				}
			} )
		}
	}

	return (
		<section>
			{
				footer &&
				<>
					<h1>Edit footer</h1>
					<form onSubmit={ handleSubmit }>
					<label htmlFor='footertext'>
							Content:
							<textarea name="footertext" id='footertext' defaultValue={ editor } style={ { display: "none" } } cols="30" rows="10"></textarea>
							<RichTextEditor value={ editor } onChange={ setEditor } />
						</label>
						<input type="submit" value="Edit" />
					</form>
				</>
			}
			{
				loading && !footer && <>Loading...</>
			}
			{
				err && <>Error!</>
			}
		</section>
	)
}

export default Footer