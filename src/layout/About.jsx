import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getAbout } from '../api/About'
import { imgUrl } from '../api/Api'
import parser from 'html-react-parser'

const About = () => {

	const [ about, setAbout ] = useState( null )
	const [ loading, setLoading ] = useState( false )
	const [ err, setErr ] = useState( null )

	useEffect( () => {

		getAbout().then( res => {
			setLoading( true )
			if ( res ) {
				setAbout( res )
				setErr()
			} else {
				setAbout()
				setErr( true )
			}
			setLoading( false )
		} )

	}, [] )


	return (
		<section id='about' className='about'>
			<SectionTitle>Om os</SectionTitle>
			<SectionContent>
				{
					about &&
					<div className="aboutContent">
						{ parser( about.content ) }
						<div className="aboutImg">
							<img src={ imgUrl + "/about/" + about.image } alt="About image" />
						</div>
					</div>
				}
				{
					loading && !about &&
					<>Loading...</>
				}
				{
					err && <>Error!</>
				}
			</SectionContent>
		</section>
	)
}

export default About