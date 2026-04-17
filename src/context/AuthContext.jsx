import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  )

  const login = async (email, senha) => {
    const { usuarios } = await import("../mocks/data")

    const encontrado = usuarios.find(
      (u) => u.email === email
    )

    if (encontrado) {
      setUsuario(encontrado)

      localStorage.setItem(
        "usuario",
        JSON.stringify(encontrado)
      )

      return encontrado
    }

    throw new Error("Usuário não encontrado")
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("usuario")
  }

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}