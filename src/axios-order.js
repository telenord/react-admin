import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-order-2ffee.firebaseio.com',
});

export default instance;