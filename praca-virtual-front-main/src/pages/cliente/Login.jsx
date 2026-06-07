// src/pages/cliente/Login.jsx — conectado à API real
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import logo from "/src/assets/logos/logoquk.png"

export default function Login() {
  const [modoCadastro, setModoCadastro] = useState(false)

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const [cpf, setCpf] = useState("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")

  const { login, cadastro } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro("Preencha email e senha")
      return
    }
    setErro("")
    setCarregando(true)
    try {
      const usuario = await login(email, senha)
      if (usuario.role === "admin") navigate("/admin/restaurantes")
      else if (usuario.role === "restaurante") navigate(`/restaurante/painel/${usuario.restauranteId}`)
      else navigate("/")
    } catch (err) {
      const msg = err.response?.data?.erro || "Email ou senha inválidos"
      setErro(msg)
    } finally {
      setCarregando(false)
    }
  }

  const handleCadastro = async () => {
    if (!cpf || !nome || !email || !telefone || !senha) {
      setErro("Preencha todos os campos")
      return
    }
    setErro("")
    setCarregando(true)
    try {
      await cadastro(nome, email, senha, cpf, telefone)
      navigate("/")
    } catch (err) {
      const msg = err.response?.data?.erro || "Erro ao criar conta. Tente outro email."
      setErro(msg)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#121212] text-white">
      <div className="w-full max-w-md rounded-3xl px-8 py-6 my-6 bg-[#1E1E1E] shadow-xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 mb-4" />
          <h1 className="font-bold text-3xl">
            {modoCadastro ? "Criar conta" : "Bem-vindo"}
          </h1>
          <p className="text-sm mt-2 text-gray-400">
            {modoCadastro ? "Crie sua conta para continuar" : "Faça login para continuar"}
          </p>
        </div>

        {/* Erro */}
        {erro && (
          <div className="mb-4 text-center text-sm py-3 rounded-2xl bg-red-500/10 text-red-400">
            {erro}
          </div>
        )}

        {modoCadastro ? (
          <>
            {[
              { icon: "🪪", placeholder: "Digite seu CPF", value: cpf, set: setCpf, type: "text" },
              { icon: "👤", placeholder: "Digite seu nome", value: nome, set: setNome, type: "text" },
              { icon: "📧", placeholder: "Digite seu email", value: email, set: setEmail, type: "email" },
              { icon: "📱", placeholder: "Digite seu telefone", value: telefone, set: setTelefone, type: "text" },
              { icon: "🔒", placeholder: "Crie uma senha", value: senha, set: setSenha, type: "password" },
            ].map(({ icon, placeholder, value, set, type }) => (
              <div key={placeholder} className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4 bg-[#2A2A2A]">
                <span>{icon}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            ))}

            <button
              onClick={handleCadastro}
              disabled={carregando}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-[#3B82F6] hover:bg-[#60A5FA] active:scale-95 transition-all duration-150 shadow-md disabled:opacity-60"
            >
              {carregando ? "Criando conta..." : "Cadastrar"}
            </button>

            <p className="text-center text-sm mt-5 text-gray-400">
              Já tem conta?{" "}
              <button onClick={() => { setErro(""); setModoCadastro(false) }} className="font-semibold text-[#3B82F6]">
                Entrar
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-4 bg-[#2A2A2A]">
              <span>👤</span>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 bg-[#2A2A2A]">
              <span>🔒</span>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={carregando}
              className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-[#3B82F6] hover:bg-[#60A5FA] active:scale-95 transition-all duration-150 shadow-md disabled:opacity-60"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-sm mt-5 text-gray-400">
              Não tem conta?{" "}
              <button onClick={() => { setErro(""); setModoCadastro(true) }} className="font-semibold text-[#3B82F6]">
                Cadastre-se
              </button>
            </p>
          </>
        )}

        <p className="text-center text-sm mt-6 text-gray-500">
          Bem-vindo ao seu app 🚀
        </p>
      </div>
    </div>
  )
}
