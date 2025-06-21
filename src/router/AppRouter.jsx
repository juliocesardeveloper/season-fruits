import { Routes, Route } from 'react-router'

import { FruitsPage } from '../fruits/pages/FruitsPage'
import { LoginPage } from '../auth/pages/LoginPage'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/fruits" element={<FruitsPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}
