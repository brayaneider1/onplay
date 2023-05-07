import React from "react";
import InputComponent from "../Inputs/InputComponent3/InputComponent3";
import File from '../Inputs/Files'

export const Steps2 = ({ data, register, getValues, setvalue, value, errors }) => {
  return (
    <>
      <h1>Datos de la empresa</h1>
      <InputComponent
        type="text"
        label="Nombre de la empresa"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="NameCompany"
        defaultValue={data[0]?.NameCompany}
        {...register("NameCompany")}
        error={errors.NameCompany}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="number"
        label="NIT"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="NitCompany"
        defaultValue={getValues("NitCompany")}
        pattern="[0-9]+"
        {...register("NitCompany", { required: true ,pattern: /[0-9]{4}/, minLength: 7, 
        maxLength: 11})}
        error={errors.NitCompany}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="text"
        label="Dirección"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="CompanyAddress"
        defaultValue={getValues("CompanyAddress")}
        {...register("CompanyAddress", { required: true })}
        error={errors.CompanyAddress}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="number"
        label="Telefono"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="CompanyPhone"
        defaultValue={data[0].CompanyPhone}
        pattern="[0-9]+"
        {...register("CompanyPhone", { required: true ,pattern: /[0-9]{4}/, minLength: 10, 
        maxLength: 10})}        error={errors.CompanyPhone}
        errorMsg="El teléfono debe contener 10 caracteres"
        disabled
      />
      <InputComponent
        type="text"
        label="País"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="Country"
        defaultValue={data[0]?.Country}
        {...register("Country", { required: true })}
        error={errors.Country}
        errorMsg="Complete este campo"
        disabled
      />
      <InputComponent
        type="text"
        label="Departamento"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="State"
        defaultValue={data[0]?.State}
        {...register("State", { required: true })}
        error={errors.State}
        errorMsg="Complete este campo"
        disabled
      />
      <InputComponent
        type="text"
        label="Ciudad"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="Municipality"
        defaultValue={data[0]?.Municipality}
        {...register("Municipality", { required: true })}
        error={errors.State}
        errorMsg="Complete este campo"
        disabled
      />
      <InputComponent
        type="number"
        label="Codigo postal"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="ZipCode"
        defaultValue={getValues("ZipCode")}
        {...register("ZipCode", { required: true })}
        error={errors.ZipCode}
        errorMsg="Complete este campo"
      />
      <InputComponent
        type="email"
        label="Correo electronico"
        placeholder=""
        icon="fa fa-user-o"
        className=" "
        name="CompanyEmail"
        defaultValue={data[0]?.CompanyEmail}
        {...register("CompanyEmail", { required: true })}
        error={errors.CompanyEmail}
        errorMsg="Complete este campo"
        disabled
      />

      <div className="w-11/12 py-2">
        <label htmlFor="">Documento de representación legal</label>
        <File typeData="application/pdf" setvalue={setvalue} value={value} />
      </div>
      <input
        type="submit"
        defaultValue="Enviar"
        className="btn_accent_blue submit"
      />
    </>
  );
};
