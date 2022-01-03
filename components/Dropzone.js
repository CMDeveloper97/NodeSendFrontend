import React, { useState, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone';
import { axiosClient } from '../config/axios'
import { appContext } from '../context/app/appContext';
import { authContext } from '../context/auth/authContext';
import { FormPassword } from './FormPassword';

export const Dropzone = () => {

	const AppContext = useContext(appContext);
	const { showAlert, uploadFiles, loading, createLink } = AppContext;

	const AuthContext = useContext(authContext);
	const { user, authenticated } = AuthContext;

	const onDropAccepted = useCallback(async (acceptedFiles) => { 
		const formData = new FormData();
		formData.append('file', acceptedFiles[0]);    
		uploadFiles(formData, acceptedFiles[0].path);
	}, []);

	const onDropRejected= () =>{ 
		showAlert('Cannot upload. Maximum file size 1MB for no acounts users.');
	}

	const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, 
		maxSize:  authenticated ? (1024*1024*10) : (1024*1024) });

	const files = acceptedFiles.map(file => (
		<li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded break-words">
			<p className="font-bold text-xl">{file.path}</p>
			<p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
		</li>
	));



	return (
		<div  className=
			{"md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2  bg-gray-100 px-4 break-words max-w-sm " + 
			(acceptedFiles.length > 0 ? 'cursor-default' : 'cursor-pointer')
		}> 
			{
				acceptedFiles.length > 0 ? (
					<div className="mt-10 w-full">
						<h4 className="text-2xl font-bold text-center mb-4">File</h4>
						<ul> {files} </ul>

						{authenticated && <FormPassword/>}

						{loading ? <p className="my-10 text-center text-gray-600">Upload file...</p> : (
								<button
								type="button"
								className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
								onClick={createLink}
							> 
							Create link
						</button>
						)}
					
					</div> 
				) : (
					<div {...getRootProps({ className: "dropzone w-full py-32" })}>
						<input className="h-100" {...getInputProps()} />
						{
							isDragActive ? <p className="text-2xl text-center text-gray-600">Drop here</p> :
								<div className="text-center">
									<p className="text-2xl text-center text-gray-600">Drag and drop some files here</p>
									<button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 lg:hidden"
										type="button">
										Select files to upload
									</button>
								</div>
						}
					</div>
				)
			}
		
		</div>
	)
}
