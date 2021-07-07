export default function authHeader() {
    const HEADER = 'Authorization:'
    const USER_STORAGE = 'user'

    const user = JSON.parse(localStorage.getItem(USER_STORAGE));

    if (user && user.accessToken) {
        return { HEADER: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}