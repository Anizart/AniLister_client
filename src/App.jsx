import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { HomePage } from "./pages/main"
// import { NotFoundPage } from "./pages/notfound-page-404"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
