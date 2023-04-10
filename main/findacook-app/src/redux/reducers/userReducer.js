import { GET_USERS, GET_USER, CREATE_USER, DELETE_USER, EDIT_USER } from "../constants/userConstants";

const INITIAL_STATE = {
    users: []
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
			};
        case GET_USER:
            return {
                user: action.payload,
            };
		case CREATE_USER:
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case DELETE_USER:
				return {
					users: state.users.filter((c) => c._id !== action.payload._id),
				};
		case EDIT_USER:
					return {
                        user: action.payload,
					};
		default:
			return state;
	}
};
export default userReducer;