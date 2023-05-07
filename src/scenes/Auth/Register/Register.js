import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { Steps1 } from "../../../components/Steps/Steps1";
import { Steps2 } from "../../../components/Steps/Steps2";
import { useForm } from "react-hook-form";
import { Steps, Step } from "react-step-builder";
import logo from "../../../assets/img/Logo.svg";
import { Link, useParams } from "react-router-dom";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import bg from "../../../assets/img/bg-blue.png";
import jwt_decode from "jwt-decode";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Loading } from "../../../components/Loading/Loading";
import { UploadFirebase } from "../../../components/firebase/PromiseUpload";
import { modalSucces } from "../../../components/SweetAlert/Success";
import { modalError } from "../../../components/SweetAlert/Error";

const Navigation = (props) => {
  return (
    <Row justify="end" className="w-11/12">
      {props.current !== props.allSteps.length - 2 && (
        <Col>
          <Button
            className="btn_accent_orange"
            onClick={props.prev}
            style={{ marginRight: 5 }}
          >
            <BsArrowLeft />
          </Button>
        </Col>
      )}
      {props.current !== props.allSteps.length && (
        <Col>
          <Button className="btn_accent_blue" onClick={props.next}>
            <BsArrowRight />
          </Button>
        </Col>
      )}
    </Row>
  );
};

export const Register = () => {

  const params = useParams();
  const registerData = jwt_decode(params.token);
  const config = {
    navigation: {
      component: Navigation, // a React component with special props provided automatically
      location: "after", // or before
    },
  };
  const [value, setvalue] = useState("");
  const [value2, setvalue2] = useState("");
  const [loadData, setloadData] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (registerData) {
      setValue("LegalRepresentative", registerData.data[0].LegalRepresentative);
      setValue("CompanyPhone", registerData.data[0].CompanyPhone);
      setValue("Country", registerData.data[0].Country);
      setValue("State", registerData.data[0].State);
      setValue("Municipality", registerData.data[0].Municipality);
      setValue("CompanyEmail", registerData.data[0].CompanyEmail);
    }
  }, [registerData]);
  const onSubmit = (data) => {
    if (value !== "" && value2 !== "") {
      return Promise.all([UploadFirebase({ value: value }), UploadFirebase({ value: value2 })]).then((res) => {
        fetch(`https://api.onplay.com.co/request/insertComplements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            FileDocumentIdentification: res[0],
            FileDocument: res[1],
          }, setloadData(true)),
        }).then((response) => {
          setloadData(false)
          if (response.ok) {
            modalSucces({ message: 'Se ha registrado con exito', url: "/" })
          } else {
            if (response.json().code == "ER_DUP_ENTRY") {
              modalError({ message: 'El correo ya ha sido registrado' })
            }else{
              modalError({ message: 'Parece que tenemos problemas' })
            }
          }
        });
      });
    } else {
      setloadData(false)
      modalError({ message: 'Parece que tenemos problemas' })
    }
  };



  return (
    <div className="register">
      <div className="register_logo" style={{ backgroundImage: `url(${bg})` }}>
      <img alt="logo" src={logo} />
        <span>
          On play</span>
        <p>
          ¿Ya no tienes una cuenta?
          <b>
            <Link to="/"> Inicia sesion</Link>
          </b>
        </p>
      </div>
      <div className="register_content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Steps config={config}>
            <Step
              component={() => (
                <Steps1
                  data={registerData.data}
                  getValues={getValues}
                  setvalue={setvalue}
                  value={value}
                  errors={errors}
                  register={register}
                />
              )}
            />
            <Step
              component={() => (
                <Steps2
                  data={registerData.data}
                  getValues={getValues}
                  setvalue={setvalue2}
                  value={value2}
                  errors={errors}
                  register={register}
                />
              )}
            />
          </Steps>
        </form>
      </div>
      <Loading visible={loadData} />
    </div>
  );
};
