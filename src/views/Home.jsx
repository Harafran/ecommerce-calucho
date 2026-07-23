import React, { useState, useEffect } from "react"
import Card from "../components/Card"

// IMÁGENES
import queso from "../assets/d_Calucho_Queso_Crema.png"
import manjar from "../assets/d_Calucho_Manjar.png"
import yogurt from "../assets/d_Calucho_Yogurt_Fresa.png"
import helado from "../assets/d_Calucho_Helado.png"
import mantequilla from "../assets/d_Calucho_Mantequilla.png"
import crema from "../assets/d_Calucho_Crema_Leche.png"

import queso_andino from "../assets/d_Calucho_Queso_Andino.png"
import mantequilla_gourmet from "../assets/d_Calucho_Mantequilla_Gourmet.png"
import queso_mantecoso from "../assets/d_Calucho_Queso_Mantecoso.png"
import yogurt_guanabana from "../assets/d_Calucho_Yogurt_Guanabana.png"
import yogurt_natural from "../assets/d_Calucho_Yogurt_Natural.png"
import queso_parmesano from "../assets/d_Calucho_Queso_Parmesano.png"

// Home recibe "setCantidad" desde App.jsx (así el contador del Header,
// que vive en App.jsx, se actualiza aunque el catálogo ahora esté aquí)
const Home = ({ setCantidad, cantidadCarrito }) => {

  // ================================
  // 1. ESTADOS DE LA PÁGINA
  // ================================
  const [productos, setProductos] = useState([]) // Datos desde API
  const [terminoBusqueda, setTerminoBusqueda] = useState("")
  
  // ESTADOS DE CARGA (API)
  const [cargando, setCargando] = useState(true)
  const [errorNet, setErrorNet] = useState(null)

  // BOLETÍN
  const [correoBoletin, setCorreoBoletin] = useState("")

  // FORMULARIO
  const [usuarioReg, setUsuarioReg] = useState("")
  const [claveReg, setClaveReg] = useState("")

  // ================================
  // 2. EFECTO DE MONTAJE PARA EL CONSUMO DE DATOS (USEEFFECT)
  // ================================
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true)
        
        //Coloca AQUÍ la URL con tu proyecto de Firebase (Firestore) y la colección de productos
        const urlFirebase =
          "https://firestore.googleapis.com/v1/projects/ecommerce-calucho/databases/(default)/documents/productos"

        const respuesta = await fetch(urlFirebase)

        if (!respuesta.ok) {
          throw new Error("Error al obtener productos")
        }

        const dataRaw = await respuesta.json()

        const productosFormateados = dataRaw.documents.map((doc) => ({
          id: doc.name.split("/").pop(),
          nombre: doc.fields.nombre.stringValue,
          precio: parseFloat(doc.fields.precio.doubleValue || doc.fields.precio.integerValue),
          precioAntiguo: parseFloat(doc.fields.precioAntiguo.doubleValue || doc.fields.precioAntiguo.integerValue),
          descuento: doc.fields.descuento.stringValue,
          imagen: doc.fields.imagen.stringValue
        }))
        
        //Guardamos los productos limpios en el estado
        setProductos(productosFormateados)

      } catch (err) {
      console.error("Error al conectar con Firebase:", err.message)
      setErrorNet("Error de conexión con el servidor de Google")
    } finally {
      setCargando(false)
    }
  }

    obtenerProductos()
  }, [])//Arreglo de dependencias vacío = Solo ejecuta al cargar la página por primera vez

  // ================================
  // 3. LÓGICA DE INTERACTIVIDAD
  // ================================
  const incrementarCarrito = () => {
    if (setCantidad) {
        setCantidad(prev => prev + 1)
    }
  }
  

   // MENSAJE DE REGISTRO EXITOSO DE BOLETÍN Y REGISTRO DE USUARIO (A UN FUTURO SE PUEDE CONECTAR A FIREBASE)
  const manejarBoletin = (e) => {
    e.preventDefault()
    alert(`¡Suscripción exitosa! Enviaremos ofertas a: ${correoBoletin}`)
    setCorreoBoletin('')
  }

  const manejarRegistro = (e) => {
    e.preventDefault()
    alert(`¡Cuenta creada con éxito!\nBienvenido: ${usuarioReg}`)
    setUsuarioReg('')
    setClaveReg('')
  }

  // ================================
  // 4. MAPA DE IMÁGENES
  // ================================
  const imagenes = {
    queso,
    manjar,
    yogurt,
    helado,
    mantequilla,
    crema,
    queso_andino,
    mantequilla_gourmet,
    queso_mantecoso,
    yogurt_guanabana,
    yogurt_natural,
    queso_parmesano
  }

  // ================================
  // 5. FILTRADO (PARTE DE LÓGICA DE INTERACTIVIDAD)
  // ================================
  const productosFiltrados = productos.filter(producto =>
    producto.nombre?.toLowerCase().includes(terminoBusqueda.toLowerCase())
  )

  // ================================
  // 6. RENDERIZADO DE LA VISTA HOME
  // ================================
  return (
    <>

      {/* BANNER */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white rounded-lg p-6 shadow-sm mb-8 text-left">
        <h2 className="text-2xl font-bold mb-1">
          Sabores auténticos de la selva central
        </h2>
        <p className="text-sm text-emerald-100 mb-4">
          Directo del productor artesanal a tu mesa de manera sostenible.
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-4 rounded-md">
          EXPLORAR CATÁLOGO DE PRODUCTOS
        </button>
      </section>

      {/* BUSCADOR */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar del catálogo real en la nube..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg"
          disabled={cargando}//Desabilitar si está cargando
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mb-12">

        {/* SECCIÓN DE CATÁLOGO DINÁMICO */}
        <section className="lg:col-span-3 text-left">

          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              Catálogo en tiempo Real
            </h3>

            {!cargando && (
              <span className="text-xs text-gray-500">
                {productosFiltrados.length} disponibles
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {/* CONTROL DE ESTADOS */}
            {cargando ? (
              <p className="col-span-full text-center py-6">
                Cargando productos...
              </p>

            ) : errorNet ? (
              <p className="col-span-full text-red-500 text-center py-6">
                {errorNet}
              </p>

            ) : productosFiltrados.length === 0 ? (
              <p className="col-span-full text-gray-500 text-center py-6">
                No se encontraron productos.
              </p>

            ) : (
              productosFiltrados.map((item) => (
                <Card
                  key={item.id}
                  producto={{
                    ...item,
                    imagen: imagenes[item.imagen]
                  }}
                  onAgregar={incrementarCarrito}
                />
              ))
            )}
          </div>

          {/* CONTROL DE FLUJO VISUAL (INTERFACES ASÍNCRONAS) */}
          {cargando && (
            <div className="text-center py-12 col-span-full font-inter text-text-secondary animate-pulse">
              <p className="text-base font-semibold">
                Conectando con la base de datos en la nube...
              </p>
              <p className="text-xs mt-1">
                Por favor espere un momento.
              </p>
            </div>
          )}

          {errorNet && !cargando && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg font-inter text-sm col-span-full">
              <p className="font-bold">Error de conexión:</p>
              <p className="text-xs">
                {errorNet}. Intenta recargar la página más tarde.
              </p>
            </div>
          )}
        </section>

        {/* PANEL DERECHO */}
        <div className="flex flex-col gap-6">

          {/* ESTADO - ESTADO DEL SERVIDOR*/}
          <section className="bg-white p-5 rounded-lg border border-border-default shadow-sm text-left">

            <h3 className="font-bold mb-2">Estado del Servidor</h3>

            <div className="flex items-center gap-2 mb-4 font-inter text-xs">

              <span
                className={`w-3 h-3 rounded-full ${
                  errorNet ? 'bg-red-500' : cargando ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
              ></span>

              <span className="text-text-secondary">
                {errorNet
                  ? 'Desconectado'
                  : cargando
                  ? 'Sincronizando...'
                  : 'Online (Firebase/Cloud)'}
              </span>

            </div>
            {/* BOTÓN */}
            <div className="flex justify-between border-b pb-2 mb-2">
              <span>Canasta:</span>
              <span className="font-bold text-emerald-600">
                {cantidadCarrito} uds
              </span>
            </div>
             {/* BOTÓN */}
            <button className="w-full bg-emerald-600 text-white py-2 rounded-md">
              Procesar Orden
            </button>

          </section>

          {/* FORMULARIO */}
          <section className="bg-white p-5 rounded-lg border border-border-default shadow-sm text-left">
            
            <h3 className="text-base font-bold mb-2">Crear Cuenta</h3>

            <p className="text-xs text-gray-500 mb-4">
              Únete para comprar rápido y seguro.
            </p>

            <form onSubmit={manejarRegistro} className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-text-primary block mb-1">
                      Usuario / Correo
                    </label>
              <input
                type="text"
                placeholder="ejemplo@correo.com"
                value={usuarioReg}
                onChange={(e) => setUsuarioReg(e.target.value)}
                className="w-full p-2 text-xs border rounded-md"
                required
              />
              <label className="text-xs font-semibold text-text-primary block mb-1">
                      Contraseña
                    </label>
              <input
                type="password"
                placeholder="••••••••"
                value={claveReg}
                onChange={(e) => setClaveReg(e.target.value)}
                className="w-full p-2 text-xs border rounded-md"
                required
              />

              <button className="bg-emerald-600 text-white py-2 rounded-md">
                Registrarme
              </button>

            </form>

          </section>

        </div>

      </div>

      {/* BOLETÍN */}
      <section className="bg-white p-6 rounded-lg max-w-md mx-auto border shadow-sm mt-10">
        <h3 className="text-center mb-2">Boletín D'Calucho</h3>

        <form onSubmit={manejarBoletin} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Ingresa tu correo para recibir novedades"
            value={correoBoletin}
            onChange={(e) => setCorreoBoletin(e.target.value)}
            className="p-2 border rounded-md"
            required
          />

          <button className="bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">
            Suscribirme
          </button>
        </form>
      </section>

    </>
  )
}

export default Home