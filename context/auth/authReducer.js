import { REGISTER_ERROR, REGISTER_SUCCESS, CLEAN_ALERT, LOGIN_SUCCESS, LOGIN_ERROR, USER_AUTHENTICATED, LOGOUT } from '../types/'


export const AuthReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
		case REGISTER_ERROR:
		case LOGIN_ERROR:
		case CLEAN_ALERT:
			return {
				...state,
				message: action.payload
			}
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload);
			return {
				...state,
				token: action.payload,
				authenticated: true
			}
		case USER_AUTHENTICATED: 
			return {
				...state,
				authenticated: true,
				user: action.payload
			}
		case LOGOUT:
		localStorage.removeItem('token');
		return {
			...state,
			user:null,
			token: null,
			authenticated: null,
		}
		default:
			return state;
	}
}