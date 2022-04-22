import axios from 'axios'
import { baseUrl } from './Api'

export const getTours = async () => {

	let res = await axios.get( baseUrl + 'tours' )
		.then( res => { return res.data; } )
		.catch( err => { return err } )
	return res;

}

export const createTours = async ( data ) => {

	let formdata = new FormData( data )

	let res = await axios.post( baseUrl + 'tours/admin', formdata )
		.then( res => { return res.data; } )
		.catch( err => { return err.response } )
	return res;

}

export const editTours = async (id, data ) => {

	let formdata = new FormData( data )

	let res = await axios.put( baseUrl + 'tours/admin/' + id, formdata )
		.then( res => { return res.data; } )
		.catch( err => { return err.response } )
	return res;

}

export const deleteTours = async ( id ) => {

	let res = await axios.post( baseUrl + 'tours/admin/' + id )
		.then( res => { return res.data; } )
		.catch( err => { return err } )
	return res;

}