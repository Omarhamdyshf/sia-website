import { createContext, useContext } from 'react'

export const AdminContext = createContext(false)
export const useIsAdmin = () => useContext(AdminContext)
