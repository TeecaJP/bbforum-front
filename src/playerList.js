import React from "react";

// Dummy
const examplePlayerList = [
  {id: 0, number: "0", name: "監督", position: "監督"},
  {id: 1, number: "1", name: "投手-1", position: "投手"},
  {id: 2, number: "2", name: "投手-2", position: "投手"},
  {id: 3, number: "3", name: "投手-3", position: "投手"},
  {id: 4, number: "4", name: "捕手-1", position: "捕手"},
  {id: 5, number: "5", name: "捕手-2", position: "捕手"},
  {id: 6, number: "6", name: "捕手-3", position: "捕手"},
  {id: 7, number: "7", name: "内野手-1", position: "内野手"},
  {id: 8, number: "8", name: "内野手-2", position: "内野手"},
  {id: 9, number: "9", name: "内野手-3", position: "内野手"},
  {id: 10, number: "10", name: "内野手-4", position: "内野手"},
  {id: 11, number: "11", name: "外野手-1", position: "外野手"},
  {id: 12, number: "12", name: "外野手-2", position: "外野手"},
  {id: 13, number: "13", name: "外野手-3", position: "外野手"},
  {id: 14, number: "14", name: "外野手-4", position: "外野手"},
];

function PlayerList() {
  const groupedPlayers = examplePlayerList.reduce((groups, player) => {
    const { position } = player;
    if (!groups[position]) {
      groups[position] = [];
    }
    groups[position].push(player);
    return groups;
  }, {});

  return (
    <div>
      {Object.keys(groupedPlayers).map(position => (
        <div key={position}>
          <h4>{position}</h4>
          <table cellspacing="5">
            <tbody>
              {groupedPlayers[position].map(player => (
                <tr key={player.id}>
                  <td>{player.number}</td>
                  <td>{player.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default PlayerList;