import axios from 'axios'
import { baseUrl } from './Api'

export const getInfo = async () => {

	let res = await axios.get( baseUrl + 'contactinformation' )
		.then( res => { return res.data; } )
		.catch( err => { return err } )
	return res;

}

export const editInfo = async ( formData ) => {

	let formdata = new FormData( formData )

	let res = await axios.put( baseUrl + 'contactinformation/admin', formdata )
		.then( res => { return res.data; } )
		.catch( err => { return err } )
	return res;

}

export const postContact = async ( formData ) => {

	let formdata = new FormData( formData )

	let res = await axios.post( baseUrl + 'contact', formdata )
		.then( res => { return res.data; } )
		.catch( err => { return null } )
	return res;

}

export const getContact = async () => {

	let res = await axios.get( baseUrl + 'contact/admin' )
		.then( res => { return res.data; } )
		.catch( err => { return null } )
	return res;

}

export const patchContact = async ( id, data ) => {

	let res = await axios.patch( baseUrl + 'contact/admin/' + id, data )
		.then( res => { return res.data; } )
		.catch( err => { return null } )
	return res;

}

export const deleteContact = async ( id ) => {

	let res = await axios.delete( baseUrl + 'contact/admin/' + id )
		.then( res => { return res.data; } )
		.catch( err => { return null } )
	return res;

}

export const postSubscription = async ( formData ) => {

	let formdata = new FormData( formData )

	let res = await axios.post( baseUrl + 'newssubscription', formdata )
		.then( res => { return res.data; } )
		.catch( err => { return null } )
	return res;

}