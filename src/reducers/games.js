import {
    SET_GAMES,
    ADD_GAMES,
    GAME_FETCHED,
    UPDATE_GAME,
    GAME_DELETED
} from "../constants";
const games = (state = [], action) => {
    switch (action.type) {
        case SET_GAMES:
            return action.games;
        case ADD_GAMES:
            return [
                ...state,
                action.game,
            ];
        case GAME_FETCHED:
            //拿到地址栏的id以后先和state进行更新。。。
            const index = state.findIndex((item) => item._id === action.game._id);
            if (index > -1) {
                //找到的话就进行覆盖
                return state.map((item) => {
                    if (item._id === action.game._id)
                        return action.game;
                    //如果id相同则返回服务器上的数据
                    else {
                        return item
                        //如果不相同则返回原有的数据
                    }
                })
            } else {
                // 就是没有找到那个id则添加，即是别人已经添加的游戏但是这边没有渲染出来
                return [
                    ...state,
                    action.game,
                ]
            }
        case UPDATE_GAME:
            return state.map((item) => {
                if (item._id === action.game._id)
                    return action.game;
                //如果id相同则返回服务器上的数据
                else {
                    return item
                    //如果不相同则返回原有的数据
                }
            })
        case GAME_DELETED:
            return state.filter((item) => item._id != action.gameId)
        default:
            return state;
    }
}

export default games;