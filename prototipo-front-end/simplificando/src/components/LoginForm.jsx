import { useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await userService.login(email, password);
      setMessage("Login realizado com sucesso!");

      setTimeout((e) => {
        navigate('/main')
      }, 1000)
      
      console.log("Usuário logado:", data);
    } catch (err) {
      setMessage("Erro ao fazer login. Verifique suas credenciais.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handlerSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <div className="mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-700">{message}</p>
        )}

        <div className="text-center pt-3">
          <a href="/registro" className="text-blue-600 hover:underline">
            Não tem conta?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
