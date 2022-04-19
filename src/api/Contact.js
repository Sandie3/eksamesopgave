import axios from 'axios'
import { baseUrl } from './Api'

export const getInfo = async () => {

	let res = await axios.get( baseUrl + 'contactinformation' )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}