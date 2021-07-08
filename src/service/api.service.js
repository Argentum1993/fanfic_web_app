import axios from "axios"
import authHeader from "./auth-header";

// Api prefix
const API_URL = '/api/v1/'

// Map endpoints
const FANDOMS_ENDPOINT = API_URL + '/fandoms'
const FANFIC_ENDPOINT = API_URL + '/fanfic'
const FANFIC_LAST_ENDPOINT = FANFIC_ENDPOINT + '/last'
const FANFIC_RATING_ENDPOINT = FANFIC_ENDPOINT + '/rating'

// Formats map endpoints
const USER_FANDOMS_ENDPOINT_FORMAT = API_URL + 'users/{0}/fandoms'
const CHAPTER_NAMES_ENDPOINT_FORMAT = FANFIC_ENDPOINT + '/{0}/chapters/name'
const FANFIC_CHAPTER_ENDPOINT_FORMAT = FANFIC_ENDPOINT + '/{0}/chapters/{1}'

class ApiService{

    getFandoms = () => {
        return axios.get(FANDOMS_ENDPOINT, { headers:authHeader() })
    }

    saveUserFandoms = (userId, favorite) => {
        return axios.put(USER_FANDOMS_ENDPOINT_FORMAT.format(userId),  favorite,{ headers:authHeader() })
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
}

export default new ApiService()