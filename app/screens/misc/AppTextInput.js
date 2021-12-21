import React from 'react'
import { StyleSheet, Text, View , TextInput} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import * as Yup from 'yup'
import {Fromik} from 'formik'

export default function AppTextInput({...otherProps}) {
    return (
        <View style = {{alignItems: 'center'}}>
            <TextInput style = {styles.container}{...otherProps}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        borderRadius: 25,
        top : 30,
        width: '75%',
        padding: 20,
        marginVertical: 20,
        },
    icons:{
        top:50,
    }
})
