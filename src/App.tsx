import './App.scss'
import LandingPage from './components/pages/landingPage'
import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/admin' element={<h1>Test Admin</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
 