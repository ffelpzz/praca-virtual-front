import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Troca pelo fetch real quando o back estiver pronto
  const login = async (email, senha) => {
    const { usuarios } = await import("../mocks/data")
    const encontrado = usuarios.find((u) => u.email === email)
    if (encontrado) {
      setUsuario(encontrado)
      return encontrado
    }
    throw new Error("Usuário não encontrado")
  }

  const logout = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}