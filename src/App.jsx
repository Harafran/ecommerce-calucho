import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
// En App.jsx
import { Toaster } from 'react-hot-toast'

// COMPONENTES
import Header from './components/Header'
import Footer from './components/Footer'

// VISTAS
import Home from './views/Home'
import Login from './views/Login'
//import DetalleProducto from './views/DetalleProducto' 


//------------------------ (Opcional por ahora)
const DetalleProducto = () => {
  return <h1>Detalle de Producto</h1>
}
//------------------------ (Cierre de la sección opcional)


const App = () => {

  // ESTADO GLOBAL DEL CARRITO
  const [cantidadCarrito, setCantidadCarrito] = useState(0)

  return (
    <div className="bg-gray-primary min-h-screen flex flex-col justify-between font-inter">

      {/* HEADER SIEMPRE VISIBLE */}
      <Header cantidad={cantidadCarrito} />

      {/* CONTENIDO DINÁMICO */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow">
        {/* Aquí es donde la magia ocurre: Las vistas cambian dinamicamente */}
        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home setCantidad={setCantidadCarrito} cantidadCarrito={cantidadCarrito} />} />

          {/* LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* DETALLE */}
          <Route path="/producto/:id" element={<DetalleProducto />} />

        </Routes>

      </main>

      {/* FOOTER */}
      <Footer />

      <Toaster position="bottom-right" reverseOrder={false} />

    </div>
  )
}

export default App