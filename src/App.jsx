import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie_Detail from './User/Movie_Detail'; // adjust path if needed
import "./App.css";
// import Movie_Detail from "./User/Movie_Detail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" element={<Movie_Detail />} />
      </Routes>
    </Router>
  );
}

export default App;

