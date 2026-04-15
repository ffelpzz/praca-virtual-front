import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const usuario = await login(email, senha)

      if (usuario.role === "admin") navigate("/admin/restaurantes")
      else if (usuario.role === "restaurante") navigate("/admin/restaurantes")
      else navigate("/")
    } catch {
      setErro("Email ou senha inválidos")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #F5F5F5 0%, #EDE6E1 100%)",
      }}
    >
      <div
        className="w-full max-w-md rounded-[2.5rem] p-8"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: "linear-gradient(135deg, #C0622B, #A94F20)",
            }}
          >
            <span className="text-4xl">🍴</span>
          </div>

          <h1
            className="mt-4 font-bold text-3xl"
            style={{ color: "#2D2D2D" }}
          >
            Praça Virtual
          </h1>

          <p className="text-sm mt-2" style={{ color: "#777" }}>
            Faça login para continuar
          </p>
        </div>

        {/* Erro */}
        {erro && (
          <div
            className="mb-4 text-center text-sm py-3 rounded-2xl"
            style={{
              backgroundColor: "#FFEAEA",
              color: "#D63C3C",
            }}
          >
            {erro}
          </div>
        )}

        {/* Campo Email */}
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
          style={{
            backgroundColor: "#F8F8F8",
            border: "1px solid #E5E5E5",
          }}
        >
          <span className="text-lg">👤</span>

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none"
            style={{ color: "#333" }}
          />
        </div>

        {/* Campo Senha */}
        <div
          className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-2"
          style={{
            backgroundColor: "#F8F8F8",
            border: "1px solid #E5E5E5",
          }}
        >
          <span className="text-lg">🔒</span>

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-transparent outline-none"
            style={{ color: "#333" }}
          />
        </div>

        {/* Esqueci senha */}
        <div className="text-right mb-6">
          <button
            className="text-sm font-medium"
            style={{ color: "#C0622B" }}
          >
            Esqueceu a senha?
          </button>
        </div>

        {/* Botão */}
       <button
          onClick={handleLogin}
          className="
            w-full py-4 rounded-2xl text-white font-bold text-lg
            transition-all duration-150 ease-out
            hover:brightness-110
            active:scale-95
            active:shadow-inner
          "
          style={{
            backgroundColor: "#C0622B",
            boxShadow: "0 8px 20px rgba(192, 98, 43, 0.28)",
          }}
        >
        Entrar
      </button>

        {/* Rodapé */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "#777" }}
        >
          Bem-vindo ao seu app de pedidos 🍽️
        </p>
      </div>
    </div>
  )
}