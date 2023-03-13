// Styles
import "./App.css";

// Functional
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Pages
import { Home } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
