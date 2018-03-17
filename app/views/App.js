import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native';

import firebase from 'react-native-firebase';


export default class App extends React.Component {
  constructor() {
    super();
    this.cheersRef = firebase.database().ref('cheers');
    this.cheers = [];
  }

  componentDidMount() {
    this.listenForCheers(this.cheersRef);
  }

  listenForCheers(cheersRef) {
    cheersRef.on('value', (dbSnapshot) => {
      const cheers = [];

      dbSnapshot.forEach((cheer) => {
        this.cheers.push({
          value: cheer.val(),
        })
      });

      this.setState({
        cheers: cheers,
      });
    }, (errorObj) => {
      console.log(`Error occured for ${errorObj.code}`);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.cheers.forEach((cheer) => {
            const cheerText = cheer.value;

            return (
              <Text>
                { cheerText }
              </Text>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
