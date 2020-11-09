import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(){
    super()
    this.state={
      email : "",
      password : ""
    }
  }

  showAlert(errorCode){
    switch(errorCode){
      case 'auth/too-many-requests':
        Alert.alert('To many requests Try again later')
        this.setState({
          email:"",
          password : ""
        })
        break
      case 'auth/wrong-password':
        Alert.alert('Enter Correct password')
        this.setState({
          password : ""
        })
        break
      default:
        this.setState({
          email:"",
          password : ""
        })
        return Alert.alert('Invalid email and password')
    }
  }

  render(){
    return(
      <View style={styles.container}>

        <View style={styles.subContainer1}>
          <Text style={styles.title}>Story Mania</Text>
          <Image source = { require("../assets/icon.png")} style={styles.image} />
          <TextInput
              placeholder="example@example.com"

              onChangeText= {(emailText)=>{
                  this.setState({
                      email: emailText
                  })
              }}
              value={this.state.email}
              style={styles.textInput}
              />
          <TextInput
              placeholder="password"

              onChangeText= {(passwordText)=>{
                  this.setState({
                      password: passwordText
                  })
              }}
              value={this.state.password}
              style={styles.textInput}
              secureTextEntry = {true}
              />
        </View>
        <View style={styles.subContainer2}>
          <TouchableOpacity
            style={styles.button}
            onPress = {async()=>{
              var email  = await this.state.email;
              var password = await this.state.password
              firebase.auth().signInWithEmailAndPassword(email, password)
              .then(()=>{
                this.props.navigation.navigate('WriteStory')
              })
              .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return this.showAlert(errorCode)
              })
            }}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
   backgroundColor: '#ecf0f1',
  },
  title:{
    fontWeight:"normal",
    fontSize:43,
    padding:25,
  },
  subContainer1:{
    flex:0.6,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ecf0f1',

  },
  subContainer2:{
    flex:0.4,
    alignItems:'center',
     backgroundColor: '#ecf0f1',
  },
  textInput : {
    width:300,
    height: 50,
    borderWidth:2,
    padding:10,
    marginBottom:10,
    borderRadius:10
  },
  button:{
    width:150,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    borderRadius:10
  },
  buttonText:{

    fontSize:25
  }
})
