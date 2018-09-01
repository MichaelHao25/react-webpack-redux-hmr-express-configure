import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { saveGame, fetchGame, updateGame, fetchGames } from "../actions";
import GameForm from "./GameForm";

const mapStateToProps = (state, props) => {
    //他可以接收两个参数
    const { match } = props;

    if (match.params._id && state.games.length != 0) {
        return {
            game: [state.games.find(item => item._id == match.params._id)]
        }
        //因为game是数组
        //这里使用数组是为了好计算长度，使用json也可以。
    } else {
        return {
            game: [],
        };
    }
}
@connect(mapStateToProps, { fetchGame, saveGame, updateGame, fetchGames })
class GameFormPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        // const { match, game, history } = this.props;
        // if (game) {
        //     if (match.params._id) {
        //         this.props.fetchGame(match.params._id)
        //         this.setState({
        //             title: game.title,
        //             url: game.url,
        //         })
        //     }
        // } else {
        //     history.push('/games')
        // }
        //初始化的时候改变状态


        const { match } = this.props;
        if (match.params._id) {
            //判断是否是在游戏更新页面
            //如果游戏列表为空的话就请求所有的数据，如果大于空就请求一个数据进行更新
            if (this.props.games) {
                this.props.fetchGame(match.params._id);
            } else {
                this.props.fetchGames();
            }
            // fetchGames
        }

    }
    saveGame = ({ _id, title, url }) => {
        if (_id) {
            return this.props.updateGame({ _id, title, url }).then(
                () => {
                    this.setState({
                        redirect: true
                    })
                }
            );
        } else {
            return this.props.saveGame({ title, url }).then(
                () => {
                    this.setState({
                        redirect: true
                    })
                }
            );
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.redirect ?
                        <Redirect to="/games" /> :
                        <GameForm
                            saveGame={this.saveGame}
                            game={this.props.game}
                        />
                }
            </div>
        )
    }
}
export default GameFormPage