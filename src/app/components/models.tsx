import { useEffect, useRef, useState } from "react";
import ModalStadictis from "./modelsStadicts";
import useStore from "@/store/store";
import Table from "./tabla";


const Modal = ({ result, isEstado = false, setIsEstado , tipo }) => {
  const [isOpen, setIsOpen] = useState(isEstado);
  const { count, increase, decrease } = useStore();
  const [formModals, setFormModals] = useState(false);
  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.classList.add('card_close');
    const timeoutId = setTimeout(() => {
      setIsOpen(false);
      // setIsEstado(false);
      modalRef.current.classList.remove('card_close');
      clearTimeout(timeoutId);
      
    }, 2000);
  };

  const openModal = () => {
    setIsOpen(true);
    modalRef.current.classList.add('card_open');
  };

  useEffect(() => {
    if (isOpen) {
      modalRef.current.classList.add("card_open");
    }
  }, [isOpen]);

  const handleStatisticsClick = () => {
setFormModals(true)
    closeModal();
  };
console.log({formModals})
  return (
    <>
      {count && <ModalStadictis datos={result} />}
      <div>
      {isOpen && (
        <div
        ref={modalRef}
        className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center bg-arturo"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xl mx-auto">
          <header className="bg-gray-200 p-8 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-700">Resultados</h1>
            <div
              id="card_close"
              className="modal-close cursor-pointer"
              onClick={(e) => {
                closeModal()
                setTimeout(() => {
                  // decrease()
                  window.location.reload()
                }
                , 2000)
              }}
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
      
          <div className="overflow-y-auto p-4 text-black">
            <div className="results-grid grid grid-cols-2 gap-4">
              {
                tipo === 'mmsc'?(
                  <>
                  <Table results ={result}/>
                  </>
                ):(
                  <>
                  {Object.entries(result.result).map(([key, value]) => {
                    if (key !== 'pn' && key !== 'system_name')
                      return (
                        <div key={key} className="result-item p-3 border">
                          <strong>{key}:</strong> {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
                        </div>
                      );
                  })}

                  </>
                                  )
              }
             
              
            </div>
          </div>
      
          <footer className="bg-gray-200 text-center py-2 rounded-b-lg cursor-pointer">
            {tipo === 'mmsc' ? (null):(<>
              <p className="text-sm text-gray-700" onClick={()=>{
                increase()
                handleStatisticsClick()
              }}>Estadísticas</p>
            </>)}
    
    </footer>
        </div>
      </div>
      
      // </div>
      
      )}
      </div>
    </>
  );
};

export default Modal;
