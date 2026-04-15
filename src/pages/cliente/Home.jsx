import Header from "../../components/Header"
import { BottomNav } from "../../components/BottomNav"

export default function Home() {
  const restaurantes = []

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      <Header />

      <main className="px-4 pt-5">
        <h2 className="text-2xl font-bold text-[#333] mb-1">
          Explore Restaurantes
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Faça seu pedido sem pegar fila
        </p>

        {restaurantes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center px-6">
            <div className="text-6xl mb-4">🍽️</div>

            <h3 className="text-xl font-semibold text-[#333] mb-2">
              Nenhum restaurante disponível
            </h3>

            <p className="text-gray-500 text-sm max-w-xs">
              Em breve novos restaurantes estarão disponíveis para pedidos.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {restaurantes.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                {item.nome}
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}