import React from "react";
import {connect} from "react-redux";

import {keys, classNames} from "../../util/constants";
import {playbackRate, addUniqueToArray, removeFromArrayByValue} from "../../actions/jPlayerActions";
import * as reducer from "../../reducers/index";

const mapStateToProps = (state) => ({
    verticalPlaybackRate: state.jPlayer.verticalPlaybackRate,
    minPlaybackRate: state.jPlayer.minPlaybackRate,
    maxPlaybackRate: state.jPlayer.maxPlaybackRate,
    playbackRate: state.jPlayer.playbackRate,
    playbackRateEnabled: state.jPlayer.playbackRateEnabled
});

export default connect(mapStateToProps)(
    class extends React.Component {
        constructor(props) {
            super();

            this.state = {
                playbackRateBarValueClass: [classNames.PLAYBACK_RATE_BAR_VALUE]
            }
        }
        _updatePlaybackRateBarValueStyles = (nextProps) => {
            var playbackRate = nextProps.playbackRate,
                ratio = (playbackRate - nextProps.minPlaybackRate) / (nextProps.maxPlaybackRate - nextProps.minPlaybackRate);
            if(nextProps.playbackRateEnabled) {
                this.setState(state => reducer.removeFromArrayByValue(state, removeFromArrayByValue(keys.PLAYBACK_RATE_BAR_VALUE_CLASS, classNames.HIDDEN)));
                
                const playbackRateBarValue = (ratio * 100) + "%";

                this.setState({playbackRateBarValueStyle: {
                    width: !nextProps.verticalPlaybackRate ? playbackRateBarValue : null,
                    height: nextProps.verticalPlaybackRate ? playbackRateBarValue : null
                }});
            } else {
                this.setState(state => reducer.addUniqueToArray(state, addUniqueToArray(keys.PLAYBACK_RATE_BAR_VALUE_CLASS, classNames.HIDDEN)));
            }
        }
        componentWillReceiveProps(nextProps) {
            this._updatePlaybackRateBarValueStyles(nextProps);
        }
        render() {
            return <div className={this.state.playbackRateBarValueClass.join(" ")} style={this.state.playbackRateBarValueStyle} />
        }
    }  
);