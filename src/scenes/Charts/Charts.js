import React from "react";
import Chart from "react-apexcharts";
import cooming from '../../assets/img/cooming.svg'

export const ChartsCompany = () => {
  const optionBar = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Colombia",
          "Brasil",
          "China",
          "Chile",
          "EE.UU",
          "Mexico",
          "Argentina",
          "Ecuador",
          "Peru",
          "India",
        ],
      },
    },
  };

  const options = {
    option: {
      labels: ["Enero", "Febrero", "Marzo", "Abril"],
    },
    series: [44, 55, 13, 33],
  };
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Agosto",
          "Septiembre",
        ],
      },
    },
    series: [
      {
        name: "Visualizaciones",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-20">
      <img className="mb-16 w-2/4" alt="chart" src={cooming} />
      <h3 className="font-medium text-4xl text-blue-900 text-center mx-4"> Estamos trabajando para su comodidad </h3>


    </div>
    /*    <div className="charts-company">
         
             <div className="item">
           <label>Vistas por mes </label>
   
           <Chart
             options={data.options}
             series={data.series}
             type="bar"
             width="100%"
             height="80%"
           />
         </div>
         <div className="item">
           <label>Vistas por mes </label>
   
           <Chart
             options={options.option}
             series={options.series}
             type="donut"
             width="100%"
             height="100%"
           />
         </div>
         <div className="item">
           <label>Paises </label>
           <Chart
             options={optionBar.options}
             series={optionBar.series}
             type="bar"
             width="110%"
             height="80%"
           />
         </div> 
       </div> */
  );
};
