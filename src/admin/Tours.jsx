import React, { useState, useEffect } from 'react'
import { getTours, createTours, editTours, deleteTours } from '../api/Tours'
import { imgUrl } from '../api/Api'
import useShowThumb from '../Hooks/useShowThumb';
import { RichTextEditor } from '@mantine/rte';
import { Modal } from '../components/Modal'
import Trash from '../Assets/trash.png'

const Tours = () => {

	const [ tours, setTours ] = useState()
	const [ loading, setLoading ] = useState()
	const [ err, setErr ] = useState()
	const [ thumb, makeThumb ] = useShowThumb()
	const [ thumbs, makeThumbs ] = useShowThumb()
	const [ createModalContent, setCreateModalContent ] = useState()
	const [ editModalContent, setEditModalContent ] = useState()
	const [ editorTeaser, setEditorTeaser ] = useState()
	const [ editorContent, setEditorContent ] = useState()
	const [ editorRoomtype, setEditorRoomtype ] = useState()
	const today = new Date( new Date().getTime() - new Date().getTimezoneOffset() * 60000 ).toISOString().split( "T" )[ 0 ];

	useEffect( () => {
		setLoading( true )
		getTours().then( res => {
			if ( res ) {
				setTours( res )
				setErr( false )
			} else {
				setErr( true )
				setTours()
			}
			setLoading( false )
		} )

	}, [] )

	let handleDelete = ( id ) => {
		if ( window.confirm( "Delete tour?" ) ) {
			deleteTours( id )
		}
	}

	let openEditModal = ( id) => {
		document.querySelector( "#modal" ).classList.toggle( "active" )
		setEditModalContent( tours[ id ] )
		setEditorTeaser( tours[ id ].teaser )
		setEditorContent( tours[ id ].content )
		setEditorRoomtype( tours[ id ].roomtype )
	}

	let openModal = () => {
		document.querySelector( "#modal" ).classList.toggle( "active" )
		setCreateModalContent( true )
		setEditorTeaser()
		setEditorContent()
		setEditorRoomtype()
	}

	let closeModal = ( e ) => {
		e.preventDefault();
		document.querySelector( "#modal" ).classList.toggle( "active" )
		setEditModalContent()
		setCreateModalContent()
		setEditorTeaser()
		setEditorContent()
		setEditorRoomtype()
	}

	const resetFileupload = ( e ) => {
		e.preventDefault()
		e.target.form.coverimage.value = "";
		makeThumb( "" );
	}

	const resetFileuploads = ( e ) => {
		e.preventDefault()
		e.target.form.gallery.value = "";
		makeThumbs( "" );
	}

	let createTour = ( e ) => {
		e.preventDefault()

		createTours( e.target ).then( res => {
			if ( res ) {
				console.log( res )
			} else {
				console.log( res )
			}
		} )
	}

	let editTour = ( e ) => {
		e.preventDefault()
		editTours( editModalContent._id, e.target ).then( res => {
			if ( res ) {
				console.log( res )
			} else {
				console.log( 'Error on edit' )
			}
		} )
	}

	return (
		<section>
			<button onClick={ openModal } className="create" >Create new</button>
			{
				tours &&
				<>
					<table>
						<thead>
							<tr><th>Cover</th><th>Title</th><th>Rating</th><th>Edit</th><th>Delete</th></tr>
						</thead>
						<tbody>
							{
								tours.map( ( t, i ) => {
									return (
										<tr key={ i }>
											<td><img src={ imgUrl + "/tours/" + t.coverimage } alt="Cover image" /></td>
											<td>{ t.title }</td>
											<td>{ t.rating }</td>
											<td><button onClick={ () => openEditModal( i ) } >Edit</button></td>
											<td><button onClick={ () => handleDelete( t._id ) } ><img src={ Trash } alt="Delete" /></button></td>
										</tr>
									)
								} )
							}
						</tbody>
					</table>
					<Modal>
						{
							createModalContent &&
							<form onSubmit={ createTour } encType="multipart/form-data">
								<div className="modalTitle">
									<h3>Create new tour</h3>
									<button className="close" onClick={ closeModal }>&#10005;</button>
								</div>
								<hr />
								<div className="modalContent adm">

									<label htmlFor="title">
										<span>Title:</span>
										<input type="text" name="title" id="title" />
									</label>

									<label htmlFor="teaser">
										<span>teaser:</span>
										<textarea name="teaser" id='teaser' defaultValue={ editorTeaser  } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorTeaser } onChange={ setEditorTeaser } />
									</label>

									<label htmlFor="content">
										<span>content:</span>
										<textarea name="content" id='content' defaultValue={ editorContent  } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorContent } onChange={ setEditorContent } />
									</label>

									<label htmlFor="roomtype">
										<span>roomtype:</span>
										<textarea name="roomtype" id='roomtype' defaultValue={ editorRoomtype } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorRoomtype } onChange={ setEditorRoomtype } />
									</label>

									<label htmlFor="traveldate">
										<span>traveldate:</span>
										<input type="date" name="traveldate" id="traveldate" min={ today } defaultValue={ today } />
									</label>

									<label htmlFor="duration">
										<span>duration:</span>
										<input type="number" name="duration" id="duration" />
									</label>

									<label htmlFor="priceminimum">
										<span>priceminimum:</span>
										<input type="number" name="priceminimum" id="priceminimum" />
									</label>

									<label htmlFor="pricemaximum">
										<span>pricemaximum:</span>
										<input type="number" name="pricemaximum" id="pricemaximum" />
									</label>

									<label htmlFor="image">
										<span>coverimage:</span>
										<input type="file" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } id="image" name="image" />
										{
											thumb &&
											<img src={ thumb } width="100px" alt="Thumb" />
										}
										<button onClick={ ( e ) => resetFileupload( e ) }>X</button>
									</label>

									<label htmlFor="gallery">
										<span>gallery:</span>
										<input type="file" onChange={ ( e ) => makeThumbs( e.target.files[ 0 ] ) } id="gallery" name="galleryimages" multiple />
										{
											thumbs &&
											<img src={ thumbs } width="100px" alt="Thumbs" />
										}
										<button onClick={ ( e ) => resetFileuploads( e ) }>X</button>
									</label>

									<input type="submit" value="Create" />
								</div>
								<hr />
								<div className="modalBot">
									<button onClick={ closeModal } >Close</button>
								</div>
							</form>
						}
						{
							editModalContent &&
							<form onSubmit={ editTour } encType="multipart/form-data">
								<div className="modalTitle">
									<h3>Edit { editModalContent.title }</h3>
									<button className="close" onClick={ closeModal }>&#10005;</button>
								</div>
								<hr />
								<div className="modalContent adm">

									<label htmlFor="title">
										<span>Title:</span>
										<input type="text" name="title" id="title" defaultValue={ editModalContent.title } />
									</label>

									<label htmlFor="teaser">
										<span>teaser:</span>
										<textarea name="teaser" id='teaser' defaultValue={ editorTeaser } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorTeaser } onChange={ setEditorTeaser } />
									</label>

									<label htmlFor="content">
										<span>content:</span>
										<textarea name="content" id='content' defaultValue={ editorContent } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorContent } onChange={ setEditorContent } />
									</label>

									<label htmlFor="roomtype">
										<span>roomtype:</span>
										<textarea name="roomtype" id='roomtype' defaultValue={ editorRoomtype } style={ { display: "none" } } cols="30" rows="10"></textarea>
										<RichTextEditor value={ editorRoomtype } onChange={ setEditorRoomtype } />
									</label>

									<label htmlFor="traveldate">
										<span>traveldate:</span>
										<input type="date" name="traveldate" id="traveldate" />
									</label>

									<label htmlFor="duration">
										<span>duration:</span>
										<input type="number" name="duration" id="duration" defaultValue={ editModalContent.duration } />
									</label>

									<label htmlFor="priceminimum">
										<span>priceminimum:</span>
										<input type="number" name="priceminimum" id="priceminimum" defaultValue={ editModalContent.priceminimum } />
									</label>

									<label htmlFor="pricemaximum">
										<span>pricemaximum:</span>
										<input type="number" name="pricemaximum" id="pricemaximum" defaultValue={ editModalContent.pricemaximum } />
									</label>

									<label htmlFor="image">
										<span>coverimage:</span>
										<input type="file" onChange={ ( e ) => makeThumb( e.target.files[ 0 ] ) } id="image" name="image" />
										{
											thumb &&
											<img src={ thumb } width="100px" alt="Thumb" />
										}
										<button onClick={ ( e ) => resetFileupload( e ) }>X</button>
									</label>

									<label htmlFor="gallery">
										<span>gallery:</span>
										<input type="file" onChange={ ( e ) => makeThumbs( e.target.files[ 0 ] ) } id="gallery" name="galleryimages" multiple />
										{
											thumbs &&
											<img src={ thumbs } width="100px" alt="Thumbs" />
										}
										<button onClick={ ( e ) => resetFileuploads( e ) }>X</button>
									</label>

									<input type="submit" value="Edit" />
								</div>
								<hr />
								<div className="modalBot">
									<button onClick={ closeModal } >Close</button>
								</div>
							</form>
						}
					</Modal>
				</>
			}
			{
				loading && !tours && <>Loading....</>
			}
			{
				err && <>Error!</>
			}
		</section>
	)
}

export default Tours