const GameLevelSelectionComponent = () => {
  return (
    <div className="game-level-container">
      <label className="label-game-level">Select Game Level</label>
      <button className="btn-easy">Easy</button>
      <button className="btn-medium">Medium</button>
      <button className="btn-hard">Hard</button>
    </div>
  );
};

export default GameLevelSelectionComponent;
