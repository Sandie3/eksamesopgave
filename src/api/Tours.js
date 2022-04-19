import axios from 'axios'
import { baseUrl } from './Api'

export const getTours = async () => {

	let res = await axios.get( baseUrl + 'tours' )
		.then( res => { return res.data; } )
		.catch( err => { return err.response.data } )
	return res;

}