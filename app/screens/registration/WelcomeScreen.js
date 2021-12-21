import React from 'react'
import { StyleSheet, Text, View,ImageBackground,Image, Dimensions,Buttons, TouchableOpacity, TouchableHighlight, navigation} from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function WelcomeScreen({navigation}) {
    return (
<View style = {styles.container}>
    <View style ={styles.header}>
        <Animatable.Image
            animation = "zoomInDown"
            style ={styles.logo}
                source = {require("../../assets/logo1.png")}
        />
    </View>
        <View>
            <TouchableHighlight style = {styles.loginButton} activeOpacity={1} underlayColor = {"#b22222"} onPress = {() => {navigation.navigate("LoginScreen")}}>
                <Text style = {styles.text}>
                    Sign In
                </Text>
            </TouchableHighlight>
        </View>
    <View>
        <TouchableHighlight
            style = {styles.registerButton} activeOpacity={1} underlayColor = {"#5f9ea0"} onPress = {() => {navigation.navigate("RegisterScreen")}}>
                <Text style = {styles.text}>
                    Register
                </Text>
        </TouchableHighlight>
    </View>
</View> 
    )
}



const {height}= Dimensions.get("screen");
const height_logo = height * .26;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#ffff00",
    },
    header:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton:{
        width: "100%",
        height: 90,
        backgroundColor: "#ff0000",
        alignItems: "center"
    },
    registerButton:{
        width:"100%",
        height: 90,
        backgroundColor: "#00bfff",
        alignItems:"center",
    },
    logo:{
        width: height_logo,
        height: height_logo,
        alignItems: 'center',
        resizeMode: 'contain',
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text:{
    color:'grey',
    marginTop: 5
    },
    button:{
    alignItems: 'flex-end',
    marginTop: 30
    },
    text:{
        color: '#fff',
        fontSize: 40,
        fontStyle: "italic",
        top: 15
    },
    textSign:{
        color: 'white',
        fontWeight: 'bold'
    }
})
