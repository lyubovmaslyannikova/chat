import axios from 'axios';

let axiosInst = axios.create({
	baseURL: 'http://localhost:3000',
});

export default axiosInst;
