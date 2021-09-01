import axios from 'axios';

const baseDomain = "https://api.github.com/";
const baseURL = `${baseDomain}`;

// ALL DEFAULT CONFIGURATION HERE

const api = axios.create({baseURL});

export default api;