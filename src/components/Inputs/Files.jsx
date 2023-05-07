import { message } from 'antd'
import React from 'react'

// Componente input personalizado para subir archivos


const Files = ({ setvalue, value, typeData }) => {
	const handleOnchage = (event) => {
		const file = event.target.files[0]
		if (file?.type !== typeData) {
			message.error('El tipo de dato no es valido')
		} else {
			setvalue(file)
		}

	}
	return (
		<div>
			<input type="file" class="btn btn-outline-primary btn-icon m-1 w-full" onChange={handleOnchage} />
			<br />
			<span className="text-gray-600" >{value?.name}  </span>
		</div >
	)
}

export default Files;