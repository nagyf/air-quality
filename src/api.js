import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.openaq.org/v1'
});