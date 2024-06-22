import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//layout
import HomeLayout from './Layout/HomeLayout'
// Pages
import Home from './Pages/Home'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import RootLayout from './Layout/RootLayout'
import Venues from './Pages/Venues'
import VenueDetails from './Pages/VenueDetails'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path="/" element={<HomeLayout><Home/></HomeLayout>} />
      <Route path="/register" element={<HomeLayout><Register /> </HomeLayout>} />

      <Route path="/dashboard" element={<RootLayout><Dashboard /> </RootLayout>} />
      <Route path="/venues" element={<RootLayout><Venues /> </RootLayout>} />
      <Route path="/venues/:id" element={<RootLayout><VenueDetails /> </RootLayout>} />
    </Route>
  )
)

function App() {
  return (
    // <Route>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/register" component={Register} />
    // </Route>

    <RouterProvider router={router} />
  )
}

export default App