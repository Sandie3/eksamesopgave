import React, { useState } from 'react'

// Slider code
// https://codesandbox.io/s/elastic-hill-cmbz1?from-embed=&file=/src/App.js

export const SliderItem = ( { children, width } ) => {

	return (
		<div className="carousel-item" style={ { width: width } }>
			{ children }
		</div>
	)
}

const SliderWrapper = ( { children } ) => {
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const updateIndex = ( newIndex ) => {
		if ( newIndex < 0 ) {
			newIndex = React.Children.count( children ) - 1;
		} else if ( newIndex >= React.Children.count( children ) ) {
			newIndex = 0;
		}
		setActiveIndex( newIndex );
	};

	return (
		<div className="carousel" >
			<div className="inner" style={ { transform: `translateX(-${ activeIndex * 100 }%)` } } >
				{
					React.Children.map( children, ( child, index ) => {
						return React.cloneElement( child, { width: "100%" } );
					} )
				}
			</div>
				<button onClick={ () => { updateIndex( activeIndex - 1 ); } } className="left" >&#10094;</button>
			<div className="indicators">
				{
					React.Children.map( children, ( child, index ) => {
						return (
							<button className={ `${ index === activeIndex ? "active" : "" }` } onClick={ () => { updateIndex( index ); } } >
							</button>
						);
					} )
				}
			</div>
				<button onClick={ () => { updateIndex( activeIndex + 1 ); } } className="right" >&#10095;</button>
		</div>
	);
};

export default SliderWrapper;
