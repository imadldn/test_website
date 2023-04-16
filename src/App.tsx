//import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/navBar/NavBar';
import SearchResult from './pages/postcodeSearch/SearchResults';
import HomepageComponent from "./pages/homepage/Homepage";
import { ReturnOnInvestment } from "./pages/returnOnInvestment/ReturnOnInvestment";
import { Stack } from "@mui/material";

function App() {
  return (
    <div>
      <Stack className="App">
      </Stack>
      <Stack>        
      <NavBar/>
      </Stack>
          <Routes>
            <Route path="/" element={<HomepageComponent/>} />
            <Route path="/ReturnOnInvestment" element={<ReturnOnInvestment/>} />
            <Route path="/:postcode" element={<SearchResult/>} />
          </Routes>
    </div>
  );
}

export default App;
