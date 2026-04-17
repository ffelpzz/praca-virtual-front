import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [modoCadastro, setModoCadastro] = useState(false)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")

  const [cpf, setCpf] = useState("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")

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

  const handleCadastro = () => {
    if (!cpf || !nome || !email || !telefone || !senha) {
      setErro("Preencha todos os campos")
      return
    }

    setErro("")
    alert("Cadastro realizado com sucesso (mock)")
    setModoCadastro(false)

    setCpf("")
    setNome("")
    setEmail("")
    setTelefone("")
    setSenha("")
  }

  const estiloInput = {
    backgroundColor: "#F8F8F8",
    border: "1px solid #E5E5E5",
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(135deg, #F5F5F5 0%, #EDE6E1 100%)",
      }}
    >
      <div
        className="w-full max-w-md rounded-[2.5rem] px-8 py-6 my-6"
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
            {modoCadastro
              ? "Crie sua conta para continuar"
              : "Faça login para continuar"}
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

        {modoCadastro ? (
          <>
            {/* CPF */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
              style={estiloInput}
            >
              <span>🪪</span>
              <input
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Nome */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
              style={estiloInput}
            >
              <span>👤</span>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Email */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
              style={estiloInput}
            >
              <span>📧</span>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Telefone */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
              style={estiloInput}
            >
              <span>📱</span>
              <input
                type="text"
                placeholder="Digite seu telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Senha */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6"
              style={estiloInput}
            >
              <span>🔒</span>
              <input
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <button
              onClick={handleCadastro}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-150 hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: "#C0622B",
                boxShadow: "0 8px 20px rgba(192, 98, 43, 0.28)",
              }}
            >
              Cadastrar
            </button>

            <p className="text-center text-sm mt-5 text-[#777]">
              Já tem conta?{" "}
              <button
                onClick={() => {
                  setErro("")
                  setModoCadastro(false)
                }}
                className="font-semibold"
                style={{ color: "#C0622B" }}
              >
                Entrar
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Email */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4"
              style={estiloInput}
            >
              <span className="text-lg">👤</span>

              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Senha */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-2"
              style={estiloInput}
            >
              <span className="text-lg">🔒</span>

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="text-right mb-6">
              <button
                className="text-sm font-medium"
                style={{ color: "#C0622B" }}
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-150 hover:brightness-110 active:scale-95 active:shadow-inner"
              style={{
                backgroundColor: "#C0622B",
                boxShadow: "0 8px 20px rgba(192, 98, 43, 0.28)",
              }}
            >
              Entrar
            </button>

            <p className="text-center text-sm mt-5 text-[#777]">
              Não tem conta?{" "}
              <button
                onClick={() => {
                  setErro("")
                  setModoCadastro(true)
                }}
                className="font-semibold"
                style={{ color: "#C0622B" }}
              >
                Cadastre-se
              </button>
            </p>
          </>
        )}

        <p className="text-center text-sm mt-6" style={{ color: "#777" }}>
          Bem-vindo ao seu app de pedidos 🍽️
        </p>
      </div>
    </div>
  )
}