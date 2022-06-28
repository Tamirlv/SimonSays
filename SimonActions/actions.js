//Computer update color.

export const computerUpdateColor = (color) => ({
    type: 'COMPUTER_COLOR',
    payload: color
});


export const validateUserClick = (color) => ({
    type: 'VALIDATE_USER_CLICK',
    payload: color
});

//User update color.

export const clickedColors = () => ({
    type: 'USER_COLOR',
    payload: {}
});

export const incrementIndex = () => ({
    type: 'INCREMENT_INDEX'        
});

export const resetGame = () => ({
    type: 'RESET_GAME'
})

export const turnOverAction = (color) => ({
    type: 'TURN_OVER',
    payload: color
})

export const setBlinking = (index, blinking) => ({
    type: 'SET_BLINKING',
    payload: { index, blinking }
})


export const addScore = (name, score) => ({
    type: 'ADD_SCORE',
    payload: { name, score }
})

export const setScores = (scores) => ({
    type: 'SET_SCORES',
    payload: { scores }
})

export const resetIndex = () => ({
    type: 'RESET_INDEX'
});

export const updateColor = (index, color) => ({
    type: 'UPDATE_COLOR',
    payload: { index, color }
});

export const resetColors = () => ({
    type: 'RESET_COLORS'
});

export const newGame = (color) => ({
    type: 'NEW_GAME',
    payload: color
});



