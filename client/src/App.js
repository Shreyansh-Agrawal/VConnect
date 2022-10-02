import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, RegisterClub, Landing, Error, ProtectedRoute } from './pages'
import {
  AllProjects,
  Profile,
  SharedLayout,
  Stats,
  AddProject,
} from './pages/dashboard'
import {
  AllProjectsClub,
  ProfileClub,
  SharedLayoutClub,
  StatsClub,
  AddProjectClub,
} from "./pages/dashboardClub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
         >
          <Route index element={<Stats />} />
          <Route path='all-projects' element={<AllProjects />} />
          <Route path='add-project' element={<AddProject />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        <Route
          path='/club'
          element={
            <ProtectedRoute>
              <SharedLayoutClub />
            </ProtectedRoute>
          }
         >
          <Route index element={<StatsClub />} />
          <Route path='all-projects' element={<AllProjectsClub />} />
          <Route path='add-project' element={<AddProjectClub />} />
          <Route path='profile' element={<ProfileClub />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/registerClub' element={<RegisterClub />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
