import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Alert,ToastAndroid} from 'react-native';
import Constants from 'expo-constants';
import {Header} from 'react-native-elements';
import db from '../config';
export default class WriteStoryScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      titlestory:'',
      authorstory:'',
      writestory:'',
    }

  }

  SubmitStory = async()=>{
    db.collection('stories').add({
'Title':this.state.titlestory,
'Author':this.state.authorstory,
'Body':this.state.writestory,
})
      //  ToastAndroid.show("Story Published", ToastAndroid.SHORT);
        Alert.alert("Story Uploaded")

  }
  ClearStoryData = async()=>{
    this.setState({
     titlestory:'',
      authorstory:'',
      writestory:''
      })
  }
  render(){
    return(
      <KeyboardAvoidingView style = {styles.container}behavior = "padding"enabled>
        <ScrollView>
          <Header
centerComponent = {{text:'Story Mania',style:{color:'#ffffff',fontSize:30,fontWeight:'bold',marginTop:-10}}}/>
         <TextInput placeholder = "Write Your Story Title"
         style = {styles.InputboxStyle1}
           onChangeText = {(text) =>{
  this.setState({
    titlestory:text
  })

}}
value = {this.state.titlestory}
/>
         <TextInput placeholder = "Write Your Name Here"
         style = {styles.InputboxStyle2}
           onChangeText = {(text) =>{
  this.setState({
    authorstory:text
  })

}}
value = {this.state.authorstory}
/>
          <TextInput
     placeholder = "Weave Your Story Here"
    style = {styles.InputboxStyle3}
     multiline
      onChangeText = {(text) =>{
  this.setState({
    writestory:text
  })

}}
value = {this.state.writestory}
      />
      <View style = {{flex:1,
      flexDirection:"collumn"
      }}>
      <TouchableOpacity style = {{
       alignSelf:'center',
        marginTop:30,
      borderWidth:2,
      borderRadius:10,
      width:150,
      height:40,
      justifyContent:'center',
      }} onPress = {this.SubmitStory}><Text style = {{textAlign:'center'}}>  Upload  </Text></TouchableOpacity>

          <TouchableOpacity style = {{
      alignSelf:'center',
      borderWidth:2,
      borderRadius:10,
      width:150,
      height:40,
      justifyContent:'center',
      }} onPress = {this.ClearStoryData}><Text style = {{textAlign:'center'}}>  Clear Story </Text></TouchableOpacity>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );

  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    },
  InputboxStyle1: {
    borderWidth:2,
    borderRadius:5,
    justifyContent:'center',
    width:300,
    height:50,
    alignSelf:'center',
    marginTop:30,
  },
    InputboxStyle2: {
    borderWidth:2,
    borderRadius:5,
    justifyContent:'center',
    width:300,
    height:50,
    alignSelf:'center',
    marginTop:30,
  },
   InputboxStyle3: {
    borderWidth:2,
    borderRadius:5,
    justifyContent:'center',
    width:300,
    height:300,
    alignSelf:'center',
    marginTop:40,
  },
})
