"use client";
import React, { useState, useEffect, useRef } from "react";
import "./Modal.css"; // Asegúrate de importar los estilos desde un archivo CSS externo
// import { Statistics } from "./statistics";

// import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useStore from "@/store/store";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const ModalStadictis = ({datos}) => {
    console.log({ datos });
  const { count, increase, decrease } = useStore();

  const data = datos.result.pn.map((num, index) => ({
    name: `n${index + 1}`,
    uv: num,

  }));
  const [isOpen, setIsOpen] = useState(count);
  const modalRef = useRef(null);

  // useEffect(() => {
  //   console.log({ count });
  //   setIsOpen(count);
  // }, [count]);

 
  return (
    <>
      <div>
        {/* <button
        className={`py-8 px-8 bg-green-400 z-10 hover:bg-green-300 border-gray-500 text-blue-50 hover:text-white rounded-md ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleModal}
      >
        Open a modal
      </button> */}

        {isOpen && (
          <div
            ref={modalRef}
            className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center bg-arturo"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xl mx-auto">
              <header className="bg-gray-200 p-8 flex justify-between items-center py-3">
                <h1 className="text-xl font-bold text-gray-700">
                  Estadisticas
                </h1>
                <div
                  id="card_close"
                  className="modal-close cursor-pointer z-50"
                  onClick={
                    () => window.location.reload()
                  }
                >
                  <svg
                    className="fill-current text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </header>

              <div className="overflow-y-auto h-full">
                <div className="p-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 text-black">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="bg-gray-200 text-center py-3 rounded-b-lg cursor-pointer">
            
              </footer>
            </div>
          </div>
        )}
      </div>
      {/* <Statistics/> */}
    </>
  );
};

export default ModalStadictis;
