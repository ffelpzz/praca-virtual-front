import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <header className="bg-[#C0622B] text-white px-4 py-4 rounded-b-3xl shadow-md flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl active:scale-95 transition"
        >
          ☰
        </button>

        <h1 className="font-bold text-xl">Praça Virtual 🍴</h1>

        <div className="w-8 h-8 rounded-full bg-white/30"></div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-5 transition-all duration-300 ease-out ${
          menuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-lg text-[#333]">Menu</h2>

          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div className="flex flex-col gap-4 text-[#333]">
          <button className="text-left p-3 rounded-xl bg-[#F5F5F5]">
            👤 Perfil
          </button>

          <button className="text-left p-3 rounded-xl bg-[#F5F5F5]">
            📦 Meus Pedidos
          </button>

          <button className="text-left p-3 rounded-xl bg-[#F5F5F5]">
            ⚙️ Configurações
          </button>

          <button
            onClick={handleLogout}
            className="text-left p-3 rounded-xl bg-[#FFEAEA] text-red-500 active:scale-95 transition-all duration-150"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </>
  )
}