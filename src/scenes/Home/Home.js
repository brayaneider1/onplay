import React from "react";
import { useQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import jwt_decode from "jwt-decode";
import { Token } from "../../common/Storage/Token";
import { NoData } from "../../components/AuxiliarViews/NoData";
import Api from "../../common/Api/Api";
import soccer from '../../assets/img/soccer.png'
import volleyball from '../../assets/img/volleyball.png'
import basketball from '../../assets/img/basketball.png'
import tennis from '../../assets/img/tennis.png'

export const Home = () => {
  const userData = jwt_decode(Token.getToken());
  const { data, isLoading } = useQuery(
    "filedsLocal",
    () => Api.get("/LocalApp/getFields/" + userData.data.IdLocal),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  return (
    <>
      {Array.isArray(data?.payload) ? (
        <div className="home">
          <div className="home_content">
            {data?.payload.map((i) => (
              <a href={"/booking/" + i.IdField} className="item">
                <div className="item_circle">
                  <img
                    src={
                      i.NameFieldType === "Futbol" ? soccer :
                        i.NameFieldType === "Voleyball" ? volleyball :
                          i.NameFieldType === "BasketBall" ? basketball : tennis
                    }
                  />
                </div>
                <div className="item_content">
                  <p className="scene">{i.NameField}</p>
                  <p className="sport">{i.NameFieldType}</p>
                  <p className="state">{/* {i.state_scenario} */} Disponible </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}
      <Loading visible={isLoading} />
    </>
  );
};
