import {
    SET_GAMES,
    ADD_GAMES,
    GAME_FETCHED,
    UPDATE_GAME,
    GAME_DELETED
} from "../constants";

export const setGames = (games) => {
    return {
        type: SET_GAMES,
        games
    }
}
export const fetchGames = () => {
    return dispatch => {
        return fetch('http://192.168.0.186:8080/api/games')
            .then(handleResponse)
            .then(data => dispatch(setGames(data.games)))
    }
}

export const gameFetched = (game) => {
    return {
        type: GAME_FETCHED,
        game
    }
}
export const fetchGame = (id) => {
    return dispatch => {
        return fetch(`http://192.168.0.186:8080/api/games/${id}`)
            .then(handleResponse)
            .then(data => dispatch(gameFetched(data.game)))
        //为什么修改的时候要请求服务器呢？ 因为不保证别人也修改了这个文件，所以需要向服务器请求最新的文件。在进行修改。
    }
}


export const addGame = (game) => {
    return {
        type: ADD_GAMES,
        game
    }
}

export const saveGame = (data) => {
    //异步的话都是抛出一个函数然后在当前页面进行
    return dispatch => {
        return fetch('http://192.168.0.186:8080/api/games', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(handleResponse)
            .then(data => {
                console.log(data);
                //请求拿到以后就在状态种新增一个游戏,避免服务器请求的等待时间...
                dispatch(addGame(data.game))
                return data;
            })
    }
}


export const gameUpdate = (game) => {
    return {
        type: UPDATE_GAME,
        game
    }
}

export const updateGame = (data) => {
    return dispatch => {
        return fetch(`http://192.168.0.186:8080/api/games/${data._id}`, {
                method: 'put',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(handleResponse)
            .then(data => {
                console.log(data);
                //请求拿到以后就在状态种新增一个游戏,避免服务器请求的等待时间...
                dispatch(gameUpdate(data.game))
                return data;
            })
    }
}
export const gameDeleted = (gameId) => {
    return {
        type: GAME_DELETED,
        gameId
    }
}
export const deleteGame = (id) => {
    return dispatch => {
        return fetch(`http://192.168.0.186:8080/api/games/${id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(handleResponse)
            .then(data => {
                console.log(data);
                dispatch(gameDeleted(id))
                return data;
            })
    }
}
const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {

        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}