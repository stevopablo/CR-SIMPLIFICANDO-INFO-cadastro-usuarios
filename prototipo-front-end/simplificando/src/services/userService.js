import api from './api';

const userService = {
  login: async (email, password) => {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  },
  registerUser: async (name, email, password) => {
    const response = await api.post('/user', {name, email, password});
    return response.data;
  }
};

export default userService;
