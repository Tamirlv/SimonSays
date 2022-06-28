import React from 'react';
import { Button, View } from 'react-native';


const Start = (props) => {
  return (
    <View style={{
      padding: 10,
      width: '65%',
      display: 'flex',
      alignSelf: 'center',
      marginBottom: 100,
    }}>
      <Button
        onPress={props.onStartGame}
        title={props.val}
        disabled={props.dis}
      />
    </View>
  );
}

export default Start;