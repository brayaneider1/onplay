import React from "react";
import InputComponent from "../Inputs/InputComponent3/InputComponent3";
import File from "../Inputs/Files";
export const Steps1 = ({ data, register, getValues, setvalue, value,errors }) => {
  return (
    <>
      <h1>Datos del representante</h1>
      <InputComponent
        type="text"
        label="Nombre"
        placeholder=""
        icon="fa fa-user-o"
        className=" mb-2 mt-4"
        name="LegalRepresentative"
        defaultValue={data[0]?.LegalRepresentative}
        error={errors.LegalRepresentative}
        errorMsg="Complete este campo"
        {...register("LegalRepresentative", {required:true})}
        disabled
      />
      <InputComponent
        type="text"
        label="Correo electrónico"
        placeholder=""
        icon="fa fa-user-o"
        className=" mb-2"
        name="Email"
        defaultValue={getValues("Email")}
        {...register("Email", {required:true})}
        error={errors.Email}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="number"
        label="Numero de identificacion"
        placeholder=""
        icon="fa fa-user-o"
        className=" mb-2"
        name="Identification"
        defaultValue={getValues("Identification")}
        {...register("Identification", {required:true})}
        error={errors.Identification}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="number"
        label="Telefono"
        placeholder=""
        icon="fa fa-user-o"
        className=" mb-2"
        name="Phone"
        defaultValue={getValues("Phone")}
        {...register("Phone", {required:true})}
        error={errors.Phone}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="text"
        label="Dirección"
        placeholder=""
        icon="fa fa-user-o"
        className=" mb-2"
        name="Address"
        defaultValue={getValues("Address")}
        {...register("Address", {required:true})}
        error={errors.Address}
        errorMsg="Complete este campo"
      />
      <div className="w-11/12 py-2">
        <label htmlFor="">Documento de identidad de representante legal</label>
        <File typeData="application/pdf" setvalue={setvalue} value={value} />
      </div>
    </>
  );
};
