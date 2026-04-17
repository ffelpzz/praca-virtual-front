import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])
  const [drawerAberto, setDrawerAberto] = useState(false)

  const adicionarItem = (item) => {}
  const removerItem = (id) => {}
  const limparCarrinho = () => {}

  const abrirCarrinho = () => setDrawerAberto(true)
  const fecharCarrinho = () => setDrawerAberto(false)

  const total = 0
  const quantidadeTotal = 0

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        limparCarrinho,
        total,
        quantidadeTotal,
        drawerAberto,
        abrirCarrinho,
        fecharCarrinho
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}