import './App.scss'
import LandingPage from './pages/client/landingPage'
import Navbar from './components/layout/navbar'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Sidebar from './components/layout/sidebar'

export function App() {

  return(
  <div>
    <Sidebar/>
  </div>
  )
}
 