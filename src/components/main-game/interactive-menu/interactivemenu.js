import React, { useState } from "react";
import { Text } from "react-native-web";

const InteractiveMenu = () => {
  // const [playersHands, updatePlayersHands] = useState(0);
  const [playerHand, updatePlayerHand] = useState({});
  const [diceRolled, updateDiceRoll] = useState(false);
  const [faceSelected, updateFaceSelected] = useState();
  const [quantitySelected, updateQuantitySelected] = useState(0);
  // const [{ previousFace, previousQuantity }, updatePreviousCall] = useState();
  const NUMBER_OF_DICE_PER_HAND = 5;

  const rollDice = () => {
    if (diceRolled === false) {
      let diceHand = {};
      for (let i = 0; i < NUMBER_OF_DICE_PER_HAND; i++) {
        let die = Math.floor(Math.random() * 6 + 1);
        diceHand[die] === undefined ? (diceHand[die] = 1) : diceHand[die]++;
      }
      updatePlayerHand(diceHand);
      updateDiceRoll(true);
    }
  };

  const displayHand = (hand) => {
    return (
      <div>
        Your Hand:
        <ul>
          {Object.entries(hand).map(([key, value]) => (
            <li key={key}>{`Die ${key}: ${value}`}</li>
          ))}
        </ul>
      </div>
    );
  };

  const selectFace = (face) => {
    updateFaceSelected(face);
    console.log(`FACE SELECTED: ${face}`);
  };

  const faceSelection = (
    <div>
      <button onClick={() => selectFace(1)}>1</button>
      <button onClick={() => selectFace(2)}>2</button>
      <button onClick={() => selectFace(3)}>3</button>
      <button onClick={() => selectFace(4)}>4</button>
      <button onClick={() => selectFace(5)}>5</button>
      <button onClick={() => selectFace(6)}>6</button>
    </div>
  );

  const incrementQuantity = (increment) => {
    if (quantitySelected > 0 || increment > 0) {
      updateQuantitySelected(quantitySelected + increment);
    }
  };

  const currentCall = (
    <div>
      <Text>
        Current Call:
        {"\n"}
        Face: {faceSelected}
        {"\n"}
        Quantity: {quantitySelected}
      </Text>
    </div>
  );

  const quantitySelection = (
    <div>
      <button onClick={() => incrementQuantity(+1)}>+</button>
      <button onClick={() => incrementQuantity(-1)}>-</button>
    </div>
  );

  return (
    <div>
      <h3>Interactive Menu</h3>
      <button id="rollButton" onClick={() => rollDice()} disabled={diceRolled}>
        Roll
      </button>
      {diceRolled ? displayHand(playerHand) : null}
      {currentCall}
      {diceRolled ? faceSelection : null}
      {diceRolled ? quantitySelection : null}
    </div>
  );
};

export default InteractiveMenu;
