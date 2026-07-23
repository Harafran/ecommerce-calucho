import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast" //Importamos la librería 

const Login = () => {

  const navigate = useNavigate()

  // ================================
  // ESTADOS
  // ================================
  const [correo, setCorreo] = useState("")
  const [errorValidacion, setErrorValidacion] = useState("")
  const [procesando, setProcesando] = useState(false)

  // ================================
  // REGISTRAR USUARIO
  // ================================
  const registrarUsuario = async (e) => {
    e.preventDefault() // Evita recargar la página al enviar formulario

    // 1. VALIDACIÓN PREVENTIVA (FRONTED)
    setErrorValidacion("")//Limpiamos errores previos antes de validar

    if (!correo.trim()) { // Verifica que el campo no esté vacío
      setErrorValidacion("El campo no puede estar vacío")
      return //Detiene la función aquí, no llama a FireBase (No envía datos)
    }

    //Regex para validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(correo)) { // Verifica que el correo tenga formato válido
      setErrorValidacion("Por favor, ingresa un correo electrónico válido.")
      return // Detiene ejecución si no cumple formato
    }

    // 2. INICIO DE ESTADOS DE CARGA
    setProcesando(true)  // Activa loader y desactiva botón (evita doble clic)

    const urlApi = // URL de Firebase (colección usuarios)
      "https://firestore.googleapis.com/v1/projects/ecommerce-calucho/databases/(default)/documents/usuarios"

    // Estructura requerida por Firebase REST API
    const payload = {
      fields: {
        correo: { stringValue: correo }, //campo de correo
        fechaRegistro: { stringValue: new Date().toISOString() } //Campo de fecha en formato ISO
      }
    }
    
    //3. BLOQUE DE SEGURIDAD (TRY/CATCH/FINALLY
    try {

      const respuesta = await fetch(urlApi, {
        method: "POST",// Método CREATE
        headers: {
          "Content-Type": "application/json" // Indica formato JSON
        },
        body: JSON.stringify(payload) // Convierte objeto JS a JSON
      })
      
      // Validación de respuesta del servidor
      if (!respuesta.ok) {
        throw new Error("Falló en el servidor de base de datos")
      }

      // NOTIFICACIÓN TOAST DE ÉXITO (En lugar del alert)
      toast.success("¡Bienvenido a D'Calucho!")// Muestra mensaje sin bloquear la interfaz (mejor UX)

      navigate("/") // Redirige al usuario al Home

    } catch (error) {

      // NOTIFICACIÓN TOAST DE ERROR
      toast.error(error.message) // Muestra error si falla la conexión o el servidor

    } finally {
      //Esto siempre se ejecuta, apagando el botón de carga

      setProcesando(false) // Apaga loader
      setCorreo("") // Limpia input
    }
  }

  // ================================
  // UI
  // ================================
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg border shadow-sm mt-10 text-center">

      <h2 className="text-xl font-bold text-emerald-700 mb-4">
        Únete a nuestra comunidad
      </h2>

      <form onSubmit={registrarUsuario} className="flex flex-col gap-4">

        <div>

          <input
            type="text" // Le quitamos el type="email" y el required para probar nuestra propia validación en React
            placeholder="Ingresa tu correo"
            value={correo} // Input controlado (estado sincronizado)
            onChange={(e) => {
              setCorreo(e.target.value)
              setErrorValidacion("") // limpia error al escribir
            }}
            className={`w-full p-2 border rounded-md outline-none text-sm transition-colors ${
              errorValidacion
                ? "border-red-500"
                : "border-gray-300 focus:border-emerald-500"
            }`}
            disabled={procesando} // Desactiva input durante carga
          />

          {/*  MENSAJE DE ERROR DINÁMICO */}
          {errorValidacion && (
            <p className="text-red-500 text-xs mt-1">
              {errorValidacion}
            </p>
          )}

        </div>

        <button
          type="submit"
          disabled={procesando} //Evita el doble clic y desactiva el botón
          className={`w-full text-white text-sm font-semibold py-2 rounded-md transition-colors flex justify-center items-center gap-2 ${
            procesando
              ? "bg-gray-400 cursor-not-allowed" // Estado deshabilitado
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >

          {procesando ? (
            <>
              {/* SPINNER SVG ANIMADO*/}
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Conectando...
            </>
          ) : (
            "Crear Cuenta"
          )}

        </button>

      </form>

    </div>
  )
}

export default Login