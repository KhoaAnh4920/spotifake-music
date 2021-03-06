import axios from '../axios';

// Móc API //


const getAllSong = (limit) => {
    return axios.get(`/api/get-all-songs?limit=${limit}`)
}

const getRandomSongs = (limit) => {
    return axios.get(`/api/get-random-songs?limit=${limit}`)
}

const getAllSongsByArtists = (artistsId) => {
    return axios.get(`/api/get-all-songs-by-artists?artistsId=${artistsId}`)
}

const getAllSongsByGenres = (genresId) => {
    return axios.get(`/api/get-all-songs-by-genres?genresId=${genresId}`)
}

const getAllSongsByArtistsGenres = (artistsId, genresId) => {
    return axios.get(`/api/get-all-songs-by-artists-genres?artistsId=${artistsId}&genresId=${genresId}`)
}

const getEditSong = (id) => {
    return axios.get(`/api/get-edit-song?id=${id}`)
}

const getSongByKeyword = (kw) => {
    return axios.get(`/api/get-song-by-keyword?kw=${kw}`)
}

const getDetailSong = (id) => {
    return axios.get(`/api/get-detail-song?id=${id}`)
}

const createNewSongService = (data, config) => {
    return axios.post('/api/create-new-song', data, config)
}

const editSongService = (data, config) => {
    return axios.put('/api/edit-song', data, config);
}

const deleteSongService = (id) => {
    return axios.delete('/api/delete-song', {
        data: {
            id: id
        }
    });
}

const editSongCount = (data) => {
    return axios.put('/api/edit-song-count', data)
}
const getSongByName = (nameSong) => {
    return axios.get(`/api/get-song-by-name?nameSong=${nameSong}`);
}

export {
    createNewSongService,
    getAllSong,
    getEditSong,
    editSongService,
    deleteSongService,
    getAllSongsByArtists,
    getAllSongsByArtistsGenres,
    getAllSongsByGenres,
    getDetailSong,
    getRandomSongs,
    getSongByKeyword,
    editSongCount,
    getSongByName
}; 