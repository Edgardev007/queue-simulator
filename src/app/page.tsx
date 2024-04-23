import Link from "next/link";

export default function Home (){
    return(
      <main className="bg-azul">
      <div className="container mx-auto px-4">
         
          <div className="mt-10 grid grid-cols-2 gap-8">
              <Link className="bg-white rounded shadow-sm p-6" href={'/mm1'}>
                  <h2 className="font-semibold text-lg mb-2">M/M/1</h2>
                  <p className="text-gray-700">Población infinita canal simple</p>
              </Link>
              <Link href={'/mms'} className="bg-white rounded shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-2">M/M/S</h2>
                  <p className="text-gray-700">Población infinita canal múltiple</p>
              </Link>
              <Link href={'/mm1k'} className="bg-white rounded shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-2">M/M/1/K</h2>
                  <p className="text-gray-700">Población finita canal simple</p>
              </Link>
              <Link href={'/mmsc'} className="bg-white rounded shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-2">M/M/S/C</h2>
                  <p className="text-gray-700">Población finita canal múltiple</p>
              </Link>
          </div>
      </div>
  </main>
    )
  }