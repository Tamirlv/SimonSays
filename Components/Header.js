import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Header = () => {
    return (
        <View>
            <TextInput
                style={{
                    height: 100,
                    borderColor: 'blue',
                    color: 'blue',
                    borderWidth: 1,
                    fontSize: 20,
                    textAlign: 'center',
                    
                }}
                defaultValue="Simon Says"
            />
        </View>
    );
}

export default Header;