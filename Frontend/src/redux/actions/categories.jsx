import axios from 'axios'
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
} from './types'
const backend_url = 'http://trendyswap.es:8000';

export const getCategories = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    try{
        const res = await axios.get(`${backend_url}/api/category/categories/`, config)

        if(res.status === 200){
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            })
        }
        
    }   
    catch(err){
        dispatch({
            type: GET_CATEGORIES_FAIL
        })
    }
}