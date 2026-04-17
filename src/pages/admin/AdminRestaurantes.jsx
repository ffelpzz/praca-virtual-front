import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { restaurantes as mockRestaurantes } from "../../mocks/data"

// ─── Header Admin (variação do Header do cliente) ──────────────────────────
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
        <button
          onClick={() => setMenuOpen(true)}
          className="text-2xl active:scale-95 transition"
        >
          ☰
        </button>
        <h1 className="font-bold text-xl">Praça Virtual 🍴</h1>
        <div className="w-8 h-8 rounded-full bg-white/30" />
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl p-5 transition-all duration-300 ease-out ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-lg text-[#333]">Menu Admin</h2>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <div className="flex flex-col gap-4 text-[#333]">
          <button
            onClick={() => { navigate("/admin/restaurantes"); setMenuOpen(false) }}
            className="text-left p-3 rounded-xl bg-[#FFF0E8] text-[#C0622B] font-semibold active:scale-95 transition-all duration-150"
          >
            🍽️ Restaurantes
          </button>
          <button
            onClick={() => { navigate("/admin/usuarios"); setMenuOpen(false) }}
            className="text-left p-3 rounded-xl bg-[#F5F5F5] active:scale-95 transition-all duration-150"
          >
            👥 Usuários
          </button>
          <button
            onClick={handleLogout}
            className="text-left p-3 rounded-xl bg-[#FFEAEA] text-red-500 active:scale-95 transition-all duration-150"
          >
            🚪 Sair
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Bottom Nav Admin ───────────────────────────────────────────────────────
function AdminBottomNav({ onAddClick }) {
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#C0622B] rounded-t-3xl px-8 py-4 flex justify-around items-center shadow-lg">
      <button
        onClick={() => navigate("/admin/restaurantes")}
        className="text-white text-2xl active:scale-95 transition"
      >
        🍽️
      </button>
      <button
        onClick={onAddClick}
        className="bg-white text-[#C0622B] font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition"
      >
        +
      </button>
      <button
        onClick={() => navigate("/admin/usuarios")}
        className="text-white text-2xl active:scale-95 transition"
      >
        👥
      </button>
    </nav>
  )
}

// ─── Card de restaurante ────────────────────────────────────────────────────
function RestauranteCard({ restaurante }) {
  const statusConfig = {
    ativo: { label: "Ativo", color: "text-green-600", bg: "bg-green-50" },
    pendente: { label: "Aguardando aprovação", color: "text-yellow-600", bg: "bg-yellow-50" },
    inativo: { label: "Inativo", color: "text-red-500", bg: "bg-red-50" },
  }

  const status = restaurante.status || (restaurante.aberto ? "ativo" : "inativo")
  const cfg = statusConfig[status] || statusConfig.ativo

  return (
    <div className="bg-[#E8E8E8] rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm p-2 flex-shrink-0">
        {restaurante.logo ? (
          <img
            src={restaurante.logo}
            alt={restaurante.nome}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <span className="text-2xl">🍽️</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#333] truncate">{restaurante.nome}</p>
        {restaurante.categoria && (
          <p className="text-xs text-gray-500">{restaurante.categoria}</p>
        )}
        <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color} ${cfg.bg}`}>
          {cfg.label}
        </span>
      </div>
    </div>
  )
}

// ─── Formulário de cadastro ────────────────────────────────────────────────
function FormCadastro({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    cnpj: "",
    responsavel: "",
    telefone: "",
    email: "",
  })
  const [enviado, setEnviado] = useState(false)

  const categorias = ["Lanches", "Pizzas", "Japonês", "Brasileira", "Árabe", "Sobremesas", "Bebidas", "Outro"]

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    const obrigatorios = ["nome", "categoria", "cnpj", "responsavel", "telefone", "email"]
    const vazio = obrigatorios.find((k) => !form[k].trim())
    if (vazio) {
      alert("Preencha todos os campos obrigatórios.")
      return
    }
    onSubmit({ ...form, status: "pendente", id: Date.now() })
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="text-5xl mb-4">⏳</div>
        <h3 className="font-bold text-xl text-[#333] mb-2">Solicitação enviada!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Seu restaurante foi cadastrado e está <strong>aguardando aprovação</strong> do administrador da Praça Virtual.
          Você será notificado assim que for aprovado.
        </p>
        <button
          onClick={onClose}
          className="bg-[#C0622B] text-white font-semibold px-6 py-3 rounded-2xl active:scale-95 transition"
        >
          Entendido
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">Nome do restaurante *</label>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex: Hamburgueria do João"
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B]"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">Categoria *</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B] appearance-none"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Conte um pouco sobre o seu restaurante..."
          rows={3}
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B] resize-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">CNPJ *</label>
        <input
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B]"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">Nome do responsável *</label>
        <input
          name="responsavel"
          value={form.responsavel}
          onChange={handleChange}
          placeholder="Nome completo"
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B]"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">Telefone *</label>
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="(00) 00000-0000"
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B]"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-[#333] mb-1 block">E-mail *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="contato@restaurante.com"
          className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#C0622B]"
        />
      </div>

      <p className="text-xs text-gray-400 -mt-1">* Campos obrigatórios</p>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#C0622B] text-white font-bold py-4 rounded-2xl active:scale-95 transition mt-2"
      >
        Enviar solicitação
      </button>
    </div>
  )
}

// ─── Página principal ───────────────────────────────────────────────────────
export default function AdminRestaurantes() {
  const [busca, setBusca] = useState("")
  const [restaurantes, setRestaurantes] = useState(
    mockRestaurantes.map((r) => ({ ...r, status: r.aberto ? "ativo" : "inativo" }))
  )
  const [showForm, setShowForm] = useState(false)

  const restaurantesFiltrados = busca.trim()
    ? restaurantes.filter((r) =>
        r.nome.toLowerCase().includes(busca.toLowerCase())
      )
    : []

  const handleAdicionarRestaurante = (novoRestaurante) => {
    setRestaurantes((prev) => [novoRestaurante, ...prev])
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-28">
      <AdminHeader />

      <main className="px-4 pt-4">
        <h2 className="text-xl font-bold text-[#333] mb-1">Restaurantes</h2>
        <p className="text-sm text-gray-500 mb-4">Pesquise para encontrar um restaurante</p>

        {/* Barra de busca */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar restaurante..."
            className="w-full bg-white rounded-2xl pl-11 pr-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#C0622B] transition"
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
            <p className="text-sm">Digite o nome de um restaurante para buscar</p>
          </div>
        ) : restaurantesFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
            <span className="text-5xl mb-3">😕</span>
            <p className="text-sm">Nenhum restaurante encontrado para "<strong>{busca}</strong>"</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {restaurantesFiltrados.map((r) => (
              <RestauranteCard key={r.id} restaurante={r} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom nav com botão + */}
      <AdminBottomNav onAddClick={() => setShowForm(true)} />

      {/* Drawer de cadastro */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex items-center justify-between">
              <h3 className="font-bold text-lg text-[#333]">Cadastrar Restaurante</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 text-xl active:scale-95 transition"
              >
                ✕
              </button>
            </div>
            <div className="px-4 pb-6">
              <FormCadastro
                onClose={() => setShowForm(false)}
                onSubmit={(dados) => {
                  handleAdicionarRestaurante(dados)
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
