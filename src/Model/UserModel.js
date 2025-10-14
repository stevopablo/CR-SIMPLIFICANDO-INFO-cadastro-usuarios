require('dotenv').config();
const prisma = require('../prisma'); // ✅ Correção aqui!
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 🔹 Buscar todos os usuários
exports.getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { name: 'asc' },
  });
};

// 🔹 Buscar usuário por ID
exports.getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
};

// 🔹 Buscar usuário por email
exports.getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// 🔹 Criar usuário
exports.createUser = async ({ name, email, password, bio, avatarURL }) => {
  const userExist = await exports.getUserByEmail(email);
  if (userExist) throw new Error('Usuário já existe');

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      bio,
      avatarURL,
    },
  });
};

// 🔹 Login do usuário
exports.loginUser = async (email, password) => {
  if (!email || !password) throw new Error('Email e senha são obrigatórios');

  const user = await exports.getUserByEmail(email);
  if (!user) throw new Error('Credenciais inválidas');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Credenciais inválidas');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

// 🔹 Atualizar usuário
exports.updateUser = async (id, updatedData) => {
  const userExist = await exports.getUserById(id);
  if (!userExist) throw new Error('Usuário não encontrado');

  if (updatedData.email) {
    const emailExist = await exports.getUserByEmail(updatedData.email);
    if (emailExist && emailExist.id !== Number(id)) {
      throw new Error('Email já está em uso');
    }
  }

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data: updatedData,
  });
};

// 🔹 Deletar usuário
exports.deleteUser = async (id) => {
  const userExist = await exports.getUserById(id);
  if (!userExist) throw new Error('Usuário não encontrado');

  return prisma.user.delete({
    where: { id: Number(id) },
  });
};
