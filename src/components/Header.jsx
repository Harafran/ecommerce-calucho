import React from "react"
import { Link } from "react-router-dom"

import searchIcon from "../assets/icon-search.svg"
import cartIcon from "../assets/icon-cart.svg"
import heartIcon from "../assets/icon-heart.svg"
import userIcon from "../assets/icon-user.svg"

const Header = ({ cantidad }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">

      {/* Al hacer clic en el logo, regresamos al Home */}
      <Link to="/">
        <span className="text-xl font-bold text-emerald-800">
          D'Calucho
        </span>
      </Link>

      {/* ICONOS */}
      <nav className="flex items-center gap-4">

        {/* BUSCAR */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <img src={searchIcon} className="w-5 h-5" />
        </button>

        {/* FAVORITOS */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <img src={heartIcon} className="w-5 h-5" />
        </button>

        {/* CARRITO */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <img src={cartIcon} className="w-5 h-5" />
          </button>

          {/* CONTADOR */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-[2px] rounded-full">
            {cantidad}
          </span>
        </div>

        {/* MI CUENTA - Enlace de Login */}
        <Link to="/login" className="flex items-center gap-1 text-sm hover:text-emerald-600">
          <img src={userIcon} className="w-5 h-5" />
          <span>Mi cuenta</span>
        </Link>

      </nav>
    </header>
  )
}

export default Header