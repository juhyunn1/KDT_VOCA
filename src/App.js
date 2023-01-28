import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AddDay from "./components/pages/AddDay";
import AddWord from "./components/pages/AddWord";
import Main from "./components/pages/Main";
import WordPage from "./components/pages/WordPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/list/:dayId" element={<WordPage />} />
          <Route path="/addWord" element={<AddWord/>}/>
          <Route path="/addDay" element={<AddDay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;