import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
import {
	SHOW_ERROR_MESSAGE,
	SHOW_SUCCESS_MESSAGE
} from '../constants/messageConstants';
import {
	GET_USERS,
    GET_USER,
	CREATE_USER,
	DELETE_USER,
	EDIT_USER
} from '../constants/userConstants.js';
import axios from 'axios';

export const getUsers = () => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get('/api/user');
		console.log(response);
		console.log('Hey1',response.data);
		dispatch({ type: STOP_LOADING });
		dispatch({ type: GET_USERS, payload: response.data });
	} catch (err) {
		console.log('getUsers api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

export const getUser = userId => async dispatch => {
	try {
		console.log("id3", userId)
		dispatch({ type: START_LOADING });
		const response = await axios.get(`/api/user/${userId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: GET_USER,
			payload: response.data,
		});
	} catch (err) {
		console.log('getUser api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

export const createUser = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		dispatch({ type: START_LOADING });
		const response = await axios.post('/api/user', formData, config);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_SUCCESS_MESSAGE,
			payload: response.data.successMessage,
		});
		dispatch({ type: CREATE_USER, payload: response.data.user });
	} catch (err) {
		console.log('createUser api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};

export const deleteUser = userId => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.delete(`/api/user/${userId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: DELETE_USER,
			payload: response.data,
		});
	} catch (err) {
		console.log('deleteUser API error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
}

export const editUser = userId => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const response = await axios.get(`/api/user/${userId}`);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: EDIT_USER,
			payload: response.data,
		});
	} catch (err) {
		console.log('getUsers api error: ', err);
		dispatch({ type: STOP_LOADING });
		dispatch({
			type: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}
};