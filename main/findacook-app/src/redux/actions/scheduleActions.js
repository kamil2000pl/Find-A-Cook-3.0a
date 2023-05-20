// import axios from 'axios';
// import { START_LOADING, STOP_LOADING } from '../constants/loadingConstants';
// import {
// 	SHOW_ERROR_MESSAGE,
// 	SHOW_SUCCESS_MESSAGE,
// } from '../constants/messageConstants';
// import {
// 	GET_SCHEDULES,
// } from '../constants/scheduleConstants';




// export const getSchedules = () => async dispatch => {
// 	try {
// 		dispatch({ type: START_LOADING });
// 		const response = await axios.get('/api/schedule');
// 		dispatch({ type: STOP_LOADING });
// 		dispatch({
// 			type: GET_SCHEDULES,
// 			payload: response.data,
			
// 		});
// 	} catch (err) {
// 		console.log('getSchedules api error: ', err);
// 		dispatch({ type: STOP_LOADING });
// 		dispatch({
// 			type: SHOW_ERROR_MESSAGE,
// 			payload: err.response.data.errorMessage,
// 		});
// 	}
// };

