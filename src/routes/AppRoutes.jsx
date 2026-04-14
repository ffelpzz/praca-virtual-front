import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

// Páginas cliente
import Login from "../pages/cliente/Login"
import Home from "../pages/cliente/Home"
import Carrinho from "../pages/cliente/Carrinho"
import MeusPedidos from "../pages/cliente/MeusPedidos"
import Restaurante from "../pages/cliente/Restaurante"

// Páginas admin
import AdminRestaurantes from "../pages/admin/AdminRestaurantes"
import AdminUsuarios from "../pages/admin/AdminUsuarios"

function RotaProtegida({ children, roles }) {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/login" />
  if (roles && !roles.includes(usuario.role)) return <Navigate to="/" />
  return children
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pública */}
        <Route path="/login" element={<Login />} />

        {/* Cliente */}
        <Route path="/" element={
          <RotaProtegida roles={["cliente"]}>
            <Home />
          </RotaProtegida>
        } />
        <Route path="/restaurante/:id" element={
          <RotaProtegida roles={["cliente"]}>
            <Restaurante />
          </RotaProtegida>
        } />
        <Route path="/carrinho" element={
          <RotaProtegida roles={["cliente"]}>
            <Carrinho />
          </RotaProtegida>
        } />
        <Route path="/meus-pedidos" element={
          <RotaProtegida roles={["cliente"]}>
            <MeusPedidos />
          </RotaProtegida>
        } />

        {/* Admin */}
        <Route path="/admin/restaurantes" element={
          <RotaProtegida roles={["admin"]}>
            <AdminRestaurantes />
          </RotaProtegida>
        } />
        <Route path="/admin/usuarios" element={
          <RotaProtegida roles={["admin"]}>
            <AdminUsuarios />
          </RotaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}