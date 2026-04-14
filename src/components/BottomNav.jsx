import { useNavigate, useLocation } from "react-router-dom"

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-8 py-4 rounded-t-3xl z-50"
      style={{ backgroundColor: "#C0622B" }}>

      {/* Menu / Home */}
      <button onClick={() => navigate("/")}
        className={`flex flex-col items-center gap-1 ${location.pathname === "/" ? "opacity-100" : "opacity-60"}`}>
        <div className="flex flex-col gap-1">
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
        </div>
      </button>

      {/* Meus Pedidos */}
      <button onClick={() => navigate("/meus-pedidos")}
        className={`flex flex-col items-center gap-1 ${location.pathname === "/meus-pedidos" ? "opacity-100" : "opacity-60"}`}>
        <span className="text-2xl text-white">📋</span>
      </button>

    </nav>
  )
}