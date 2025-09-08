import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./shared/widgets/header"
import MainPage from "./pages/main"
import Footer from "./shared/widgets/footer"
// import { NotFoundPage } from "./pages/notfound-page-404"

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
