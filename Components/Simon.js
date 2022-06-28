import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import Square from './Square';
import Start from './Start';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { setBlinking, setScores} from '../SimonActions/actions';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Simon = (props) => {

  const [computerColors, setComputerColors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trig, computerTurnTrig] = useState(false);
  const [lock, lockUser] = useState(true);
  const TIME_PER_BLINK = 750; // In milliseconds
  useEffect(() => {
    AsyncStorage.getItem('scores').then(data => {
      if (!data) {
        props.dispatch(setScores([]));
        return;
      }
      console.log('----------------------------', props.dispatch)
      props.dispatch(setScores(JSON.parse(data)));
    })

  }, []);

  const score = () => {
    if (computerColors.length === 0)
      return 0;
    else {
      return computerColors.length - 1
    }
  };
  const startButton = () => {
    if (computerColors.length > 0)
      return 'Good Luck !';
    else {
      return 'Start Game';
    }
  };

  useEffect(() => {
    computerTurn();
  }, [trig]);

  const disStartButton = () => {
    if (computerColors.length > 0) {
      return true;
    };
  }
  const computerTurn = () => {
    if (!computerColors.length)
      return;

    computerColors.forEach((color, index) => {
      const gameObject = props.gameObjects.find(t => t.color === color);
      setTimeout(() => {
        gameObject.sound.play();
        props.dispatch(setBlinking(gameObject.index, true));
      }, TIME_PER_BLINK * (index + 1));
    });

    setTimeout(() => {
      lockUser(false);
    }, TIME_PER_BLINK * (computerColors.length + 1));
  }


  const startGame = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = props.gameObjects[randomNumber].color;
    setComputerColors([randomColor]);
    setCurrentIndex(0);

    // Lock screen + computer turn
    lockUser(true);
    computerTurnTrig(!trig);
  }
  const turnOver = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = props.gameObjects[randomNumber].color;
    setComputerColors([...computerColors, randomColor]);
    setCurrentIndex(0);

    // Lock screen + computer turn
    lockUser(true);
    computerTurnTrig(!trig);
  };

  const clickValidated = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const userFailed = () => {
    const score = computerColors.length - 1;
    setComputerColors([]);
    setCurrentIndex(0);
    lockUser(true);
    props.navigation.navigate('Score Board', { score })
  };

  const onUserClickedOnColor = (index) => {
    props.gameObjects[index].sound.play();
    // Get color
    const color = props.gameObjects[index].color;

    // Check if click success
    if (color === computerColors[currentIndex]) {
      // Turn over?
      if (currentIndex === computerColors.length - 1) {
        turnOver();
        return;
      }
      // +1 to current index
      clickValidated();
      return;
    }

    userFailed();
  }

  const onStartGame = () => {
    // Reset game if got any
    // Go to first turn
    startGame();
  }

  return (

    <View style={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'space-between',
      height: '100%',
      backgroundColor: 'gray'
    }}>
      <Text style={{
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10
      }}>Score: {score()}</Text>
      <View style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 250,
          height: 250,
          alignSelf: 'center',
          // alignContent: 'space-between',
          // justifyContent: 'space-between',
          borderRadius: 250,
          borderColor: 'black',
          borderWidth: 5
        }}>
          {props.gameObjects.map(t =>
            <View key={t.index} style={{
              width: '50%',
            }}>
              <Square
                {...t} 
                key={t.index}
                dis={lock}
                onUserClickedOnColor={onUserClickedOnColor}
              />
            </View>
          )}

        </View>
      </View>
      <Start onStartGame={onStartGame}
        val={startButton()}
        dis={disStartButton()} />
    </View>
  )
}


const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(Simon);
