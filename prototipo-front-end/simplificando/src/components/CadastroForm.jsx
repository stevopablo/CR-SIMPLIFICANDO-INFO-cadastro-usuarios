import { useState } from "react";
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const CadastroForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Campos obrigatórios");
      return;
    }

    try {
      const data = await userService.registerUser(name, email, password);
      setMessage("Usuário cadastrado com sucesso!");
      
      setTimeout(() => {
        navigate('/login')
      }, 1000)

      console.log(data);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao cadastrar usuário");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors mb-4"
        >
          Cadastrar
        </button>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <p className="text-center text-gray-600">
          Já possui conta? <a href="/login" className="text-blue-600 hover:underline">Clique aqui</a>
        </p>
      </form>
    </div>
  );
};

export default CadastroForm;
