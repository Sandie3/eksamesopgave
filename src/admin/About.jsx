import React, { useState, useEffect } from 'react'
import useShowThumb from '../Hooks/useShowThumb';
import { RichTextEditor } from '@mantine/rte';

import { getAbout, editAbout } from '../api/About'

const About = () => {

	const [ about, setAbout ] = useState()
	const [ loading, setLoading ] = useState( false )
	const [ err, setErr ] = useState()
	const [ editor, setEditor ] = useState()
	const [ message, setMessage ] = useState()

	const [ thumb, makeThumb ] = useShowThumb()

	useEffect( () => {
		setLoading( true )
		getAbout().then( res => {
			if ( res ) {
				setAbout( res )
				setEditor( res.content )
				setErr( false )
				setLoading( false )
			} else {
				setLoading( false )
				setAbout()
				setErr( true )
			}
		} )
	}, [] )

	const handleSubmit = ( e ) => {
		e.preventDefault();
		let data = {
			"title": e.target.title.value,
			"content": editor,
		}
		editAbout( data ).then( res => {
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

	const resetFileupload = ( e ) => {
		e.target.form.image.value = "";
		makeThumb( "" );
	}

	return (
		<section>
			{
				about &&
				<>
					<h1>Edit about</h1>
					{ message && message }
					<form onSubmit={ handleSubmit }>
						<label htmlFor='title'>
							Title:
							<input type="text" name='title' id='title' defaultValue={ about.title } />
						</label>
						<label htmlFor='content'>
							Content:
							<textarea name="content" id='content' defaultValue={ editor } style={ { display: "none" } } cols="30" rows="10"></textarea>
							<RichTextEditor value={ editor } onChange={ setEditor } />
						</label>
						<input type="file" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } name="image" />
						{
							thumb &&
							<img src={ thumb } width="100px" alt="Thumb" />
						}
						<button onClick={ ( e ) => resetFileupload( e ) }>X</button>
						<input type="submit" value="Edit" />
					</form>
				</>
			}
			{
				loading && !about && <>Loading...</>
			}
			{
				err && <>Error!</>
			}
		</section>
	)
}

export default About