import Header from "../../components/Header"
import BottomNav from "../../components/BottomNav"
import { pedidos } from "../../mocks/data"

const statusConfig = {
  "Aguardando confirmação": { bg: "#FEF9C3", text: "#92400E", label: "Aguardando confirmação" },
  "Em preparo": { bg: "#DBEAFE", text: "#1E40AF", label: "Em preparo" },
  "Pronto para retirada": { bg: "#DCFCE7", text: "#166534", label: "Pronto para retirada" },
  "Retirado": { bg: "#F3F4F6", text: "#6B7280", label: "Retirado" },
}

export default function MeusPedidos() {
  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: "#F5F5F5" }}>
      <Header mostrarCarrinho={true} />

      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Meus pedidos
        </h1>

        <div className="flex flex-col gap-4">
          {pedidos.map((pedido) => {
            const status = statusConfig[pedido.status] || statusConfig["Retirado"]
            return (
              <div
                key={pedido.id}
                className="rounded-2xl p-4 flex flex-col gap-3"
                style={{ backgroundColor: "#E8E8E8" }}
              >
                {/* Info do pedido */}
                <div className="flex gap-3">
                  {/* Imagem placeholder */}
                  <div
                    className="rounded-xl flex-shrink-0"
                    style={{ width: "80px", height: "80px", backgroundColor: "#C8896A" }}
                  />

                  {/* Detalhes */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-gray-800">{pedido.restaurante}</p>
                      <p className="font-bold" style={{ color: "#C0622B" }}>
                        R$ {pedido.preco.toFixed(2).replace(".", ",")}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{pedido.item}</p>

                    {/* Badge de status */}
                    <span
                      className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: status.bg, color: status.text }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Botão */}
                <button
                  className="w-full py-3 rounded-full text-white font-bold
                            active:scale-95 transition-all duration-150"
                  style={{ backgroundColor: "#C0622B" }}
                >
                  Ver detalhes
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}