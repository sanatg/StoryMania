import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config';
//copyright sanat gupta



export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : '',
    }
  }

  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots

              allStories.push(doc.data())
          })
          this.setState({allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allStories.filter((item)=> {
      //applying filter for the inserted text in search bar
      const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <ScrollView>
        <View style ={styles.container}>
          <Header
centerComponent = {{text:'Story Mania',style:{color:'#ffffff',fontSize:30,fontWeight:'bold',marginTop:-10}}}/>
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>


          <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (

                  <View style={styles.itemContainer}>

                    <Text>Title: {item.Title}</Text>
                    <Text>Author : {item.Author}</Text>
                    <Text>Body : {item.Body}</Text>

                  </View>

                )}
                keyExtractor={(item, index) => index.toString()}
                />


        </View>
         </ScrollView>
      );
    }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemContainer: {
    width:'100%',
    borderWidth: 2,
    justifyContent:'center',
    alignSelf: 'center',
    marginTop:10,
    padding:10
  }
});
