import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { usuarios as mockUsuarios, restaurantes as mockRestaurantes } from "../../mocks/data"

// ─── Header Admin ───────────────────────────────────────────────────────────
function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <header className="bg-[#C0622B] text-white px-4 py-4 rounded-b-3xl shadow-md flex items-center justify-between">
        <button onClick={() => setMenuOpen(true)} className="text-2xl active:scale-95 transition">☰</button>
        <h1 className="font-bold text-xl">Praça Virtual 🍴</h1>
        <div className="w-8 h-8 rounded-full bg-white/30" />
      </header>

      {menuOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMenuOpen(false)} />}

      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-5 transition-all duration-300 ease-out ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-lg text-[#333]">Menu Admin</h2>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <div className="flex flex-col gap-4 text-[#333]">
          <button onClick={() => { navigate("/admin/restaurantes"); setMenuOpen(false) }} className="text-left p-3 rounded-xl bg-[#F5F5F5] active:scale-95 transition-all duration-150">
            🍽️ Restaurantes
          </button>
          <button onClick={() => { navigate("/admin/usuarios"); setMenuOpen(false) }} className="text-left p-3 rounded-xl bg-[#FFF0E8] text-[#C0622B] font-semibold active:scale-95 transition-all duration-150">
            👥 Usuários
          </button>
          <button onClick={handleLogout} className="text-left p-3 rounded-xl bg-[#FFEAEA] text-red-500 active:scale-95 transition-all duration-150">
            🚪 Sair
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Bottom Nav Admin ───────────────────────────────────────────────────────
function AdminBottomNav() {
  const navigate = useNavigate()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#C0622B] rounded-t-3xl px-8 py-4 flex justify-around items-center shadow-lg">
      <button onClick={() => navigate("/admin/restaurantes")} className="text-white text-2xl active:scale-95 transition">🍽️</button>
      <button onClick={() => navigate("/admin/usuarios")} className="text-white text-2xl active:scale-95 transition">👥</button>
    </nav>
  )
}

// ─── Badge de status ────────────────────────────────────────────────────────
function Badge({ status }) {
  const cfg = {
    ativo:    { label: "Ativo",    cls: "bg-green-100 text-green-700" },
    inativo:  { label: "Inativo",  cls: "bg-gray-200 text-gray-500" },
    pendente: { label: "Pendente", cls: "bg-yellow-100 text-yellow-700" },
  }
  const { label, cls } = cfg[status] || cfg.inativo
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
}

// ─── Modal de detalhes ──────────────────────────────────────────────────────
function ModalDetalhes({ usuario, restaurante, onClose, onAprovar, onToggleRestaurante, onExcluirRestaurante }) {
  const [confirmExcluir, setConfirmExcluir] = useState(false)

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-5 pt-2 pb-8">
          {/* Header do modal */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-lg text-[#333]">Detalhes do Usuário</h3>
            <button onClick={onClose} className="text-gray-400 text-xl active:scale-95 transition">✕</button>
          </div>

          {/* Info do usuário */}
          <div className="bg-[#F5F5F5] rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#C0622B] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-[#333]">{usuario.nome}</p>
                <p className="text-xs text-gray-500">{usuario.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">ID do usuário</p>
                <p className="font-semibold text-[#333]">#{usuario.id}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-0.5">Perfil</p>
                <p className="font-semibold text-[#333] capitalize">{usuario.role}</p>
              </div>
              <div className="bg-white rounded-xl p-3 col-span-2">
                <p className="text-xs text-gray-400 mb-0.5">Status da conta</p>
                <Badge status={usuario.ativo ? "ativo" : "inativo"} />
              </div>
            </div>
          </div>

          {/* Info do restaurante vinculado */}
          {restaurante ? (
            <div className="bg-[#F5F5F5] rounded-2xl p-4 mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Restaurante vinculado</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm p-1.5 flex-shrink-0">
                  {restaurante.logo
                    ? <img src={restaurante.logo} alt={restaurante.nome} className="max-w-full max-h-full object-contain" />
                    : <span className="text-xl">🍽️</span>}
                </div>
                <div>
                  <p className="font-semibold text-[#333]">{restaurante.nome}</p>
                  <Badge status={restaurante.status || (restaurante.aberto ? "ativo" : "inativo")} />
                </div>
              </div>

              {/* Ações do restaurante */}
              <div className="flex flex-col gap-2">
                {/* Aprovar se pendente */}
                {(restaurante.status === "pendente") && (
                  <button
                    onClick={() => onAprovar(restaurante.id)}
                    className="w-full bg-green-500 text-white font-semibold py-3 rounded-2xl active:scale-95 transition flex items-center justify-center gap-2"
                  >
                    ✅ Aprovar restaurante
                  </button>
                )}

                {/* Ativar / Desativar */}
                <button
                  onClick={() => onToggleRestaurante(restaurante.id)}
                  className={`w-full font-semibold py-3 rounded-2xl active:scale-95 transition flex items-center justify-center gap-2 ${
                    restaurante.status === "inativo" || !restaurante.aberto
                      ? "bg-[#C0622B] text-white"
                      : "bg-[#FFF0E8] text-[#C0622B]"
                  }`}
                >
                  {restaurante.status === "inativo" || (!restaurante.aberto && restaurante.status !== "pendente")
                    ? "🟢 Ativar restaurante"
                    : "🔴 Desativar restaurante"}
                </button>

                {/* Excluir */}
                {!confirmExcluir ? (
                  <button
                    onClick={() => setConfirmExcluir(true)}
                    className="w-full bg-[#FFEAEA] text-red-500 font-semibold py-3 rounded-2xl active:scale-95 transition"
                  >
                    🗑️ Excluir restaurante
                  </button>
                ) : (
                  <div className="bg-[#FFEAEA] rounded-2xl p-4">
                    <p className="text-sm text-red-600 font-semibold text-center mb-3">
                      Tem certeza? Essa ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmExcluir(false)}
                        className="flex-1 bg-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl active:scale-95 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => { onExcluirRestaurante(restaurante.id); onClose() }}
                        className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-xl active:scale-95 transition"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#F5F5F5] rounded-2xl p-4 mb-4 text-center text-gray-400 text-sm">
              Nenhum restaurante vinculado a este usuário
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-[#F5F5F5] text-[#333] font-semibold py-3 rounded-2xl active:scale-95 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Card de usuário ─────────────────────────────────────────────────────────
function UsuarioCard({ usuario, restaurante, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#E8E8E8] rounded-2xl p-4 flex items-center gap-4 shadow-sm active:scale-95 transition-all duration-150 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-[#C0622B] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
        {usuario.nome.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-[#333] truncate">{usuario.nome}</p>
          <span className="text-xs text-gray-400">#{usuario.id}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{usuario.email}</p>
        {restaurante && (
          <p className="text-xs text-[#C0622B] font-medium mt-0.5 truncate">🍽️ {restaurante.nome}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <Badge status={usuario.ativo ? "ativo" : "inativo"} />
        {restaurante && (
          <Badge status={restaurante.status || (restaurante.aberto ? "ativo" : "inativo")} />
        )}
      </div>
    </div>
  )
}

// ─── Página principal ────────────────────────────────────────────────────────
export default function AdminUsuarios() {
  const [busca, setBusca] = useState("")
  const [usuarios, setUsuarios] = useState(
    mockUsuarios.filter((u) => u.role === "restaurante")
  )
  const [restaurantes, setRestaurantes] = useState(
    mockRestaurantes.map((r) => ({ ...r, status: r.aberto ? "ativo" : "inativo" }))
  )
  const [selecionado, setSelecionado] = useState(null)

  const getRestaurante = (usuario) =>
    restaurantes.find((r) => r.id === usuario.restauranteId) || null

  const usuariosFiltrados = busca.trim()
    ? usuarios.filter((u) => {
        const rest = getRestaurante(u)
        return (
          u.nome.toLowerCase().includes(busca.toLowerCase()) ||
          String(u.id).includes(busca) ||
          u.email.toLowerCase().includes(busca.toLowerCase()) ||
          (rest && rest.nome.toLowerCase().includes(busca.toLowerCase()))
        )
      })
    : []

  const handleAprovar = (restauranteId) => {
    setRestaurantes((prev) =>
      prev.map((r) => r.id === restauranteId ? { ...r, status: "ativo", aberto: true } : r)
    )
  }

  const handleToggleRestaurante = (restauranteId) => {
    setRestaurantes((prev) =>
      prev.map((r) =>
        r.id === restauranteId
          ? { ...r, status: r.status === "ativo" ? "inativo" : "ativo", aberto: r.status !== "ativo" }
          : r
      )
    )
  }

  const handleExcluirRestaurante = (restauranteId) => {
    setRestaurantes((prev) => prev.filter((r) => r.id !== restauranteId))
    setUsuarios((prev) =>
      prev.map((u) =>
        u.restauranteId === restauranteId ? { ...u, restauranteId: null } : u
      )
    )
  }

  const usuarioSelecionado = selecionado ? usuarios.find((u) => u.id === selecionado) : null
  const restauranteSelecionado = usuarioSelecionado ? getRestaurante(usuarioSelecionado) : null

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-28">
      <AdminHeader />

      <main className="px-4 pt-4">
        <h2 className="text-xl font-bold text-[#333] mb-1">Usuários</h2>
        <p className="text-sm text-gray-500 mb-4">Busque por nome, ID, e-mail ou restaurante</p>

        {/* Barra de busca */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar usuário..."
            className="w-full bg-white rounded-2xl pl-11 pr-10 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#C0622B] transition"
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {/* Resultados */}
        {busca.trim() === "" ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-sm">Digite para buscar um usuário por nome, ID ou e-mail</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <span className="text-5xl mb-3">😕</span>
            <p className="text-sm">Nenhum usuário encontrado para "<strong>{busca}</strong>"</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {usuariosFiltrados.map((u) => (
              <UsuarioCard
                key={u.id}
                usuario={u}
                restaurante={getRestaurante(u)}
                onClick={() => setSelecionado(u.id)}
              />
            ))}
          </div>
        )}
      </main>

      <AdminBottomNav />

      {/* Modal de detalhes */}
      {selecionado && usuarioSelecionado && (
        <ModalDetalhes
          usuario={usuarioSelecionado}
          restaurante={restauranteSelecionado}
          onClose={() => setSelecionado(null)}
          onAprovar={(id) => { handleAprovar(id); setSelecionado(null) }}
          onToggleRestaurante={(id) => { handleToggleRestaurante(id) }}
          onExcluirRestaurante={(id) => { handleExcluirRestaurante(id) }}
        />
      )}
    </div>
  )
}
