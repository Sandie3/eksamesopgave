import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getInfo, postContact } from '../api/Contact'

const Contact = () => {

	const [ info, setInfo ] = useState()

	useEffect( () => {
		getInfo().then( res => {
			if ( res ) {
				setInfo( res )
			} else {
				setInfo()
			}
		} )
	}, [] )

	const handleSubmit = (e) => {
		e.preventDefault();
		postContact(e.target).then( res => {
			if (res) {
				console.log('sent')
			}else{
				console.log('error')
			}
		} )
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
								<p>{info.company}</p>
								<p>{info.address}</p>
								<p>{info.zipcity}</p>
								<p>{info.country}</p>
								<p>&#9743; {info.phone}</p>
								<p>&#9993; {info.email}</p>
								<p>CVR: {info.cvr}</p>
								<p>Åbnings tider: {info.openinghours}</p>
							</>
						}
					</div>
					<form onSubmit={handleSubmit}>
						<h3>Skriv til os</h3>
						<input type="text" name="name" id="name" placeholder='Name'/>
						<input type="text" name="company" id="company" placeholder='Firma/organisation' />
						<input type="text" name="email" id="email" placeholder='Email Adresse' />
						<input type="number" name="phone" id="phone" placeholder='Telefon' />
						<textarea name="message" id="message"  placeholder='Besked' ></textarea>
						<input type="submit" name="submit" id="submit" value="Send" />
					</form>
				</div>
			</SectionContent>
		</section>
	)
}

export default Contact