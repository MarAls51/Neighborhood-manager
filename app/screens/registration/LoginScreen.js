import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Alert} from 'react-native'
import AppTextInput from '../misc/AppTextInput'
import { auth } from "../firebase/firebase"
import * as Yup from 'yup'
import 'firebase/auth';
import {Formik} from 'formik'
import { fetchUser } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
    })

export default function LoginScreen ({navigation})  {
    const dispatch = useDispatch()
    const handleLogin = async values => {
       auth.signInWithEmailAndPassword(values.email,values.password).
        then(userCredentials => {
        userCredentials.user
        dispatch(fetchUser())
        navigation.navigate("mainScreen")
        })
        .catch(error => {Alert.alert("Good Try",error.message)
        })
    }
    return (
<View style = {{top : 100}}>
    <Formik 
        initialValues = {{email: '', password: ''}}
        onSubmit = {values =>{handleLogin(values)}}
        validationSchema = {validationSchema}>
        {({errors,handleChange,handleSubmit,values,setFieldTouched,touched})=> (
    <>
        <View style = {{alignItems: 'center'}}>
            <Text style = {{fontStyle: 'italic', fontSize: 30, top: 30}}>Login</Text>
            </View>
    <AppTextInput 
        placeholder = "Email"
        onBlur = {() => setFieldTouched("email")}
        onChangeText  = {handleChange("email")}
        value = {values.email}
    />
          {touched.email  && <Text style = {{color : 'red',top: 20, left: 50}} >{errors.email} </Text>}
    <AppTextInput placeholder = "Password" 
        textContentType = "password"
        onBlur = {() => setFieldTouched("password")}
        onChangeText  = {handleChange("password")}
        value = {values.password}
        secureTextEntry
    />
          { touched.password && <Text style = {{color : 'red',top: 20, left: 50}} >{errors.password} </Text>}
         <View style = {{alignItems: 'center'}}>
            <TouchableOpacity style = {styles.registerButton} activeOpacity={.7} underlayColor = {"#ffff00"} onPress = {handleSubmit}>
                <Text style = {styles.text}>
                    Login
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
registerButton:{
    width:"65%",
    height: 60,
    backgroundColor: "#a9a9a9",
    alignItems:"center",
    padding: 20,
    marginVertical: 20,
    top: 100,
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

