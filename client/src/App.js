import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, RegisterClub, Landing, Error, ProtectedRoute } from './pages'
import {
  AllProjects,
  Profile,
  SharedLayout,
  Stats,
  AddProject,
  Notes,
  File
} from './pages/dashboard'
import {
  AllEvents,
  ProfileClub,
  SharedLayoutClub,
  StatsClub,
  AddEvent,
} from "./pages/dashboardClub";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes" element={<Notes />} />
          <Route path="file" element={<File />} />
        </Route>

        <Route
          path="/club"
          element={
            <ProtectedRoute>
              <SharedLayoutClub />
            </ProtectedRoute>
          }
        >
          <Route index element={<Notes />} />
          {/* <Route path="all-projects" element={<AllEvents />} />
          <Route path="add-project" element={<AddEvent />} /> */}
          <Route path="profile" element={<ProfileClub />} />
          <Route path="notes" element={<Notes />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/registerClub" element={<RegisterClub />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
