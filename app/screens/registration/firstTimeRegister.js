import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native'
import * as Animatable from 'react-native-animatable'
import AppTextInput from '../misc/AppTextInput'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {auth} from '../firebase/firebase'
import firebase from 'firebase'
import { fetchUser } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(4).max(15),
    zipcode: Yup.string().required().test(
        "onlyNumbers",
        "zipcode must be a number",
        (value) =>
        /^[0-9]*$/.test(value === undefined ? '' : value.toString())
      ).min(5).max(5)
    })

export default function firstTimeRegister({navigation}) {
    const dispatch = useDispatch()
    const[image,setImage] = useState(null)

    useEffect(() => {
        doesShit()
       async function doesShit() {
            const{status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted')
            {
                alert('Settings')
            }
       }
    },[])
    const PickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        })
        if (!result.cancelled)
        {
            setImage(result.uri)
            const profilePictureUID = result.uri
        firebase.firestore().collection("users").doc(auth.currentUser.uid).update({
            profilePictureUID
        })
        }
    }
    
    const handleProfile = async values =>{
        const username = values.username
        const zipCode = values.zipcode
     firebase.firestore().collection("users").doc(auth.currentUser.uid).update( {
   username,
   zipCode,
    })
    dispatch(fetchUser())
    navigation.navigate("mainScreen")
}
    return (
<View style = {{alignItems: 'center',flex: 1,backgroundColor: "#ffff00"}}>
    <View style = {{width : "100%",height : 180, alignItems: "center",justifyContent: 'center', fontWeight : 30,flex: 1}}>
        <Animatable.Image
            animation = "bounce"
            style ={styles.logo}
            source = {require("../../assets/logo1.png")}
        />
        <Text style = {{padding: 20, fontStyle: 'italic',fontSize: 30, bottom: 55, fontWeight: 'bold'}}>
            Set Up your Profile
        </Text>
    </View>
    <View style = {{flex: 3, backgroundColor: "#fff",borderTopLeftRadius: 30, borderTopRightRadius: 30, width: '100%', paddingVertical: 50}}>
            <TouchableOpacity
            style = {{
                alignItems: 'center',
                width: 170,
                height: 170,
                backgroundColor: "#d3d3d3",
                alignItems:"center",
                borderRadius: 100,
                left: 120,
              }}
              onPress = {PickImage}
              >
            <Image source = {require('../../assets/pic.png')} style = {{top: 20,height: 120, width: 120,resizeMode:'contain'}}></Image>
            {image && <Image source = {{uri:image}} style = {{
                alignItems: 'center',
                width: 170,
                height: 170,
                backgroundColor: "#d3d3d3",
                alignItems:"center",
                borderRadius: 100,
                bottom: 120
                  }}/>}
            </TouchableOpacity>
        <Formik
                initialValues = {{username: '',zipcode:''}}
                validationSchema = {validationSchema}
                onSubmit = { values => {handleProfile(values)}}>
                {({errors,handleChange,handleSubmit,values,setFieldTouched,touched}) => (
                <>
            <AppTextInput placeholder = "Your Name"
                style = {{borderBottomWidth : 1.0, width: '75%',fontSize: 30, margin: 80}}
                value = {values.username}
                onBlur = {() => setFieldTouched("username")}
                onChangeText  = {handleChange("username")}
            />
                { touched.username && <Text style = {{color : 'red', bottom: 70, left: 30}} >{errors.username} </Text>}
            <AppTextInput placeholder = "Your ZipCode"
                style = {{borderBottomWidth : 1.0, width: '75%',fontSize: 30}}
                value = {values.zipcode}
                onBlur = {() => setFieldTouched("zipcode")}
                onChangeText = {handleChange("zipcode")}
            />
                {touched.zipcode && <Text style = {{color : 'red', top: 10,left: 30}} >{errors.zipcode} </Text>}
            <TouchableOpacity
                style = {styles.registerButton} activeOpacity={.4} onPress = {handleSubmit}>
                     <Text style = {styles.text}>
                         Submit
                     </Text>
            </TouchableOpacity>
                </>
                )}
        </Formik>
    </View>
</View>
    )
}

const styles = StyleSheet.create({
    registerButton:{
        width:"100%",
        height: 90,
        backgroundColor: "#00bfff",
        alignItems:"center",
        top: 610,
        position: 'absolute'
    },
    text:{
        color: '#fff',
        fontSize: 40,
        fontStyle: "italic",
        top: 15
    },
        logo:{
        width: 70,
        height: 70,
        alignItems: 'center',
        resizeMode: 'contain',
        top: 90
    },
})
