import React from "react";

// Componente input personalizado

const InputComponent = (props) => {

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
          `input-component ${props.className} ` +
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
              className="input-component"
              placeholder={props.placeholder}
              onFocus={props?.onFocus}
              ref={props.onRef}
              onBlur={(e) => {
                e.target.value === "Agregar una dirección" ?
                  props.setAux(true) : props.setAux(false)
              }}
            >
              {Data.map(MakeItem)}
            </select>
          ) : props.onChange !== undefined ? (
            <div className="input-component_content">
              <input
                name={props.name}
                type={props.type}
                className=""
                placeholder={props.placeholder}
                /*  onChange={
                   props.type === "tel"
                     ? (e) => props.onChange(e)
                     : (e) => props.onChange(e.target.value)
                 } */
                value={props.value}
                onFocus={props?.onFocus}
                ref={props.onRef}
                {...props}
              />
            </div>

          ) : (
            <div className="input-component_content">
              <input
                name={props.name}
                type={props.type}
                className=""
                placeholder={props.placeholder}
                onFocus={props?.onFocus}
                ref={props.onRef}
                {...props}

              />
              {props.icon !== "none" && (
                <i className={`${props.icon}`}></i>
              )}
            </div>
          )}
        </div>

      </div>
      {props.error && (
        <span className="text-red-500 text-base">{props.errorMsg}</span>
      )}
    </>
  );
};

export default InputComponent;
