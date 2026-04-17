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

        <div className="grid grid-cols-2 gap-4">
        {restaurantes.map((restaurante) => (
          <div
            key={restaurante.id}
            onClick={() => navigate(`/restaurante/${restaurante.id}`)}
            className="bg-[#E8E8E8] rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer shadow-sm active:scale-95 transition-all duration-150 p-4"
          >
            {/* Logo */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm p-2">
              <img
                src={restaurante.logo}
                alt={restaurante.nome}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Nome */}
            <h3 className="mt-3 text-sm font-semibold text-center text-[#333]">
              {restaurante.nome}
            </h3>

            {/* Status */}
            <p
              className={`mt-1 text-xs font-medium ${
                restaurante.aberto
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
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