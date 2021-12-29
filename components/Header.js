import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { authContext } from '../context/auth/authContext';
import { appContext } from '../context/app/appContext';

export const Header = () => {
	const AuthContext = useContext(authContext);
	const { authenticated, user, logOut } = AuthContext;

	const AppContext = useContext(appContext);
	const { cleanState } = AppContext;

	const router = useRouter();

	const redirectToHone = () => {
		cleanState();
		router.push('/');
	}

	return (
		<header className="py-8 flex flex-col md:flex-row items-center justify-between">
			<img className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" onClick={redirectToHone} />
			{(authenticated && user) ? (
				<div className="flex items-center">
					<p className="mr-2">Hola, {user.name}</p>
					<button
						onClick={logOut}
						className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
						type="button">Cerrar sesion</button>
				</div>
			) : (
				<div>
					<Link href="/login">
						<a className="bg-blue-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">LogIn</a>
					</Link>
					<Link href="/createacount">
						<a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase ">Create acount</a>
					</Link>
				</div>
			)}


		</header>
	)
}
