import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-project-react-my-burger.firebaseio.com/'
});

export default instance;