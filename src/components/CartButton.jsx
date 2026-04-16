import { useCart } from "../context/CartContext"

export default function CartButton() {
  const { quantidadeTotal, abrirCarrinho } = useCart()

  return (
    <button
      onClick={abrirCarrinho}
      className="relative flex items-center justify-center w-12 h-12 rounded-full"
      style={{ backgroundColor: "#E8D5CC" }}
    >
      <span className="text-xl">🛒</span>
      {quantidadeTotal > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          style={{ color: "#C0622B" }}>
          {quantidadeTotal}
        </span>
      )}
    </button>
  )
}