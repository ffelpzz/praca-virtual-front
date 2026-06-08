import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import logo from "/src/assets/logos/logoquk.png"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Header */}
      <header className="bg-[#181818] text-white px-4 py-4 relative flex items-center">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl active:scale-95 transition z-10"
        >
          ☰
        </button>

        <img
          src={logo}
          alt="Logo"
          className="h-16 absolute left-1/2 -translate-x-1/2"
        />
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Menu lateral */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#1E1E1E] z-50 shadow-xl p-5 transition-all duration-300 ${menuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
          }`}
      >
        {/* Topo */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-lg text-white">Menu</h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Opções */}
        <div className="flex flex-col gap-4">

          {/* Perfil */}
          <button
            onClick={() => { navigate("/perfil"); setMenuOpen(false) }}
            className={`text-left p-3 rounded-xl transition-all duration-150 ${isActive("/perfil")
                ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                : "bg-[#2A2A2A] text-white hover:bg-[#333]"
              }`}
          >
            👤 Perfil
          </button>

          {/* Meus Pedidos */}
          <button
            onClick={() => navigate("/meus-pedidos")}
            className={`text-left p-3 rounded-xl transition-all duration-150 ${isActive("/meus-pedidos")
                ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                : "bg-[#2A2A2A] text-white hover:bg-[#333]"
              }`}
          >
            📦 Meus Pedidos
          </button>

          {/* Configurações */}
          <button
            className={`text-left p-3 rounded-xl transition-all duration-150 ${isActive("/configuracoes")
                ? "bg-[#3B82F6]/20 text-[#3B82F6]"
                : "bg-[#2A2A2A] text-white hover:bg-[#333]"
              }`}
          >
            ⚙️ Configurações
          </button>

          {/* Sair */}
          <button
            onClick={handleLogout}
            className="text-left p-3 rounded-xl bg-red-500/10 text-red-400 active:scale-95 transition-all duration-150 hover:bg-red-500/20"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </>
  )
}