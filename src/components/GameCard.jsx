import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GameCard = ({ game, deletGame }) => {
    return (
        <div className="ui card">
            <div className="image">
                <img src={game.url} alt="" />
            </div>
            <div className="content">
                <div className="header">{game.title}</div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <Link to={`/game/${game._id}`} className="ui basic button green">Edit</Link>
                    <div onClick={() => { deletGame(game._id) }} className="ui basic button red">Delete</div>
                </div>
            </div>

        </div>
    )

}
GameCard.propTypes = {
    game: PropTypes.object.isRequired,
    deletGame: PropTypes.func.isRequired
}

export default GameCard