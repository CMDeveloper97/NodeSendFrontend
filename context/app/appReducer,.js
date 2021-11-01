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

export const AppReducer = (state, action) => {
	switch (action.type) {
		case SHOW_ALERT:
			return {
				...state,
				fileMessage: action.payload
			}
		case CLEAN_ALERT:
			return {
				...state,
				fileMessage: null
			}
		case UPLOAD_FILE:
			return {
				...state,
				loading: true
			}
		case UPLOAD_FILE_SUCCESS:
			return {
				...state,
				name: action.payload.name,
				originalName: action.payload.originalName, 
				loading: false
			}
		case UPLOAD_FILE_ERROR:
			return {
				...state,
				fileMessage: action.payload,
				loading: false
			}

		case CREATE_LINK_SUCCESS: 
		return {
			...state,
			url: action.payload
		}
		case CLEAN_STATE: 
		return {
			...state,
			fileMessage: null,
			name: '',
			originalName: '',
			loading: false,
			downloads: 1,
			password:'',
			author:null,
			url:''
		}
		case ADD_PASSWORD:
			return{
				...state,
				password: action.payload
			}  
		
		case ADD_DOWNLOADS:
			console.log("AQUI");
			return {
				...state,
				downloads: action.payload
			}
		default:
			return state;
	}
};