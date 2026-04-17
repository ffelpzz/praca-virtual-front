import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BottomNav from "../../components/BottomNav"
import { useEffect, useState } from "react"
import { listarRestaurantes } from "../../services/restauranteService"

export default function Home() {
  const navigate = useNavigate()
  const [restaurantes, setRestaurantes] = useState([])

  useEffect(() => {
    listarRestaurantes().then((data) => setRestaurantes(data))
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-24">
      <Header />

      <main className="px-4 pt-4">
        <h2 className="text-xl font-bold text-[#333] mb-2">
          Explore Restaurantes
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Faça seu pedido sem pegar fila
        </p>

        <div className="space-y-4">
          {restaurantes.map((restaurante) => (
            <div
              key={restaurante.id}
              onClick={() => navigate(`/restaurante/${restaurante.id}`)}
              className="bg-[#E8E8E8] rounded-2xl p-4 cursor-pointer active:scale-95 transition-all duration-150"
            >
              <h3 className="font-semibold text-[#333]">
                {restaurante.nome}
              </h3>

              <p className="text-sm text-gray-600">
                {restaurante.aberto ? "Aberto" : "Fechado"}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}