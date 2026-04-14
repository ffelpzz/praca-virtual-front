import { useNavigate } from "react-router-dom"
import CartButton from "./CartButton"

export default function Header({ mostrarCarrinho = true }) {
  const navigate = useNavigate()

  return (
    <header className="w-full px-4 pt-6 pb-8 rounded-b-3xl"
      style={{ backgroundColor: "#C0622B" }}>
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <h1 className="text-white text-2xl font-bold">Praça Virtual</h1>
          <span className="text-white text-xl">🍴</span>
        </button>
        {mostrarCarrinho && <CartButton />}
      </div>
    </header>
  )
}