import axios from "axios"

let key = null;
const instance = axios.create({
    baseURL:`http://192.168.29.226:8080/api`,
    headers: {
        //'Content-Type': 'multipart/form-data'
     }
})

export default instance