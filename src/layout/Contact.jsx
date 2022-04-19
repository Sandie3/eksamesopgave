import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getInfo } from '../api/Contact'

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
					<form>
						<h3>Skriv til os</h3>
						<input type="text" name="" id="" />
						<input type="text" name="" id="" />
						<input type="text" name="" id="" />
						<input type="number" name="" id="" />
						<textarea name="" id=""></textarea>
						<input type="submit" name="" id="" />
					</form>
				</div>
			</SectionContent>
		</section>
	)
}

export default Contact