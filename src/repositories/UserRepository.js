import axios from '../services/axios';
const resource = 'repos';

const userRepository = {
    get(id, options) {
        return axios.get(`${resource}/${id}`, options);
    }
}

export default userRepository;