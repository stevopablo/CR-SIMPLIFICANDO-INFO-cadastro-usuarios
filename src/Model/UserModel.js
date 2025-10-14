const { prisma } = require('../prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getAllUsers = async () =>
  prisma.user.findMany({ orderBy: { name: 'asc' } });

exports.getUserById = async (id) =>
  prisma.user.findUnique({ where: { id: Number(id) } });

exports.getUserByEmail = async (email) =>
  prisma.user.findUnique({ where: { email } });

exports.createUser = async ({ name, email, password, bio, avatarURL }) => {
  const userExist = await exports.getUserByEmail(email);
  if (userExist) throw new Error('User already exists');

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

exports.LoginUser = async (email, password) => {
  if (!email || !password) throw new Error('Email and password are required');

  const userExist = await exports.getUserByEmail(email);
  if (!userExist) throw new Error('Email not found');

  const isPasswordValid = await bcrypt.compare(password, userExist.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  const token = jwt.sign(
    { id: userExist.id, email: userExist.email },
    JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  return {
    user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    },
    token,
  };
};

exports.updateUser = async (id, updatedData) => {
  const userExist = await exports.getUserById(id);
  if (!userExist) throw new Error('User does not exist');

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data: updatedData,
  });
};

exports.deleteUser = async (id) => {
  const userExist = await exports.getUserById(id);
  if (!userExist) throw new Error('User does not exist');

  return prisma.user.delete({ where: { id: Number(id) } });
};
