import axios from 'axios';
import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
	SHOW_ERROR_MESSAGE,
	SHOW_SUCCESS_MESSAGE,
} from '../constants/messageConstants';
import {
    CREATE_COOK,
	GET_COOKS,
	GET_COOK
} from '../constants/cookConstants';


export const createCook = formData => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.post('/api/cook', formData);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_SUCCESS_MESSAGE,
			payload: response.data.successMessage,
		});
		dispatch({
			type: CREATE_COOK,
			payload: response.data.cook,
		});
	} catch (err) {
		console.log('createCook api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};


export const getCooks = () => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get('/api/cook');
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_COOKS,
			payload: response.data,
			
		});
	} catch (err) {
		console.log('getCooks api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};


export const getCook = cookId => async dispatch => {
	try {
		console.log("id3", cookId)
		dispatch({ type: START_LOADING });
		const response = await axios.get(`/api/cook/${cookId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_COOK,
			payload: response.data,
		});
	} catch (err) {
		console.log('getCook api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};