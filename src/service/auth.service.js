import axios from 'axios'

const API_URL = '/api/v1/auth'
const USER = 'user'

class AuthService {

    register = (first_name, last_name, email, password) => {
        const REG_ENDPOINT = API_URL + '/sign-up'

        return axios.post(REG_ENDPOINT, {
            first_name,
            last_name,
            email,
            password
        })
    }

    login = (email, password) => {
        const LOGIN_ENDPOINT = API_URL + '/login'

        return axios.post(LOGIN_ENDPOINT, {
            email,
            password
        }).then(response => {
            if (response.data.accessToken) {
                localStorage.setItem(USER, JSON.stringify(response.data))
            }
            return response.data
        })
    }

    logout() {
        localStorage.removeItem(USER);
        console.log("test");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(USER))
    }
}

export default new AuthService()