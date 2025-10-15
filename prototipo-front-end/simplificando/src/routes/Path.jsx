import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroForm from "../components/CadastroForm";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Main from "../pages/main";

const Path = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<CadastroForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Header/>}/>
        <Route path="/main" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
