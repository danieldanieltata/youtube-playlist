import YouTube from "react-youtube";

import './Player.css'

function Player(props) {
    const playerOptions = {
        playerVars: {
            autoplay: 1,
        }
    };

    return (
        <div className="player-container">
            <YouTube videoId={props.playedVideo} opts={playerOptions} onEnd={props.onEnd} height='400px'/>
        </div>
    )
}

export default Player;
