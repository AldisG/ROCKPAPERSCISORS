import './App.scss';
import Game from './components/game/Game';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1>Rock Paper Scisor And The Rest</h1>
    </header>
    <main className="game-wrapper">
      <Game />
    </main>
  </div>
);

export default App;
