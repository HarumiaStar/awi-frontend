import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout, Agenda, Login, NotFound, Register, Logout, Home, Settings, CreerFestival } from './Pages'
import { RequireAuth } from './Utils/AuthRoute'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Routes publiques */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="CreerFestival" element={<CreerFestival />} />


          {/* Routes ayant besoin d'être connecté (pas admin) */}
          <Route path="logout" element={<RequireAuth><Logout /></RequireAuth>} />
          <Route path="agenda" element={<RequireAuth><Agenda /></RequireAuth>} />
          <Route path="settings" element={<RequireAuth><Settings /></RequireAuth>} />

          {/* Route admin */}



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
