const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-8 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold text-red-400">
        CR SIMPLIFICANDO INFO
      </h1>

      <nav>
        <ul className="flex gap-4">
          <li>
            <a
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl transition-colors"
            >Login</a>
          </li>
          <li>
            <a
              href="#"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl transition-colors"
            >Sobre</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;