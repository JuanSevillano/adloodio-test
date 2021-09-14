import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4848/',
})

export default instance