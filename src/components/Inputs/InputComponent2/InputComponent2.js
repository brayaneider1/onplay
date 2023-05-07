import React from "react";

// Componente input personalizado


const InputComponent2 = (props) => {

  var Data = props.options,
    MakeItem = function (X) {
      return (
        <>
          <option value={X.id} key={X.id}>{X?.name}</option>,
          {props.new ? <option key={1}>Agregar una dirección</option> : null}
        </>
      );
    };

  return (
    <>
      <div
        className={
          `input-component2 ${props.className} ` +
          (props.error && " border-red-500")
        }
      >
        <div className="w-11/12 ">
          <p
            className={`mini-texts  m-0 font-semibold  text-gray-500 ${props.labelColor} `}
          >
            {props.label}
          </p>
          {props.select ? ( 
            <select
            {...props}
              name={props.name}
              className="input-component2"
              placeholder={props.placeholder}
              onFocus={props?.onFocus}
              ref={props.onRef}
              onBlur={  (e) => {
                e.target.value === "Agregar una dirección" ?
                  props.setAux(true):props.setAux(false)
              }}
            >
              {Data.map(MakeItem)}
            </select>
          ) : props.onChange !== undefined ? (
            <input
              name={props.name}
              type={props.type}
              className=""
              placeholder={props.placeholder}
              value={props.value}
              onFocus={props?.onFocus}
              {...props}

            />
          ) : (
            <input
              name={props.name}
              type={props.type}
              className=""
              placeholder={props.placeholder}
              onFocus={props?.onFocus}
              {...props}


            />
          )}
        </div>
        <div className="w-1/12 pt-2">
          {props.icon !== "none" && (
            <i className={`${props.icon} text-gray-500`}></i>
          )}
        </div>
      </div>
      {props.error && (
        <span className="text-white">{props.errorMsg}</span>
      )}
    </>
  );
};

export default InputComponent2;
