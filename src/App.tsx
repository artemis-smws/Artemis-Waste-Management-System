import './App.scss'
import LoginCard from './components/loginCard'
import Navbar from './components/navbar'

export function App() {
  return (
    <div className='position-relative'>
      <Navbar />
      <LoginCard />
    </div>
  )
}
 