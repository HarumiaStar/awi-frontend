import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, Agenda, Login, NotFound } from './Pages'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="agenda" element={<Agenda />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
