import React from 'react'
import NoDataImg from "../../assets/img/NoData.svg";

//Muestra una imagen cuando no hay datos que mostrar

export const NoData = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center my-20 ">
      <img className="w-2/12 mx-5" alt="no-data" src={NoDataImg} />
      <span className="text-blue-900 text-3xl font-bold my-12 ">
        No encontramos datos
      </span>
    </div>
  )
}
