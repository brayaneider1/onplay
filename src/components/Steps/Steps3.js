import React from 'react';
import InputComponent from '../Inputs/InputComponent3/InputComponent3';

export const Steps3 = ({ errors, register }) => {
  return (
    <div>
      <InputComponent
        type="number"
        label="Teléfono"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="Teléfono"
        {...register("Teléfono")} />

      <input
        type="submit"
        className="btn_accent_blue "
      />


    </div>
  );
};
