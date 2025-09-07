import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainPage from "./pages/main/main"
// import { NotFoundPage } from "./pages/notfound-page-404"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
