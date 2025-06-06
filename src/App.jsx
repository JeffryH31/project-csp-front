import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie_Detail from './User/Movie_Detail'; // adjust path if needed
import "./App.css";
import MyTickets from './User/MyTickets';
// import Movie_Detail from "./User/Movie_Detail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:id" element={<Movie_Detail />} />
        <Route path="/history" element={<MyTickets />} />
        {/* Add other routes here as needed */}
        {/* Example: <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

