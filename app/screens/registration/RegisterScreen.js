import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image, Alert} from 'react-native'
import AppTextInput from '../misc/AppTextInput'
import { auth } from "../firebase/firebase"
import * as Yup from 'yup'
import 'firebase/auth';
import {Formik} from 'formik'
import firebase from 'firebase'
import defaultImage from '../../assets/default.jpg'
const defaultImageUri = Image.resolveAssetSource(defaultImage).uri

 const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
    })

export default function RegisterScreen({navigation}) {

    const handleSignUp = async values =>{
        let email = values.email
        auth.createUserWithEmailAndPassword(values.email,values.password).then(userCredentials => {
            const user  = userCredentials.user;
          firebase.firestore().collection("users").doc(auth.currentUser.uid).set({
                email,
                profilePictureUID: defaultImageUri,
                username: null,
                zipCode: null,
                group: null,
                address: null,
            })
            navigation.navigate("firstTimeRegister")
        }
    )
        .catch(error => Alert.alert("Good Try",error.message))
    }
    
    return (
<View style = {{top : 100}}>
    <Formik 
            initialValues ={{email: '',password: ''}}
            validationSchema = {validationSchema}
            onSubmit = { values => {handleSignUp(values)}}>
                {({errors,handleChange,handleSubmit,values,setFieldTouched,touched}) => (
                <>
        <View style = {{alignItems: 'center'}}>
            <Text style = {{fontStyle: 'italic', fontSize: 30, top: 30}}>
                Register
            </Text>
        </View>
    <AppTextInput 
        placeholder = "Email"
        value = {values.email}
        onBlur = {() => setFieldTouched("email")}
        onChangeText  = {handleChange("email")}
    />
       {touched.email && <Text style = {{color : 'red',top: 20, left: 50}} >{errors.email} </Text>}
    <AppTextInput placeholder = "Enter Your Password" 
        value = {values.password}
        onBlur = {() => setFieldTouched("password")}
        onChangeText  = {handleChange("password")}
        secureTextEntry
    />
       { touched.password && <Text style = {{color : 'red',top: 20, left: 50}} >{errors.password} </Text>}
    <View style = {{alignItems: 'center'}}>
       <TouchableOpacity style = {styles.registerButton} onPress = {handleSubmit}>
            <Text style = {styles.text}>
                 Register
            </Text>
        </TouchableOpacity>
    </View>
    </>
        )}
    </Formik>
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
registerButton:{
    width:"65%",
    height: 60,
    backgroundColor: "#a9a9a9",
    alignItems:"center",
    padding: 20,
    marginVertical: 20,
    top: 70,
    borderRadius: 40,
},
text:{
    color: '#fff',
    fontSize: 30,
    fontStyle: "italic",
    top: 10,
    position: 'absolute'
},
})