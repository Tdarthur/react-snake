import Game from './Game';

import '../styles/App.css';

const BOARD_WIDTHS = { SMALL: 50, MEDIUM: 75, LARGE: 100 };
const BOARD_HEIGHTS = { SMALL: 50, MEDIUM: 50, LARGE: 75 };

const [settings, setSettings] = useState({
    boardSize: { width: BOARD_WIDTHS.MEDIUM, height: BOARD_HEIGHTS.MEDIUM }
});

function App() {
    return (
        <div>
            <Game settings={settings} />
        </div>
    );
}

export default App;
