import axios from 'axios'
import { baseUrl } from './Api'

export const getFooter = async () => {

	let res = await axios.get( baseUrl + 'footer' )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}