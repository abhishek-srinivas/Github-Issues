'use strict'
import React, { Component } from 'react';
import { AppRegistry, ListView, StyleSheet, Image, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1
  },
  text: {
    marginLeft: 12,
    fontSize: 10,
    //width:25
  },
  issueTitle:{
    marginLeft: 12,
    fontSize: 12,
    //width:75
  },
  photo: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    marginLeft:4
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  listView:{
    marginTop:20
  }
});

const Row = (props) => (
  <View style={styles.container}>
  <Text style={styles.text}>
     Issue#: {props.number} ({props.state})
    </Text>
    <Text style={styles.issueTitle}>
      {props.title} 
    </Text>
    <Text style={styles.text}>
      Created By {props.user.login}  
    </Text>    
    <Image source={{ uri: props.user.avatar_url}} style={styles.photo} />
  </View>
);

const Header = (props) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);


class AwesomeProject extends Component {
    constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state={
      dataSource: ds.cloneWithRows([]),
      buttonLabel:'Search'
    };
  }

  onPress= () => {
    var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
    this.setState({buttonLabel:'Loading...'})
    var repoName= this.state.repo || 'ioncache/Tag-Handler';
    var url='https://api.github.com/repos/'+repoName+'/issues';



    fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({dataSource: ds.cloneWithRows(responseData)})
            this.setState({buttonLabel:'Search'})
        })
      .done();
  }

  textChanged= (a) => {
    this.setState({repo:a});
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
      <TextInput
            style={styles.input}
            placeholder="Search for a repo"
            onChangeText={this.textChanged.bind(this)}
          />

      <Button
      title={this.state.buttonLabel}
      onPress={this.onPress.bind(this)}
      />
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row {...data} />}
        />
        </View>
    );
  }
}




AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);