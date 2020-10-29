import axios from 'axios';

const instance = axios.create({
  baseUrl: '...' // The Api (Cloud function) URL
});

export default instance;
