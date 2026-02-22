import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Admin from './pages/Admin'
import FloatingSocial from './components/FloatingSocial'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <FloatingSocial />
        </>
    )
}

export default App
