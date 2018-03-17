import React from 'react'
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


import firebase from 'react-native-firebase'

export default class App extends React.Component {
  constructor () {
    super()
    this.cheersRef = firebase.database().ref('cheers')
    this.cheers = []
    this.state = {
      isChoosingTeam: true
    }
  }

  componentDidMount () {
    this.listenForCheers(this.cheersRef)
  }

  listenForCheers (cheersRef) {
    cheersRef.on('value', (dbSnapshot) => {
      const cheers = []

      dbSnapshot.forEach((cheer) => {
        this.cheers.push({
          value: cheer.val()
        })
      })

      this.setState({
        cheers: cheers
      })
    }, (errorObj) => {
      console.log(`Error occured for ${errorObj.code}`)
    })
  }

  _onSelectTeam () {
    this.setState({
      isChoosingTeam: false,
      myTeam: 'toronto-blue-jays',
      myTeamName: 'Blue Jays',
      myTeamLogo: './assets/toronto-blue-jays.png'

    })
  }

  render () {
    if (this.state.isChoosingTeam) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Who Are You Cheering For?</Text>
          <View style={styles.teamImageContainer}>
            <TouchableOpacity onPress={this._onSelectTeam.bind(this)}>
              <Image style={styles.teamImage} source={require('./assets/toronto-blue-jays.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this._onSelectTeam.bind(this)}>
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
            <Image style={styles.headerLogo} source={require('./assets/toronto-blue-jays.png')} />
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          { this.cheers.forEach((cheer) => {
              const cheerText = cheer.value
              return (
                <Text>
                  { cheerText }
                </Text>
              )
            })
          }
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
    backgroundColor: '#F5FCFF'
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
