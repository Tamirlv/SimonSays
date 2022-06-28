import 'react-native-gesture-handler';
import React from 'react';
import Header from './Header';
import { View, Text, Modal, Button } from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import store from '../SimonStore/store';
import { computerUpdateColor, incrementIndex, newGame, resetColors, resetGame, resetIndex, turnOverAction, setBlinking, addScore } from '../SimonActions/actions';
// import colorReducer from '../SimonReducer/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ScoreBoard = (props) => {

  const [modalOpen, setModalOpen] = useState(true);
  const [text, setText] = useState("");

  // const onSubmit = async () => {
  //   try {
  //     console.log("HELLLLLO")
  //     await AsyncStorage.setItem('token', 'abc123')
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };




  return (
    <View>
      <Modal visible={modalOpen}>
        <View style={{
          backgroundColor: 'gray',
          display: 'flex',
          height: '100%'
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 42,
            fontStyle: 'italic',
            margin: 20
          }}>
            Your score is : {props.route.params.score}</Text>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            margin: 20
          }}>Please enter your name!</Text>
          <TextInput
            placeholder="Your Name"
            style={{
              backgroundColor: 'white',
              height: 40,
              textAlign: 'center',
              width: '50%',
              marginTop: 30,
              marginLeft: 105

            }}
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
          <View style={{
            padding: 100
          }}>
            <Button title="Submit"
              onPress={() => {
                if (text) {
                  AsyncStorage.getItem('scores').then(data => {
                    if (!data) {
                      AsyncStorage.setItem('scores', JSON.stringify([{ name: text, score: props.route.params.score }]));
                      return;
                    }
                    AsyncStorage.setItem('scores', JSON.stringify([...JSON.parse(data), { name: text, score: props.route.params.score }]));
                  }).catch(error => {
                    console.error(error);
                  });
                  props.dispatch(addScore(text, props.route.params.score))
                  setModalOpen(false)
                } else {
                  alert("Please enter your name");
                }
              }}
            ></Button>
          </View>
        </View>
      </Modal>
      <View style={{
        backgroundColor: 'gray',
        display: 'flex',
        height: '100%'
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          textDecorationLine: 'underline',
          fontStyle: 'italic',
          margin: 20,
          paddingBottom: 10,
          color: 'black'
        }}>Top 10 Results</Text>
        {props.scores.sort((a, b) => b.score - a.score).slice(0, 10).map((t, index) =>
          <Text style={{
            padding: 10,
            fontSize: 19,
            fontWeight: 'bold',
            color: 'white',
            textDecorationLine: 'underline'
          }} key={index}>{index + 1}. {t.name}  | Score: {t.score}</Text>
        )}
      </View>
    </View>
  )
}


const mapStateToProps = (state, props) => {
  return {
    ...state
  };
};
// store.dispatch(computerUpdateColor());

export default connect(mapStateToProps)(ScoreBoard);
