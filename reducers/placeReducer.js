// placeReducer.js

import { ADD_PLACE, REMOVE_PLACE } from '../SimonActions/types';

const initialState = {
    placeName: '',
    places: []
};

const placeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    value: action.payload
                })
            };
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    value: action.payload
                })
            };
        default:
            return state;
    }
}

export default placeReducer;