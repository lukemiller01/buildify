// Styles
import "./App.css";

// Functional
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Context
import { SongContextProvider } from "./context/SongProvider";

// Pages
import { Home } from "./pages";

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
