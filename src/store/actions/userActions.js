import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const processLogoutUser = () => ({
    type: actionTypes.PROCESS_LOGOUT_USER
})

export const playAllPlaylist = (listSongs) => ({
    type: actionTypes.PLAY_ALL_PLAYLIST,
    listSongs: listSongs
})