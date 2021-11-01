import React from 'react'

export const Input = ({formik, name, type, placeholder}) => {
	return (
		<div className="mb-4">
			<label className="block text-black text-sm font-bold mb-2"
				htmlFor={name}
			>{name}</label>
			<input
				type={type}
				className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline text-sm"
				id={name}
				placeholder={placeholder}
				value={formik.values[name]}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			{(formik.touched[name] && formik.errors[name]) && (
				<div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-600 p-4">
					<p className="font-bold">Error</p>
					<p>{formik.errors[name]}</p>
				</div>
			)}
		</div>
	)
}
