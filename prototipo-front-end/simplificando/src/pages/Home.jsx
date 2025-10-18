import React from 'react';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Header />

      <main className="home-main">
        <h2>Bem-vindo ao CR SIMPLIFICANDO INFO</h2>
        <p>Interface simples de exemplo para a página inicial. Use os botões abaixo para navegar.</p>

        <div className="actions">
          <a href="/cadastro" className="btn primary">Cadastrar</a>
          <a href="/login" className="btn secondary">Entrar</a>
        </div>
      </main>

      <footer className="home-footer">© {new Date().getFullYear()} CR SIMPLIFICANDO INFO</footer>
    </div>
  );
};

export default Home;