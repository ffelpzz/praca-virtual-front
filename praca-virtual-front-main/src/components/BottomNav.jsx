import { useNavigate, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { abrirCarrinho } = useCart()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#2A2A2A] px-8 py-4 flex justify-around items-center z-50">
      
      {/* Home */}
      <button 
        onClick={() => navigate('/')}
        className={`text-2xl transition-all duration-150 ${
          isActive("/") ? "text-[#3B82F6]" : "text-white"
        }`}
      >
        🏠
      </button>

      {/* Carrinho */}
      <button 
        onClick={abrirCarrinho}
        className="text-white text-2xl active:scale-95 transition-all duration-150"
      >
        🛒
      </button>

    </nav>
  )
}