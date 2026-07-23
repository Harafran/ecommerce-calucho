import React from 'react'

const Card = ({ producto, onAgregar }) => {

  const { nombre, precio, precioAntiguo, descuento, imagen } = producto

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:scale-[1.02] transition-all duration-300 font-sans p-3">

      {/* Imagen */}
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center relative">
  
        <img 
          src={imagen} 
          alt={nombre}
          className="w-full h-full object-cover"
        />

        {/* Badge descuento */}
        {descuento && (
          <span className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow">
            {descuento}
          </span>
        )}

      </div>

      {/* Detalles */}
      <div className="mt-3 flex flex-col flex-grow p-2">

        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
          {nombre}
        </h4>

        <div className="flex items-center gap-2 mt-2">

          <span className="text-base font-bold text-emerald-700">
            S/ {precio.toFixed(2)}
          </span>

          <span className="text-xs text-gray-400 line-through">
            S/ {precioAntiguo.toFixed(2)}
          </span>

        </div>

        <button 
          onClick={onAgregar}
          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-colors shadow-sm"
        >
          Añadir al carrito
        </button>

      </div>

    </div>
  )
}

export default Card