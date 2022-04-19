import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getTours } from '../api/Tours'
import { imgUrl } from '../api/Api'
import Star from '../Assets/red-star2.png'
import parser from 'html-react-parser'

const Tours = () => {

	const [ tours, setTours ] = useState()
	const [ loading, setLoading ] = useState()
	const [ err, setErr ] = useState()

	useEffect( () => {

		getTours().then( res => {
			if ( res ) {
				setTours( res )
			} else {
				setTours()
			}
		} )

	}, [] )

	const rating = ( rating ) => {
		let star = ``;
		for ( let i = 0; i < rating; i++ ) {
			star += `<img src=${ Star } alt="Red star" className="starImg" /> `
		}
		return star
	}

	const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

	return (
		<section id='tours' className='tours'>
			<SectionTitle>Rejsemål</SectionTitle>
			<SectionContent>
				{
					tours &&
					<div className="toursWrapper">
						{
							tours.map( t => {
								return (
									<div className="tourItem">
										<img src={ imgUrl + "/tours/" + t.coverimage } alt={ t.title } />
										<div className="tourContent">
											<h3 className='tourTitle'>{ t.title }</h3>
											{ parser( rating( t.rating ) ) }
											<p className='tourDate'>{
												// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#using_options
												new Date( t.traveldate ).toLocaleDateString( "da-DK", dateOptions )
											}</p>
											<p className='tourTeaser'>
												{t.teaser}
											</p>
											<button>Læs mere</button>
										</div>
									</div>
								)
							} )
						}
					</div>
				}
				{
					loading && !tours &&
					<>Loading...</>
				}
				{
					err && <>Error!</>
				}
			</SectionContent>
		</section>
	)
}

export default Tours