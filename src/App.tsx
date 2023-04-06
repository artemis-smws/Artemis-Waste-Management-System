import './App.scss'
import LandingPage from './components/landingPage'
import Navbar from './components/navbar'

export function App() {
  return (
    <div className='position-relative'>
      <Navbar />
      <LandingPage />
    </div>
  )
}
 