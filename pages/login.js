import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react'
import { Input } from '../components/forms/Input';
import { Layout } from '../components/Layout';
import * as Yup from 'yup'
import { authContext } from '../context/auth/authContext';
import { Alert } from '../components/Alert'
import { useRouter} from 'next/router';

const Login = () => {
	const router = useRouter();

	const AuthContext = useContext(authContext);
	const { logIn, message, authenticated } = AuthContext;

	useEffect(() => {  
		if(authenticated){ 
			router.push('/');
		}
	}, [authenticated])

	//Form and validation with formik and yup
	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: Yup.object({ 
			email: Yup.string().email("Email invalid").required("Obligary field"),
			password: Yup.string().required("Obligary field").min(6, "Password at least 6 characters")
		}),
		onSubmit: values => { 
			logIn(values);
		}
	})

	return (
		<Layout>
		<div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
			<h2 className="text-4xl font-sans font-bold text-gray-800 text-center mb-4">Login</h2>

			{message && <Alert message={message} />}
			<div className="flex justify-center tm-5">
				<div className="w-full max-w-lg">
					<form
						className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
						onSubmit={formik.handleSubmit}
					> 
						<Input formik={formik} name="email" type="email" placeholder="correo@email.com"/>
						<Input formik={formik} name="password" type="password" placeholder="Password"/>
						<input
							type="submit"
							className="bg-red-500 hover:bg-gray-900 w-full p-2 mt-2 text-white uppercase font-bold cursor-pointer"
							value="Login"
						/>
					</form>
				</div>
			</div>

		</div>
	</Layout>
	)
}

export default Login;