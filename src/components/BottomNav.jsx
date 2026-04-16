import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function BottomNav() {
  const navigate = useNavigate()
  const { abrirCarrinho } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#C0622B] rounded-t-3xl px-8 py-4 flex justify-around items-center shadow-lg">
      <button 
      onClick={() => navigate('/')}
      className="text-white text-2xl active:scale-95 transition">
        🏠
      </button>

      <button 
      onClick={abrirCarrinho}
      className="text-white text-2xl active:scale-95 transition-all duration-150">
        🛒
      </button>
    </nav>
  )
}