import { ActionSheetIOS } from "react-native";
import { combineReducers } from 'redux';
import Sound from 'react-native-sound';

const defaultState = {
    gameObjects: [
        { color: 'green', index: 0, sound: new Sound('od.mp3', Sound.MAIN_BUNDLE), blinking: false },
        { color: 'red', index: 1, sound: new Sound('re.mp3', Sound.MAIN_BUNDLE), blinking: false },
        { color: 'yellow', index: 2, sound: new Sound('mi.mp3', Sound.MAIN_BUNDLE), blinking: false },
        { color: 'blue', index: 3, sound: new Sound('fa.mp3', Sound.MAIN_BUNDLE), blinking: false }
    ],
    computerColors: [],
    currentIndex: 0,
    scores: []
};
const colorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_BLINKING':
            return {
                ...state,
                gameObjects: state.gameObjects.map(obj => {
                    if (obj.index === action.payload.index)
                        return { ...obj, blinking: action.payload.blinking };
                    return obj;
                })
            }
        case 'ADD_SCORE':
            return {
                ...state,
                scores: [...state.scores, { name: action.payload.name, score: action.payload.score }]
            }
        case 'SET_SCORES':
            return {
                ...state,
                scores: action.payload.scores
            }
        case 'UPDATE_COLOR':
            const updateGameObjects = gameObjects.map(t => {
                if (t.index === action.payload.index)
                    return { ...t, color: action.payload.color };
                return t;
            })
            return {
                ...state,
                gameObjects: updateGameObjects
            }

        default:
            return state;
    }
}

export default colorReducer;