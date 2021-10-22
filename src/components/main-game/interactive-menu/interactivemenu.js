import React, { useState } from "react";
import { render } from "react-dom";
import { Text } from "react-native-web";

const InteractiveMenu = () => {
  const [tableHand, updateTableHand] = useState({});
  const [playerHand, updatePlayerHand] = useState({});
  const [diceRolled, updateDiceRoll] = useState(false);
  const [faceSelected, updateFaceSelected] = useState();
  const [quantitySelected, updateQuantitySelected] = useState(0);
  const [previousFace, updatePreviousFace] = useState();
  const [previousQuantity, updatePreviousQuantity] = useState();
  const [currentPlayersTurn, updateCurrentPlayersTurn] = useState();
  const [listOfPlayers, updateListOfPlayers] = useState();
  const NUMBER_OF_DICE_PER_HAND = 5;

  const rollDice = () => {
    if (diceRolled === false) {
      let diceHand = {};
      for (let i = 0; i < NUMBER_OF_DICE_PER_HAND; i++) {
        let die = Math.floor(Math.random() * 6 + 1);
        diceHand[die] === undefined ? (diceHand[die] = 1) : diceHand[die]++;
      }
      updatePlayerHand(diceHand);
      updateTableHand({ ...tableHand, ...diceHand });
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
  };

  const FaceSelection = () => {
    return (
      <div>
        <button onClick={() => selectFace(1)}>1</button>
        <button onClick={() => selectFace(2)}>2</button>
        <button onClick={() => selectFace(3)}>3</button>
        <button onClick={() => selectFace(4)}>4</button>
        <button onClick={() => selectFace(5)}>5</button>
        <button onClick={() => selectFace(6)}>6</button>
      </div>
    );
  };

  const incrementQuantity = (increment) => {
    if (quantitySelected > 0 || increment > 0) {
      updateQuantitySelected(quantitySelected + increment);
    }
  };

  const CurrentCall = () => {
    return (
      <div>
        <Text>
          Current Call:
          {"\n"}
          Quantity: {quantitySelected}
          {"\n"}
          Face: {faceSelected}
        </Text>
      </div>
    );
  };

  const QuantitySelectionButton = () => {
    return (
      <div>
        <button onClick={() => incrementQuantity(+1)}>+</button>
        <button onClick={() => incrementQuantity(-1)}>-</button>
      </div>
    );
  };

  const callRaise = () => {
    // this will need to save to the previous call
    updatePreviousQuantity(quantitySelected);
    updatePreviousFace(faceSelected);
    alert(`Your call was: ${quantitySelected} ${faceSelected}`);
  };

  const CallRaiseButton = () => {
    return (
      <div>
        <CurrentCall />
        <button onClick={callRaise}>Raise</button>
      </div>
    );
  };

  const callBluffChecker = () => {
    // could optionally use the previous player's id in the call
    alert(`CALLING OUT PREVIOUS PLAYER BLUFF!`);
    let face = previousFace;
    console.log(playerHand);
    console.log(`TABLE HAND ${Object.keys(tableHand)}`);
    if (playerHand[face] >= previousQuantity) {
      console.log("THE CALL IS CORRECT, YOU GOT BLUFFED OUT");
    } else {
      console.log("THE CALL IS A BLUFF, YOU CALLED THE BLUFF CORRECTLY");
    }
  };

  const CallBluffButton = () => {
    return (
      <div>
        <button onClick={callBluffChecker}>Call Bluff</button>
      </div>
    );
  };

  const PreviousCall = () => {
    if (previousFace === 0 && previousQuantity) {
      return null;
    } else {
      return (
        <div>
          <Text>
            <p>Previous Call:</p>
            {previousQuantity} {previousFace}
          </Text>
        </div>
      );
    }
  };

  return (
    <div>
      <h3>Interactive Menu</h3>
      <button id="rollButton" onClick={() => rollDice()} disabled={diceRolled}>
        Roll
      </button>
      {diceRolled ? displayHand(playerHand) : null}
      {diceRolled ? <QuantitySelectionButton /> : null}
      {diceRolled ? <FaceSelection /> : null}
      <PreviousCall />
      <div>
        Actions
        <CallBluffButton />
        <CallRaiseButton />
      </div>
    </div>
  );
};

export default InteractiveMenu;
