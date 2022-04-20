import React, { useState, useEffect } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SectionContent } from '../components/SectionContent'
import { getTours } from '../api/Tours'
import { imgUrl } from '../api/Api'
import { Modal } from '../components/Modal'
import Star from '../Assets/red-star2.png'
import parser from 'html-react-parser'
import SliderWrapper, { SliderItem } from '../components/Slider'

const Tours = () => {

	const [ tours, setTours ] = useState()
	const [ tourContent, setTourContent ] = useState()
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

	const handleModal = ( id ) => {
		document.querySelector( "#modal" ).classList.toggle( "active" )
		setTourContent( tours[ id ] )
	}

	return (
		<section id='tours' className='tours'>
			<SectionTitle>Rejsemål</SectionTitle>
			<SectionContent>
				{
					tours &&
					<>
						<div className="toursWrapper">
							{
								tours.map( ( t, i ) => {
									return (
										<div className="tourItem" key={ i }>
											<img src={ imgUrl + "/tours/" + t.coverimage } alt={ t.title } />
											<div className="tourContent">
												<h3 className='tourTitle'>{ t.title }</h3>
												{ parser( rating( t.rating ) ) }
												<p className='tourDate'>{
													// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString#using_options
													new Date( t.traveldate ).toLocaleDateString( "da-DK", dateOptions )
												}</p>
												<p className='tourTeaser'>
													{ t.teaser }
												</p>
												<button onClick={ () => handleModal( i ) }>Læs mere</button>
											</div>
										</div>
									)
								} )
							}
						</div>
						<Modal>
							{
								tourContent &&
								<>
									<div className="modalTitle">
										<h3>{ tourContent.title }</h3>
										<button className="close" onClick={ handleModal }>&#10005;</button>
									</div>
									<hr />
									<div className="modalSlider">
										{/* Slider code */ }
										<SliderWrapper>
											{
												tourContent.gallery.map( ( img, i ) => {
													return (
														<>
															<SliderItem><img src={ imgUrl + "/tours/" + img } alt="Tour image" className='modalSliderImg' /></SliderItem>
														</>
													)
												} )
											}
										</SliderWrapper>
									</div>
									<div className="modalContent">
										<h1>{ tourContent.title }</h1>
										<h4>Du får:</h4>
										{ parser( tourContent.content.replace( "<p> *", "<p style='color: #a9a8a4;margin-left:30px;'> *" ) ) }
										<h4>Værelsestype</h4>
										{ parser( tourContent.roomtype ) }
										<p className='tourDate'>{ new Date( tourContent.traveldate ).toLocaleDateString( "da-DK", dateOptions ) }</p>
									</div>
									<hr />
									<div className="modalBot">
										<button onClick={ handleModal } >Close</button>
									</div>
								</>
							}
						</Modal>
					</>
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