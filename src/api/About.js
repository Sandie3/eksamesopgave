import axios from 'axios'
import { baseUrl } from './Api'

export const getAbout = async () => {

	let res = await axios.get( baseUrl + 'about' )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}