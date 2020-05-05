import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://jsonplaceholder.typicode.com'
});

instance.defaults.header.commom['Authorization'] = 'AUTH TIKEN FROM INSTANCE';

export default instance;
