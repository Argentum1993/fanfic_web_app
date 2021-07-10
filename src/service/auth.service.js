import axios from 'axios'

const API_URL = '/api/v1/auth'
const USER = 'user'

class AuthService {

    register = (firstName, lastName, email, password) => {
        const REG_ENDPOINT = API_URL + '/sign_up'

        return axios.post(REG_ENDPOINT, {
            firstName,
            lastName,
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

    logout(_history = null, redirect = '/') {
        localStorage.removeItem(USER)
        if (_history != null) {
            _history.push(redirect)
        }
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(USER))
    }
}

export default new AuthService()