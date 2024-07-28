import axios from "axios";

// Membuat instance axios
export const api = axios.create({
  baseURL: "https://spk-penyakitkucing.vercel.app/",
  withCredentials: true // Memastikan cookies dikirim dalam setiap request
});

// Tambahkan interceptors untuk request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await api.post('/user/refreshtoken', {}, {
          withCredentials: true 
        });
        console.log(response)
        const newToken = response.data.accessToken;
        localStorage.setItem('access-token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const region = axios.create({
  baseURL: "https://spk-penyakitkucing.vercel.app/"
});