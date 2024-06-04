import axios from "axios"

let key = null;
const instance = axios.create({
    //baseURL:`http://192.168.29.235:3000/api/v1/`,
    headers: {
        Authorization: key
        //'Content-Type': 'multipart/form-data'
     }
})

export default instance