import React, {useReducer} from 'react';
import { axiosClient } from '../../config/axios';
import {
	SHOW_ALERT,
	CLEAN_ALERT,
	UPLOAD_FILE,
	UPLOAD_FILE_ERROR,
	UPLOAD_FILE_SUCCESS,
	CREATE_LINK_ERROR,
	CREATE_LINK_SUCCESS,
	CLEAN_STATE,
	ADD_PASSWORD,
	ADD_DOWNLOADS
} from '../types'
import { appContext } from './appContext';
import { AppReducer } from './appReducer,';

export const AppState = ({children}) => {

	const initialState = {
		fileMessage: null,
		name: '',
		originalName: '',
		loading: false,
		downloads: 1,
		password:'',
		author:null,
		url:''
	};

	const [state, dispatch] = useReducer(AppReducer, initialState)

	const showAlert = msg => { 
		dispatch({
			type: SHOW_ALERT,
			payload: msg
		})

		setTimeout(() => {
			dispatch({
				type: CLEAN_ALERT, 
			})
		}, 3000);
	}

	const uploadFiles = async (formData, originalName) => {  

		dispatch({ type: UPLOAD_FILE }) 

		try { 
			const result = await axiosClient.post('/api/files', formData);
			dispatch({
				type: UPLOAD_FILE_SUCCESS,
				payload: {
					name: result.data.file,
					originalName
				}
			})

		} catch (error) { 
			dispatch({
				type: UPLOAD_FILE_ERROR,
				payload: error.response ? error.response.data.msg : "An error has occurred"
			})
		}
	}

	const createLink = async ( ) => { 
		const data = {
			name: state.name,
			originalName: state.originalName,
			downloads: state.downloads,
			password: state.password,
			author: state.author
		};

		try {
			const result = await axiosClient.post('/api/links', data); 

			dispatch({
				type: CREATE_LINK_SUCCESS,
				payload: result.data.msg
			});

		} catch (error) {
			console.log(error);
		}
	}

	const cleanState = () => {
		dispatch({
			type:CLEAN_STATE
		})
	}

	const addPassword = password => { 
		dispatch({
			type:ADD_PASSWORD,
			payload: password
		})
	}

	const addDownload = downloads => {
		dispatch({
			type: ADD_DOWNLOADS,
			payload: downloads
		})
	}

	return(
		<appContext.Provider
		value={{
			fileMessage: state.fileMessage,
			name: state.name,
			originalName: state.originalName,
			loading: state.loading,
			downloads: state.downloads,
			password: state.password,
			author:state.author,
			url:state.url,
			showAlert,
			uploadFiles,
			createLink,
			cleanState,
			addPassword,
			addDownload
		}}>
			{children}
		</appContext.Provider>
	)
}