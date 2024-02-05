import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import * as Pages from './Pages'
import { RequireAuth } from './Utils/AuthRoute'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.Layout />}>

          {/* Routes publiques */}
          <Route index element={<Pages.Home />} />
          <Route path="login" element={<Pages.Login />} />
          <Route path="Register" element={<Pages.Register />} />
          <Route path="ListeFestivals" element={<Pages.ListeFestivals />} />
          <Route path="listeJeuxFestivals" element={<Pages.ListJeuFestival/>} />
          <Route path="detail-festival/:id" element={<Pages.DetailFestival />} />

          {/* Routes ayant besoin d'être connecté (pas admin) */}
          <Route path="logout" element={<RequireAuth><Pages.Logout /></RequireAuth>} />
          <Route path="agenda" element={<RequireAuth><Pages.Agenda /></RequireAuth>} />
          <Route path="settings" element={<RequireAuth><Pages.Settings /></RequireAuth>} />
          <Route path="CreerFestival" element={<RequireAuth><Pages.CreerFestival /></RequireAuth>} />
          <Route path="inscription/creneau" element={<RequireAuth><Pages.InscriptionCreneau /></RequireAuth>} /> 
          <Route path="inscription/:id" element={<RequireAuth><Pages.Inscription /></RequireAuth>} />

          {/* Route admin */}



          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<Pages.NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
