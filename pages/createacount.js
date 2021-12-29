
import React, { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Input } from '../components/forms/Input';
import { authContext } from '../context/auth/authContext';
import { Alert } from '../components/Alert';

const CreateAcount = () => {
	const AuthContext = useContext(authContext);
	const { registerUser, message } = AuthContext;
 
	//Form and validation with formik and yup
	const formik = useFormik({
		initialValues: { name: "", email: "", password: "" },
		validationSchema: Yup.object({
			name: Yup.string().required("Obligary field"),
			email: Yup.string().email("Email invalid").required("Obligary field"),
			password: Yup.string().required("Obligary field").min(6, "Password at least 6 characters")
		}),
		onSubmit: values => {
			registerUser(values);
		}
	});

	return (
		<Layout>
			<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
				<h2 className="text-4xl font-sans font-bold text-gray-800 text-center mb-4">Create acount</h2>
				{message && <Alert message={message}/>}

				<div className="flex justify-center tm-5">
					<div className="w-full max-w-lg">
						<form
							className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
							onSubmit={formik.handleSubmit}
						>
							<Input formik={formik} name="name" type="text" placeholder="Username" />
							<Input formik={formik} name="email" type="email" placeholder="correo@email.com" />
							<Input formik={formik} name="password" type="password" placeholder="Password" />
							<input
								type="submit"
								className="bg-blue-500 hover:bg-gray-900 w-full p-2 mt-2 text-white uppercase font-bold cursor-pointer"
								value="Create acount"
							/>
						</form>
					</div>
				</div>

			</div>
		</Layout>
	)
}

export default CreateAcount;