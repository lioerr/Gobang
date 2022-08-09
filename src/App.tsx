import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Bar from './pages/Bar'
import Foo from './pages/Foo'
import Gobang from './pages/Gobang'
import Layout from './layouts'

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Layout/>}></Route>
    //     <Route path='/foo' element={<Foo />}></Route>
    //     <Route path='/bar' element={<Bar />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <Layout></Layout>
  )
}

export default App
