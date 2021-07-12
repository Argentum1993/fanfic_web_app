import axios from 'axios'
import _, { map } from 'underscore'

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

    logout(history = null, redirect = '/') {
        localStorage.removeItem(USER)
        if (history != null) {
            history.push(redirect)
        }
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(USER))
    }

    updateUser(updates) {
        const user = this.getCurrentUser()
        localStorage.setItem(USER, JSON.stringify(_.extend(user, updates)))
    }
}

export default new AuthService()