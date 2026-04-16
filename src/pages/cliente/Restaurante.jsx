import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import BottomNav from "../../components/BottomNav"
import { restaurantes, itens } from "../../mocks/data"

export default function Restaurante() {
  const { id } = useParams()

  const restaurante = restaurantes.find(
    (r) => r.id === Number(id)
  )

  const cardapio = itens.filter(
    (item) => item.restauranteId === Number(id)
  )

  if (!restaurante) {
    return <div>Restaurante não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      <Header />

      <main className="px-4 pt-4">
        <h2 className="text-2xl font-bold text-[#333] mb-1">
          {restaurante.nome}
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          {restaurante.aberto ? "Aberto" : "Fechado"}
        </p>

        <div className="space-y-4">
          {cardapio.map((item) => (
            <div
              key={item.id}
              className="bg-[#E8E8E8] rounded-2xl p-4"
            >
              <h3 className="font-semibold text-[#333]">
                {item.nome}
              </h3>

              <p className="text-sm text-gray-500">
                {item.descricao}
              </p>

              <p className="font-bold text-[#C0622B] mt-2">
                R$ {item.preco.toFixed(2).replace(".", ",")}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}