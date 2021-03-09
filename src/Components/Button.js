import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'

const Button = ({ButtonStyle,TextStyle,text,onPress}) => {
    return (
        <TouchableOpacity style={ButtonStyle} onPress={onPress}>
        <Text style={TextStyle}>{text}</Text>
    </TouchableOpacity>
    )
}

export default Button
