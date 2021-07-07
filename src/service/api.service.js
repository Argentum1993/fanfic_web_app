import axios from "axios"
import authHeader from "./auth-header";

const API_URL = '/api/v1/'

class ApiService{

    getFandoms = () => {
        const FANDOMS_ENDPOINT = API_URL + '/fandoms'

        return axios.get(FANDOMS_ENDPOINT, { headers:authHeader() })
    }

    saveUserFandoms = (userId, favorite) => {
        const USER_FANDOMS_ENDPOINT = API_URL + 'users/' + userId + '/fandoms'

        return axios.put(USER_FANDOMS_ENDPOINT,  favorite,{ headers:authHeader() })
    }
}

export default new ApiService()