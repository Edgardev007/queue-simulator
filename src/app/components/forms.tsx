"use client";
import React, { useState, useEffect } from "react";
import Modal from './models'; // Fixed typo
import useStore from "@/store/store";

export function Forms(props) {
  const [dataStatus, setDataStatus] = useState(null);
  const [isEstado, setIsEstado] = useState(false);
  const { count, increase, decrease } = useStore(); // Are these used?
  const { tipo } = props;
  const url = 'http://localhost:3001/api';
  const titulo = {
    "mm1": "Queue M/M/1",
    "mms": "Queue M/M/S",
    "mm1k": "Queue M/M/1/K",
    "mmsk": "Queue M/M/S/K",
    "mmsc": "Queue M/M/S/ Costos",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataForm = Object.fromEntries(formData);

    try {
      const response = await fetch(`${url}/${tipo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setDataStatus(data);
      setIsEstado(true);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <>
      {isEstado && <Modal isEstado={isEstado} setIsEstado={setIsEstado} result={dataStatus} tipo={tipo}/>}
      <form onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl mb-6">{titulo[tipo]}</h1>
        <div className="flex flex-wrap mb-4 -mx-2">
          <div className="w-full px-2">
            <label className="block mb-2" htmlFor="capacity">
              λ | Arrival Rate
            </label>
            <input
              className="w-full p-2 rounded bg-white border border-gray-700 text-black"
              id="capacity"
              name="lamb"
              type="text"
              required
              placeholder="k"
            />
          </div>
          <div className="w-full px-2">
            <label className="block mb-2" htmlFor="serviceRate">
              µ | Service Rate
            </label>
            <input
              className="w-full p-2 rounded bg-white border border-gray-700 text-black"
              id="serviceRate"
              name="mu"
              required
              type="text"
              placeholder="µ"
            />
            {(tipo === 'mms' || tipo === 'mmsc') && (
              <>
                <label className="block mb-2" htmlFor="servers">
                  S | Number of Servers
                </label>
                <input
                required
                  className="w-full p-2 rounded bg-white border border-gray-700 text-black"
                  id="servers"
                  name="s"
                  type="text"
                  placeholder="s"
                />
              </>
              )}
            {tipo === 'mm1k' && (
              <>
                <label className="block mb-2" htmlFor="servers">
                  K | Capacity
                </label>
                <input
                  className="w-full p-2 rounded bg-white border border-gray-700 text-black"
                  id="servers"
                  name="k"
                  required
                  type="text"
                  placeholder="k"
                />
              </>
              )}
            {tipo === 'mmsc' && (
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2" htmlFor="cw">
                  CW | Costos de espera
                </label>
                <input
                required
                  className="w-full p-2 rounded bg-white border border-gray-700 text-black"
                  id="cw"
                  name="cw"
                  type="text"
                  placeholder="CW"
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="cs">
                  CS | Costos de servicio
                </label>
                <input
                required
                  className="w-full p-2 rounded bg-white border border-gray-700 text-black"
                  id="cs"
                  name="cs"
                  type="text"
                  placeholder="CS"
                />
              </div>
            </div>
              )}
          
            
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Calculate
        </button>
      </form>
    </>
  );
}
