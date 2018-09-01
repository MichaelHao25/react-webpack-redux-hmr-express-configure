import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import GamesList from "./GamesList";
import { fetchGames, deleteGame } from "../actions";


class GamesPage extends React.Component {
    componentDidMount() {
        // 这里优化为每次初始化的时候请求,不是每次都请求这个数据,缓解服务器的压力,后期的话设置过期时间.
        // this.props.fetchGames()
        this.props.games.length === 0 && this.props.fetchGames()
    }
    render() {
        return <GamesList games={this.props.games} deleteGame={this.props.deleteGame} />
    }
}
GamesPage.propTypes = {
    games: PropType.array.isRequired,
    fetchGames: PropType.func.isRequired,
}
const mapStateToProps = (state) => {
    return {
        games: state.games
    }
}
export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);