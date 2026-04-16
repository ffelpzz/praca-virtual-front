import { useCart } from "../context/CartContext"

export default function CartDrawer() {
  const { itens, removerItem, total, limparCarrinho, drawerAberto, fecharCarrinho } = useCart()

  return (
    <>
      {/* Fundo escuro */}
      {drawerAberto && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={fecharCarrinho}
        />
      )}

      {/* Painel */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: "85%",
          maxWidth: "400px",
          backgroundColor: "#F5F5F5",
          transform: drawerAberto ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Header do drawer */}
        <div className="flex items-center justify-between px-5 py-4 rounded-b-3xl"
          style={{ backgroundColor: "#C0622B" }}>
          <h2 className="text-white font-bold text-xl">Seu Carrinho</h2>
          <button onClick={fecharCarrinho} className="text-white text-2xl">✕</button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {itens.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="flex items-center justify-center rounded-full w-24 h-24"
                style={{ backgroundColor: "#E8E8E8" }}>
                <span className="text-5xl">🛒</span>
              </div>
              <p className="font-bold text-gray-700 text-lg">Seu Carrinho está vázio</p>
              <p className="text-gray-500 text-sm">Adicione itens deliciosos do nosso cardápio para começar seu pedido</p>
              <button
                onClick={fecharCarrinho}
                className="px-8 py-3 rounded-full text-white font-bold"
                style={{ backgroundColor: "#C0622B" }}>
                Explore Restaurantes
              </button>
            </div>
          ) : (
            itens.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ backgroundColor: "#E8E8E8" }}>
                <div className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: "#C8896A" }} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.nome}</p>
                  <p className="text-sm text-gray-500">Qtd: {item.quantidade}</p>
                  <p className="font-bold" style={{ color: "#C0622B" }}>
                    R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                  </p>
                </div>
                <button onClick={() => removerItem(item.id)} className="text-gray-400 text-xl">✕</button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com total */}
        {itens.length > 0 && (
          <div className="px-4 py-4 flex flex-col gap-3"
            style={{ backgroundColor: "#E8E8E8", borderTopLeftRadius: "1.5rem", borderTopRightRadius: "1.5rem" }}>
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-700">Total do pedido</p>
              <p className="font-bold text-xl" style={{ color: "#C0622B" }}>
                R$ {total.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button
              className="w-full py-4 rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: "#C0622B" }}>
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </>
  )
}