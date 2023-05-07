import React from "react";

// Componente input personalizado


const InputComponent = (props) => {
  var Data = props.options,
    MakeItem = function (X) {
      return (
        <>
          {props.boris ? (
            <option value={X} key={X}>
              {X}
            </option>
          ) : (
            <option value={X.name} key={X?.id}>
              {X?.name}
            </option>
          )}
          ,{props.new ? <option key={1}>Agregar una dirección</option> : null}
        </>
      );
    };


  return (
    <>
      <div
        className={
          `input-component3 ${props.className} ` +
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
              name={props.name}
              className="input-component"
              placeholder={props.placeholder}
              onFocus={props?.onFocus}
              ref={props.onRef}
              {...props}
            /*         onBlur={(e) => {
                      e.target.value === "Agregar una dirección"
                        ? props.setAux(true)
                        : props.setAux(false);
                    }} */
            >
              {Data?.map(MakeItem)}
            </select>
          ) : props.onChange ? (
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
          ) : (
            <input
              name={props.name}
              type={props.type}
              className=""
              placeholder={props.placeholder}
              onFocus={props?.onFocus}
              ref={props.onRef}
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
        <span className="text-red-500 text-base">{props.errorMsg}</span>
      )}
    </>
  );
};

export default InputComponent;
