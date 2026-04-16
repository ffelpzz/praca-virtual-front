import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [itens, setItens] = useState([])
  const [drawerAberto, setDrawerAberto] = useState(false)

  const adicionarItem = (item) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === item.id)

      if (existe) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        )
      }

      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  const removerItem = (itemId) => {
    setItens((prev) => prev.filter((i) => i.id !== itemId))
  }

  const limparCarrinho = () => setItens([])

  const abrirCarrinho = () => setDrawerAberto(true)

  const fecharCarrinho = () => setDrawerAberto(false)

  const total = itens.reduce(
    (acc, i) => acc + i.preco * i.quantidade,
    0
  )

  const quantidadeTotal = itens.reduce(
    (acc, i) => acc + i.quantidade,
    0
  )

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
        fecharCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}