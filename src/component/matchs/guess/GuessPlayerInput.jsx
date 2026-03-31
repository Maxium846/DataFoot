const GuessPlayerInput = ({
  name,
  setName,
  selectedPlayer,
  setSelectedPlayer,
  filteredPlayers,
  handleSelect,
  handleSubmit,
}) => {
  return (
    <div className="div">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Tapez un joueur..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setSelectedPlayer(null);
          }}
        />

        {name && !selectedPlayer && filteredPlayers.length > 0 && (
              <ul>
                
                {filteredPlayers.map((player) => (
                  <li
                    key={player.id}
                    onClick={() => handleSelect(player)}
                    style={{ padding: "8px", cursor: "pointer" }}
                  >
                    {player.firstName} :  {player.clubName} <img className = "image" src={player.photo}></img>
                  </li>
                ))}
              </ul>
        )}

        <button type="submit" style={{ marginTop: "10px" }}>
          Valider
        </button>
      </form>
    </div>
  );
};

export default GuessPlayerInput;
