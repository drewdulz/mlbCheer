import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, Animated } from 'react-native';

class CheerAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      currentText: '',
      cheerData: [],
      //   {
      //     text: 'Lets',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: 'Go',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: 'Blue',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: 'Jays',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: '👏🏼',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: '👏🏼👏🏼',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: '👏🏼👏🏼👏🏼',
      //     time: 500,
      //     animation: 'pop'
      //   },
      //   {
      //     text: '👏🏼👏🏼👏🏼👏🏼',
      //     time: 250,
      //     animation: 'pop'
      //   },
      //   {
      //     text: '👏🏼👏🏼👏🏼👏🏼👏🏼',
      //     time: 250,
      //     animation: 'pop'
      //   },
      // ]
    }
  }

  index = 0;

  animate = () => {
    console.log('cheerDa:',this.props.cheerData);
    setTimeout(() => {
      this.setState({
        currentText: this.props.cheerData[this.index].text,
      });
      this.index++;
      if (this.index < this.props.cheerData.length) {
        this.animate();
      } else {
        this.index = 0;
        this.animate();
      }
    }, this.props.cheerData[this.index].time)
  }

  componentDidMount() {
    if (this.props.cheerData.length > 0) {
      this.animate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cheerData.length > 0) {
      this.setState({ cheerData: nextProps.cheerData }, () => { this.animate(); });
      console.log('nextProps: ', nextProps.cheerData);
      // this.animate();
    }
  }


  render() {
    let { currentOpacity } = this.state;

    return (
      <View style={styles.fullScreenText}>
        <Text style={{fontSize:70, color:'white', marginTop: -150}}>{this.state.currentText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreenText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#134A8E'
  },
  textStyle: {
    marginTop: -50,
    fontSize: 55,

  },
})

export default CheerAnimation;
