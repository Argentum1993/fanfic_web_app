export default function authHeader() {
    const USER_STORAGE = 'user'

    const user = JSON.parse(localStorage.getItem(USER_STORAGE));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}