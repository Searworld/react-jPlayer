import React from "react";
import {connect} from "react-redux";
import merge from "lodash.merge";

import {keys, classNames, keyIgnoreElementNames, loopOptions} from "../util/constants";
import {play, pause, mute, volume, loop, fullScreen} from "../actions/jPlayerActions";

const mapStateToProps = ({jPlayers, selector=jPlayers.currentSelector}) => ({
    ...jPlayers[selector],
    selector
});

export default connect(mapStateToProps)(
    class extends React.Component {
        constructor(props) {
            super(props);

            this.keyBindings = merge({}, {
                play: {
					key: 80, // p
					fn: () => this.props.paused ? this.props.dispatch(play(this.props.selector)) : this.props.dispatch(pause(this.props.selector))
				},
				fullScreen: {
					key: 70, // f
					fn: () => {
						if(this.props.mediaSettings.available && this.props.mediaSettings.video || this.props.audioFullScreen) {
							this.fullScreen(!this.props.fullScreen, this.props.selector);
						}
					}
				},
				mute: {
					key: 77, // m
					fn: () => this.props.dispatch(mute(!this.props.muted, this.props.selector))
				},
				volumeUp: {
					key: 190, // .
					fn: () => {
                        this.props.dispatch(volume(this.props.volume + 0.1, this.props.selector));
                        this.props.dispatch(mute(false, this.props.selector));
                    }
				},
				volumeDown: {
					key: 188, // ,
					fn: () =>  this.props.dispatch(volume(this.props.volume - 0.1, this.props.selector))
				},
				loop: {
					key: 76, // l
					fn: () => this.props.loop === loopOptions.LOOP ? this.props.dispatch(loop(loopOptions.OFF, this.props.selector)) : this.props.dispatch(loop(loopOptions.LOOP, this.props.selector))
				}
            }, this.props.keyBindings);
        }
        onKeyDown = (event) => {
            if (keyIgnoreElementNames.some(name => name.toUpperCase() === event.target.nodeName.toUpperCase())) {
                return;
            }

            for (var key in this.keyBindings) {
                const keyBinding = this.keyBindings[key];

                if (keyBinding.key === event.keyCode ||
                    keyBinding.key === event.key) {
                    event.preventDefault();
                    keyBinding.fn();
                }
            }
        }
        componentWillMount() {
            document.addEventListener("keydown", this.onKeyDown.bind(this));
        }
        componentWillUnmount() {
            document.removeEventListener("keydown", this.onKeyDown);
        }
        render() {
            return null;
        }
    }
)