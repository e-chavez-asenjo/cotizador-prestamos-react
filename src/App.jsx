import { useState, useEffect } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import { formatearDinero, calcularTotalPagar } from './helpers'
function App() {
 const [cantidad, setCantidad] = useState(10000)
 const [meses, setMeses] = useState(6)
 const [total, setTotal] = useState(0)
 const [pago, setPago] = useState(0)

 useEffect(() => {
   const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar);

 }, [cantidad, meses]);
 
  useEffect(() => {
    // calcular el pago mensual
    setPago(total / meses);

 }, [total, meses]);
 
 
 const MIN = 0;
 const MAX = 20000;
 const STEP = 100;

 function handleChange(e) {
  setCantidad(+e.target.value)
 }
 function handleClickDecremento (){
  const valor = cantidad - STEP;
  if (valor < MIN) {
    alert('Cantidad no válida');
    return;
  }
  setCantidad(valor);
 }

 function handleClickIncremento(){
  const valor = cantidad + STEP;

  if (valor > MAX) {
    alert('Limite alcanzado');
    return;
  }
  setCantidad(valor);
 }
  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className='flex justify-between my-6'>
        <Button
          operador="-"
          fn={handleClickDecremento}
        />
        <Button
          operador="+"
          fn={handleClickIncremento}
        />
      </div>
      <input 
        type='range' 
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className="text-center text-5xl font-extrabold text-indigo-600 my-10">
        {formatearDinero(cantidad)}
      </p>

      <h2 className='text-center text-2xl font-extrabold text-gray-500'>
        Elige un <span className="text-indigo-600"  >plazo</span> a pagar
      </h2>
      <select 
        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-5"
        value={meses}
        onChange={(e) => setMeses(+e.target.value)}
        >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
      <div className='my-5 space-y-3 bg-gray-50 p-5'>

      <h2 className='text-center text-2xl font-extrabold text-gray-500'>
        Resumen <span className="text-indigo-600">de pagos</span>
      </h2>
      <p className='text-xl font-bold text-center text-gray-500'>{meses} Meses</p>
      <p className='text-xl font-bold text-center text-gray-500'>{formatearDinero(total)} Total a pagar</p>
      <p className='text-xl font-bold text-center text-gray-500'> <span className="text-indigo-600">{formatearDinero(pago)}</span> Mensuales</p>
      </div>
    </div>
  /*el onChange es el equivalente a:
  const formulario = document.querySelector('form')
  formulario.addEventListener('change')*/
  )
}

export default App
