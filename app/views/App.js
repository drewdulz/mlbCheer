import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import teamColors from './assets/TeamColours';
import CheerAnimation from '../components/CheerAnimation'
import firebase from 'react-native-firebase';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor () {
    super()
    this.cheersRef = firebase.database().ref('cheers')
    this.state = {
      isChoosingTeam: true,
      cheers: []
    }
  }

  componentDidMount () {
    this.listenForCheers(this.cheersRef)
  }

  listenForCheers (cheersRef) {
    cheersRef.on('value', (dbSnapshot) => {
      const dbCheers = dbSnapshot.val();

      if (dbCheers) {
        const parsedCheers = JSON.parse(dbCheers.cheer);
        this.setState({
          cheers: parsedCheers,
        })
      }
    }, (errorObj) => {
      console.log(`Error occured for ${errorObj.code}`)
    })
  }

  _onSelectTeam (team, teamName) {
    this.setState({
      isChoosingTeam: false,
      myTeam: team,
      myTeamName: teamName,
      myTeamLogo: `app/views/assets/${team}.png`
    })
  }

  render () {
    if (this.state.isChoosingTeam) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Who Are You Cheering For?</Text>
          <View style={styles.teamImageContainer}>
            <TouchableOpacity onPress={() => {this._onSelectTeam('toronto-blue-jays', 'Blue Jays')}}>
              <Image style={styles.teamImage} source={require('./assets/toronto-blue-jays.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {this._onSelectTeam('baltimore-orioles', 'Orioles')}}>
              <Image style={styles.teamImage} source={require('./assets/baltimore-orioles.png')} />
            </TouchableOpacity>
          </View>

        </View>
      )
    } else {

    }
    return (
      <View>
        <Header>
          <Left>
            <Button transparent onPress={() => {this.setState({ isChoosingTeam: true })}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={{flex: 7}}>
            <Image style={styles.headerLogo} source={this.state.myTeamName === 'Blue Jays' ? require('./assets/toronto-blue-jays.png') :  require('./assets/baltimore-orioles.png')} />
          </Body>
          <Right />
        </Header>
        <View style={[styles.cheerContainer, { backgroundColor: teamColors[`${this.state.myTeam}`] }]} >
          <CheerAnimation cheerData={this.state.cheers} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cheerContainer: {
    height: '100%',
  },
  teamImage: {
    width: 200,
    height: 200
  },
  teamImageContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  myTeam: {
    position: 'absolute',
    height: 80,
    width: '100%',
    backgroundColor: 'grey'
  },
  title: {
    fontSize: 24,
    paddingBottom: 12
  },
  headerLogo: {
    width: 40,
    height: 40
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
