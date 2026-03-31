const GuessAffichage = ({ random, guess }) => {
  if (!guess || !random) return null;

  const getColor = (value, target) => {
    return value === target ? "lightgreen" : "salmon";
  };

  const getAge = (value, target) => {
    if (value === target) return "✅";
    return value < target ? "⬆️" : "⬇️";
  };
  return (
    <>
      <div className="guess-container">
        <table>
          <thead>
            <tr>
              <th>Joueur</th>
              <th>Nom</th>
              <th>Club</th>
              <th>Championnat</th>
              <th>Nation</th>
              <th>Position</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {guess.map((player) => (
              <tr key={player.id}>
                <td>
                  <img src={player?.photo}></img>
                </td>
                <td
                  style={{
                    backgroundColor: getColor(
                      player.firstName,
                      random.firstName,
                    ),
                  }}
                >
                  {player.firstName}
                </td>
                <td
                  style={{
                    backgroundColor: getColor(player.clubName, random.clubName),
                  }}
                >
                  {player.clubName}
                </td>
                <td
                  style={{
                    backgroundColor: getColor(
                      player.leagueName,
                      random.leagueName,
                    ),
                  }}
                >
                  {player.leagueName}
                </td>

                <td
                  style={{
                    backgroundColor: getColor(player.nation, random.nation),
                  }}
                >
                  {player.nation}
                </td>
                <td
                  style={{
                    backgroundColor: getColor(player.position, random.position),
                  }}
                >
                  {player.position}
                </td>
                <td
                  style={{ backgroundColor: getColor(player.age, random.age) }}
                >
                  {player.age}
                  {getAge(player.age, random.age)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GuessAffichage;
