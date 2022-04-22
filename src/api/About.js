import axios from 'axios'
import { baseUrl } from './Api'

export const getAbout = async () => {

	let res = await axios.get( baseUrl + 'about' )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}

export const editAbout = async ( data ) => {

	const getFormData = data => Object.keys( data ).reduce( ( formData, key ) => {
		formData.append( key, data[ key ] );
		return formData;
	}, new FormData() );

	let res = await axios.put( baseUrl + 'about/admin', getFormData( data ) )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}