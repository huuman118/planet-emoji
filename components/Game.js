import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
const originalEmojis = require('../utils/emojis').emojis.slice()
const emojis = originalEmojis.slice()

const initialState = {
  guess: '',
  score: 0,
  emojis: emojis,
  randNum: Math.floor(Math.random() * emojis.length),
  gameMessage: 'Translate the Phrase!',
  youWin: false,
}

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, initialState)
    this.checkGuess = this.checkGuess.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  checkGuess = () => {
    if (!this.state.guess) {
      let randomEncouragement = [
        "Don't be afraid to guess!",
        'Spread your wings and fly',
        'You must type an answer!',
      ]
      this.setState({
        gameMessage:
          randomEncouragement[
            Math.floor(Math.random() * randomEncouragement.length)
          ],
      })
    } else if (
      this.state.guess.replace(/\W/g, '').toLowerCase() ===
      this.state.emojis[this.state.randNum].answer
        .replace(/\W/g, '')
        .toLowerCase()
    ) {
      emojis.splice(this.state.randNum, 1)
      let randNum = Math.floor(Math.random() * emojis.length)
      this.setState({
        score: this.state.score + 10,
        guess: '',
        gameMessage: emojis.length ? 'Nice Job!' : 'You Win!',
        randNum: randNum,
        youWin: !emojis.length,
      })
    } else {
      this.setState({
        guess: '',
        gameMessage: 'Try Again!',
      })
    }
  }

  restartGame = () => {
    emojis = originalEmojis.slice()
    let restartedState = Object.assign({}, initialState)
    restartedState.randNum = Math.floor(Math.random() * emojis.length)
    this.setState(restartedState)
  }

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/globe.png')}
      >
        <View style={styles.container}>
          <Text
            style={{ color: '#FFF', fontSize: 30, margin: 20, marginTop: 60 }}
          >
            {this.state.gameMessage}
          </Text>
          <Text
            style={{ color: '#000', fontSize: 20, margin: 15, marginTop: 50 }}
          >
            SCORE:
            <Text style={{ color: '#33FF55', fontWeight: 'bold' }}>
              {' ' + this.state.score}
            </Text>
          </Text>
          {this.state.emojis[this.state.randNum] ? (
            <View style={styles.gamePlay}>
              <Text style={{ color: '#FFF', fontSize: 25, marginBottom: 10 }}>
                {this.state.emojis[this.state.randNum].question}
              </Text>
              <TextInput
                style={styles.mainText}
                onChangeText={guess => this.setState({ guess })}
                value={this.state.guess}
                placeholder="Guess the Phrase!"
                placeholderTextColor="#FFFFFF"
              />
              <Button
                onPress={this.checkGuess}
                title="Make Guess"
                color="#FFFFFF"
                disabled={this.state.youWin}
              />
            </View>
          ) : null}

          <View style={styles.gameManager}>
            <Button
              color="#FFFFFF"
              style={{ marginTop: 100 }}
              onPress={this.restartGame}
              title="Restart Game"
            >
              Restart Game
            </Button>
            <Button
              color="#FFFFFF"
              style={{ marginTop: 100 }}
              onPress={() => Actions.pop()}
              title="Quit Game"
            >
              Quit Game
            </Button>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(185, 185, 185, .5)',
    alignItems: 'center',
  },
  gamePlay: {
    borderWidth: 2,
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'rgba(100, 100, 100, .6)',
  },
  gameManager: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    marginTop: 100,
    backgroundColor: 'rgba(30, 30, 30, .6)',
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  mainText: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(30, 30, 30, .6)',
  },
})
