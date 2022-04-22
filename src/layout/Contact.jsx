import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getInfo, postContact, postSubscription } from '../api/Contact'

const Contact = () => {

	const [ info, setInfo ] = useState()
	const [ phone, setPhone ] = useState()
	const [ email, setEmail ] = useState()
	const [ message, setMessage ] = useState()
	const [ message2, setMessage2 ] = useState()

	let phoneRegex = /^\(?([0-9]{2})[- ]?([0-9]{2})[- ]?([0-9]{2})[- ]?([0-9]{2})$/;
	let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	useEffect( () => {
		getInfo().then( res => {
			if ( res ) {
				setInfo( res )
			} else {
				setInfo()
			}
		} )
	}, [] )

	const Phone = ( params ) => {
		if ( params.target.value.match( phoneRegex ) ) {
			setMessage()
		} else {
			setMessage( 'Not a valid phone number' )
		}
		setPhone( params.target.value )
	}

	const Email = ( params ) => {
		if ( !params.target.value.match( emailRegex ) ) {
			setMessage2("Email is not valid")
		}else{
			setMessage2()
		}
		setEmail( params.target.value )
	}

	const handleContact = ( e ) => {
		e.preventDefault();
		if ( phone.length !== 8 ) {
			setMessage( 'Not a valid phone number' )
		} else {
			if ( window.confirm( 'Send message?' ) ) {
				setMessage()
				postContact( e.target ).then( res => {
					if ( res ) {
						console.log( 'sent' )
					} else {
						console.log( 'error' )
					}
				} )
				window.alert( "Message is sent!" )
			}
		}
	}

	const handleSub = ( e ) => {
		e.preventDefault();
		if ( window.confirm( 'Tilmeld nyhedsbrev?' ) ) {
			postSubscription( e.target ).then( res => {
				if ( res ) {
					console.log( 'sent' )
				} else {
					console.log( 'error' )
				}
			} )
		}
	}



	return (
		<section id='contact' className='contact'>
			<SectionTitle>Kontakt</SectionTitle>
			<SectionContent>
				<div className="contactWrapper">
					<div className="info">
						{
							info &&
							<>
								<h3>Kontakt information</h3>
								<p>{ info.company }</p>
								<p>{ info.address }</p>
								<p>{ info.zipcity }</p>
								<p>{ info.country }</p>
								<p>&#9743; { info.phone }</p>
								<p>&#9993; { info.email }</p>
								<p>CVR: { info.cvr }</p>
								<p>Åbnings tider: { info.openinghours }</p>
							</>
						}
					</div>
					<div className="newsletterWrapper">
						<h5>Tilmeld vores nyhedsbrev!</h5>
						{ message2 && message2 }
						<form onSubmit={ handleSub }>
							<input type="text" name='name' placeholder='Dit name' required />
							<input type="email" name='email' placeholder='Din E-mail' required onChange={ e => Email( e ) } />
							<input type="submit" value="Tilmeld" />
						</form>
					</div>
					<form onSubmit={ handleContact }>
						<h3>Skriv til os</h3>
						{
							message && message
						}
						<input type="text" name="name" id="name" placeholder='Name' required />
						<input type="text" name="company" id="company" placeholder='Firma/organisation' required />
						<input type="text" name="email" id="email" placeholder='Email Adresse' required onChange={ e => Email( e ) } />
						<input type="number" name="phone" id="phone" placeholder='Telefon' required onChange={ e => Phone( e ) } />
						<textarea name="message" id="message" placeholder='Besked' required ></textarea>
						<input type="submit" name="submit" id="submit" value="Send" />
					</form>
				</div>
			</SectionContent>
		</section>
	)
}

export default Contact