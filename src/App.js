import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './screens/Home/Home';
import BookDetail from './screens/BookDetail/BookDetail';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
