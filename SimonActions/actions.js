
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



