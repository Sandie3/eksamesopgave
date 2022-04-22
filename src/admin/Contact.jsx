import React, { useState, useEffect } from 'react'
import { getContact, patchContact, deleteContact } from '../api/Contact'
import parser from 'html-react-parser'
import Trash from '../Assets/trash.png'
import { Modal } from '../components/Modal'

const Contact = () => {

	const [ message, setMessage ] = useState()
	const [ loading, setLoading ] = useState( false )
	const [ err, setErr ] = useState()
	const [ modalContent, setModalContent ] = useState()
	const [ update, setUpdate ] = useState( true )

	let Update = () => {
		if ( update === true ) {
			setUpdate( false )
		} else {
			setUpdate( true )
		}
	}

	let handleRead = ( id, read ) => {
		patchContact( id, { "read": read } )
		Update()
	}

	let handleDelete = ( id ) => {
		if ( window.confirm( "Delete info?" ) ) {
			deleteContact( id )
			Update()
		}
	}

	let openModal = ( id, mid ) => {
		document.querySelector( "#modal" ).classList.toggle( "active" )
		setModalContent( message[ id ] )
		handleRead( mid, true )
	}

	let closeModal = () => {
		document.querySelector( "#modal" ).classList.toggle( "active" )
	}

	useEffect( () => {
		setLoading( true )
		getContact().then( res => {
			if ( res ) {
				setMessage( res )
				setErr( false )
			} else {
				setMessage()
				setErr( true )
			}
			setLoading( false )
		} )

	}, [ update ] )

	let readIcon;

	return (
		<section>
			<h1>Messages</h1>
			{
				message &&
				<>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Company</th>
								<th>Status</th>
								<th>Open</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								message.map( ( m, i ) => {
									let isRead;
									if ( m.read === false ) {
										readIcon = "<p style='color:red;'>Unread</p>";
										isRead = true;
									}
									if ( m.read === true ) {
										readIcon = "<p style='color:green;'>Read</p>";
										isRead = false;
									}
									return (
										<tr key={ i }>
											<td>{ m.name }</td>
											<td>{ m.company }</td>
											<td><button onClick={ () => handleRead( m._id, isRead ) } >{ parser( readIcon ) }</button></td>
											<td><button onClick={ () => openModal( i, m._id ) } >Open</button></td>
											<td><button onClick={ () => handleDelete( m._id ) } ><img src={ Trash } alt="Delete" /></button></td>
										</tr>
									)
								} )
							}
						</tbody>
					</table>
					<Modal>
						{
							modalContent &&
							<>
								<div className="modalTitle">
									<h3>{ modalContent.name }</h3>
									<button className="close" onClick={ closeModal }>&#10005;</button>
								</div>
								<hr />
								<div className="modalContent adm">
									<p><span>Name:</span> { modalContent.name }</p>
									<p><span>Company:</span> { modalContent.company }</p>
									<p><span>Email:</span> { modalContent.email }</p>
									<p><span>Phone:</span> { modalContent.phone }</p>
									<h4>Message:</h4>
									<p>{ modalContent.message }</p>
								</div>
								<hr />
								<div className="modalBot">
									<button onClick={ closeModal } >Close</button>
								</div>
							</>
						}
					</Modal>
				</>
			}
			{
				loading && !message && <>Loading...</>
			}
			{
				err && <>Error!</>
			}
		</section>
	)
}

export default Contact