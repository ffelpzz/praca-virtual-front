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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F5F5" }}>

      {/* Topo laranja - 40% da tela */}
      <div
        className="flex flex-col items-center justify-center gap-3"
        style={{
          backgroundColor: "#C0622B",
          height: "40vh",
          borderBottomLeftRadius: "2.5rem",
          borderBottomRightRadius: "2.5rem",
        }}
      >
        <span style={{ fontSize: "4rem" }}>🍴</span>
        <h1 className="text-white font-bold" style={{ fontSize: "2rem" }}>
          Praça Virtual
        </h1>
      </div>

      {/* Card do formulário */}
      <div className="flex flex-col items-center px-6 mt-[-3rem]">
        <div
          className="w-full max-w-sm rounded-3xl p-8 flex flex-col gap-4"
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
          }}
        >
          {/* Ícone de usuário */}
          <div className="flex justify-center mb-2">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#E8E8E8",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>👤</span>
            </div>
          </div>

          {/* Erro */}
          {erro && (
            <p className="text-red-500 text-sm text-center">{erro}</p>
          )}

          {/* Campo email */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ backgroundColor: "#F5F5F5", border: "1.5px solid #E0E0E0" }}
          >
            <span className="text-gray-400 text-lg">👤</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              style={{ fontSize: "1rem" }}
            />
          </div>

          {/* Campo senha */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ backgroundColor: "#F5F5F5", border: "1.5px solid #E0E0E0" }}
          >
            <span className="text-gray-400 text-lg">🔒</span>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              style={{ fontSize: "1rem" }}
            />
          </div>

          {/* Botão entrar */}
          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-full text-white font-bold text-lg mt-2"
            style={{ backgroundColor: "#C0622B" }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}