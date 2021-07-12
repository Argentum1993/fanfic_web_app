import axios from "axios"
import authHeader from "./auth-header"
import AuthService from './auth.service'

// Api prefix
const API_URL                               = '/api/v1'

// Map endpoints
const FANDOMS_ENDPOINT                      = API_URL + '/fandoms'
const FANFIC_ENDPOINT                       = API_URL + '/fanfic'
const FANFIC_LAST_ENDPOINT                  = FANFIC_ENDPOINT + '/last'
const FANFIC_RATING_ENDPOINT                = FANFIC_ENDPOINT + '/rating'

// Formats map endpoints
const USER_ENDPOINT_FORMAT                  = API_URL + '/users/{0}'
const USER_FANDOMS_ENDPOINT_FORMAT          = API_URL + '/users/{0}/fandoms'
const CHAPTER_NAMES_ENDPOINT_FORMAT         = FANFIC_ENDPOINT + '/{0}/chapters/name'
const FANFIC_CHAPTER_ENDPOINT_FORMAT        = FANFIC_ENDPOINT + '/{0}/chapters/{1}'
const USER_FANFICS_ENDPOINT_FORMAT          = USER_ENDPOINT_FORMAT + '/fanfic'
const USER_FANFICS_COUNT_ENDPOINT_FORMAT    = USER_FANFICS_ENDPOINT_FORMAT + '/count'
const FANDOM_FANFICS_ENDPOINT_FORMAT        = FANDOMS_ENDPOINT + '/{0}/fanfic'
const FANDOM_FANFICS_COUNT_ENDPOINT_FORMAT  = FANDOM_FANFICS_ENDPOINT_FORMAT + '/count'


class ApiService{

    getFandoms = () => {
        return axios.get(FANDOMS_ENDPOINT, { headers:authHeader() })
    }

    saveUserFandoms = (userId, favorite) => {
        return axios.put(USER_FANDOMS_ENDPOINT_FORMAT.format(userId),  favorite,{ headers:authHeader() })
    }

    updateUser = (data) => {
        AuthService.updateUser(data)
        return axios.patch(USER_ENDPOINT_FORMAT.format(
            AuthService.getCurrentUser().id),
            data,
            { headers:authHeader() }
            )
    }

    getLastUpdatedFanfics = (size = 10) => {
        const params = {
            size: size,
        }
        return axios.get(
            FANFIC_LAST_ENDPOINT,
            {
                headers: authHeader(),
                params: params
            })
    }

    getHighlyRatedFanfics = (size = 10) => {
        const params = {
            size: size,
        }
        return axios.get(
            FANFIC_RATING_ENDPOINT,
            {
                headers: authHeader(),
                params: params
            })
    }

    getNameChapters = (idFanfic) => {
        return axios.get(CHAPTER_NAMES_ENDPOINT_FORMAT.format(idFanfic), { headers: authHeader() })
    }

    getChapter = (idFanfic, chapterNum = 1) => {
        return axios.get(
            FANFIC_CHAPTER_ENDPOINT_FORMAT.format(idFanfic, chapterNum),
            { headers: authHeader() }
        )
    }

    countUserFanfics = (userId = AuthService.getCurrentUser().id) => {
        return axios.get(
            USER_FANFICS_COUNT_ENDPOINT_FORMAT.format(userId),
            { headers: authHeader() }
        )
    }

    getUserFanfics = (pageable = null, userId = AuthService.getCurrentUser().id) => {
        return axios.get(
            USER_FANFICS_ENDPOINT_FORMAT.format(userId),
            {
                headers: authHeader(),
                params: pageable
            }
        )
    }

    getFanficsByFandomId = (id, pageable = null) => {
        return axios.get(
            FANDOM_FANFICS_ENDPOINT_FORMAT.format(id),
            {
                headers: authHeader(),
                params: pageable
            }
        )
    }

    getCountFanficsByFandomId = (id) => {
        return axios.get(
            FANDOM_FANFICS_COUNT_ENDPOINT_FORMAT.format(id),
            { headers: authHeader() }
        )
    }
}

export default new ApiService()