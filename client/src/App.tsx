// Styles
import "./App.css";

// Functional
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Pages
import { Home } from "./pages";
import { SongContextProvider } from "./context/SongProvider";

function App() {
  return (
    <>
    <SongContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </SongContextProvider>
    </>
  );
}

export default App;
