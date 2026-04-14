import { useCart } from "../context/CartContext"

export default function ItemCard({ item }) {
  const { adicionarItem } = useCart()

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl"
      style={{ backgroundColor: "#E8E8E8" }}>

      {/* Imagem placeholder */}
      <div className="w-20 h-20 rounded-xl flex-shrink-0"
        style={{ backgroundColor: "#C8896A" }} />

      {/* Info */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{item.nome}</p>
        {item.descricao && (
          <p className="text-sm text-gray-500">{item.descricao}</p>
        )}
        <p className="font-bold mt-1" style={{ color: "#C0622B" }}>
          R$ {item.preco.toFixed(2).replace(".", ",")}
        </p>
      </div>

      {/* Botão adicionar */}
      <button
        onClick={() => adicionarItem(item)}
        className="w-8 h-8 rounded-full text-white font-bold text-lg flex items-center justify-center"
        style={{ backgroundColor: "#C0622B" }}>
        +
      </button>
    </div>
  )
}