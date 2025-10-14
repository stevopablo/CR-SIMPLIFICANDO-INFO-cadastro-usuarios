const userModel = require('../Model/UserModel');

exports.getAllUsersHandler = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByIdHandler = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const user = await userModel.getUserById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUserHandler = async (req, res) => {
  const { name, email, password, bio, avatarURL } = req.body;

  try {
    const newUser = await userModel.createUser({
      name,
      email,
      password,
      bio,
      avatarURL,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUserHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });

  try {
    const data = await userModel.loginUser(email, password);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.updateUserHandler = async (req, res) => {
  const userId = Number(req.params.id);
  const { name, email, password, bio, avatarURL } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Campos obrigatórios: nome e email' });
  }

  try {
    const updatedUser = await userModel.updateUser(userId, {
      name,
      email,
      password,
      bio,
      avatarURL,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUserHandler = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await userModel.deleteUser(userId);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
