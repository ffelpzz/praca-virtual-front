import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function ItemCard({ item, aberto }) {
  const { adicionarItem } = useCart()
  const [animando, setAnimando] = useState(false)

  const handleAdd = () => {
    if (!aberto || !item.disponivel) return
    adicionarItem(item)
    setAnimando(true)
    setTimeout(() => setAnimando(false), 150)
  }

  const indisponivel = !item.disponivel

  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl bg-[#1E1E1E] ${indisponivel ? "opacity-60" : ""}`}>
      
      {/* Imagem */}
      <div className="w-20 h-20 rounded-xl flex-shrink-0 bg-[#2A2A2A] overflow-hidden flex items-center justify-center">
        {item.imagemUrl ? (
          <img src={item.imagemUrl} alt={item.nome} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl">🍔</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-white">{item.nome}</p>

        {item.categoria && (
          <span className="text-xs text-[#3B82F6]">{item.categoria.nome}</span>
        )}

        {item.descricao && (
          <p className="text-sm text-gray-400 line-clamp-2 mt-0.5">
            {item.descricao}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1">
          <p className="font-bold text-[#3B82F6]">
            R$ {item.preco.toFixed(2).replace(".", ",")}
          </p>
          {indisponivel && (
            <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
              Indisponível
            </span>
          )}
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={handleAdd}
        disabled={!aberto || indisponivel}
        className={`w-9 h-9 rounded-full text-white text-lg flex items-center justify-center
          transition-all duration-150
          ${aberto && !indisponivel
            ? "bg-[#3B82F6] hover:bg-[#60A5FA] active:scale-90"
            : "bg-gray-600 opacity-50 cursor-not-allowed"
          }
          ${animando ? "scale-110" : ""}
        `}
      >
        +
      </button>
    </div>
  )
}
