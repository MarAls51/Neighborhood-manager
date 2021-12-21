import React from 'react'
import {StyleSheet,Text, View,TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable'
export default function groupNavigator({navigation}) {
    return (
<View style = {{alignItems: 'center',flex: 1,backgroundColor: "#00bfff"}}>
    <View style = {{width : "100%",height : 180, alignItems: "center",justifyContent: 'center', fontWeight : 30,flex: 1}}>
        <Animatable.Image
        animation = "bounce"
        style ={styles.logo}
         source = {require("../../assets/logo1.png")}
         />
        <Text style = {{padding: 20, fontStyle: 'italic',fontSize: 30, bottom: 55, fontWeight: 'bold'}}>Your Community</Text>
    </View>
        <View style = {{flex: 3, backgroundColor: "#fff",borderTopLeftRadius: 30, borderTopRightRadius: 30, width: '100%'}}>
<Animatable.View animation = "zoomIn" style = {{alignItems: "center"}}>
        <TouchableOpacity style = {styles.registerButton} onPress = {() => {navigation.navigate("createGroup")}}>
    <Text style = {styles.text}>
        Create Group
    </Text>
         </TouchableOpacity>
</Animatable.View>
    <Animatable.View animation = "zoomIn" style = {{alignItems: "center"}}>
        <TouchableOpacity style = {styles.registerButton} onPress = {() => {navigation.navigate("loginGroup")}}>
            <Text style = {styles.text}>
                Join Group
            </Text>
        </TouchableOpacity>
    </Animatable.View>
    </View>
</View>
    )
}

const styles= StyleSheet.create({
    logo:{
        width: 70,
        height: 70,
        alignItems: 'center',
        resizeMode: 'contain',
        top: 90
    },registerButton:{
        width:"65%",
        height: 100,
        backgroundColor: "#00bfff",
        alignItems:"center",
        padding: 10,
        marginVertical: 80,
        top: 30,
        borderRadius: 30,
    },
    text:{
        color: '#fff',
        fontSize: 25,
        fontStyle: "italic",
        top: 30,
        position: 'absolute'
    }
})