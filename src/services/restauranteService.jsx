import { restaurantes } from "../mocks/data"

export function listarRestaurantes() {
  return Promise.resolve(restaurantes)
}