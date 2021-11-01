import React, { useReducer } from 'react';
import { authContext } from "./authContext";
import { AuthReducer } from "./authReducer";
import { REGISTER_ERROR, REGISTER_SUCCESS, CLEAN_ALERT, LOGIN_SUCCESS, LOGIN_ERROR, USER_AUTHENTICATED,LOGOUT } from '../types/'
import { axiosClient } from '../../config/axios'
import { tokenAuth } from '../../config/tokenAuth';

export const AuthState = ({ children }) => { 

	const initialState = {
		token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
		authenticated: false,
		user: null,
		message: null
	} 

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registerUser = async data => {
		try {
			const response = await axiosClient.post('/api/users', data);
			dispatch({ type: REGISTER_SUCCESS, payload: response.data.msg });
		} catch (error) {
			dispatch({ type: REGISTER_ERROR, payload: error.response.data.msg });
			console.error(error.response.data.msg);
		}

		setTimeout(() => {
			dispatch({ type: CLEAN_ALERT, payload: null })
		}, 3000); 
	}

	const logIn = async data => {
		try {
			const response = await axiosClient.post('/api/auth', data);
			dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
		} catch (error) {
			dispatch({ type: LOGIN_ERROR, payload: error.response.data.msg });
			console.error(error.response.data.msg);
		}

		setTimeout(() => {
			dispatch({ type: CLEAN_ALERT, payload: null })
		}, 3000); 
	}

	const userAuthenticated = async () => {
		const token = localStorage.getItem('token');  
		if(token) tokenAuth(token); 

		try {
			const response = await axiosClient.get('/api/auth');    
			if(response.data.user){
				dispatch({
					type:USER_AUTHENTICATED,
					payload: response.data.user
				})
			}  
		} catch (error) { 
			console.log(error);
			dispatch({ type: LOGIN_ERROR, payload: error.response.data.msg });
			console.error(error.response.data.msg);
		}
	}

	const logOut = () => { 
		dispatch({
			type:LOGOUT
		})
	}

	return (
		<authContext.Provider value={{
			token: state.token,
			authenticated: state.authenticated,
			user: state.user,
			message: state.message,
			registerUser,
			logIn,
			logOut,
			userAuthenticated
		}}
		>
			{children}
		</authContext.Provider>
	)
}