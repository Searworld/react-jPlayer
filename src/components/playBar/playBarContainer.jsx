import { connectWithId } from '../../util/index';
import PlayBar from './playBar';

const mapStateToProps = ({ jPlayers }, { id, ...attributes }) => ({
  smoothPlayBar: jPlayers[id].smoothPlayBar,
  currentPercentAbsolute: jPlayers[id].currentPercentAbsolute,
  currentPercentRelative: jPlayers[id].currentPercentRelative,
  attributes,
});

export default connectWithId(mapStateToProps)(PlayBar);
