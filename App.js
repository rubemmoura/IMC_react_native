import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  View,
  TextInput,
  Image
} from 'react-native'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      altura: 0,
      massa: 0,
      result: 0,
      resultText: "",
      ButtonStateHolder: false,
      show: false
    }
  }

  onPress = () => {
    let imc = this.state.massa / (this.state.altura * this.state.altura);
    let obesidadeLevel = "";

    if (imc < 16) {
      obesidadeLevel = "Magreza grave";
    } else if (imc < 17) {
      obesidadeLevel = "Magreza moderada";
    } else if (imc < 18.5) {
      obesidadeLevel = "Magreza leve";
    } else if (imc < 25) {
      obesidadeLevel = "Saudável";
    } else if (imc < 30) {
      obesidadeLevel = "Sobrepeso";
    } else if (imc < 35) {
      obesidadeLevel = "Obesidade grau I";
    } else if (imc < 40) {
      obesidadeLevel = "Obesidade grau II (severa)";
    } else {
      obesidadeLevel = "Obesidade grau III (mórbida)";
    }

    this.setState({
      result: imc,
      resultText: obesidadeLevel,
      show: true
    })
  }

  validateImc = () => {
    let result = false;
    console.log(this.state.massa)
    console.log(this.state.altura)

    if (this.state.altura && this.state.massa) {
      result = true;
    }

    this.setState({
      ButtonStateHolder: result
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: 170, height: 170, alignSelf: 'center', marginTop: 20 }} >
          <Image style={{ flex: 1, width: undefined, height: undefined }}
            source={{ uri: 'https://image.winudf.com/v2/image1/Y29tLnBhbmRhbm9zLmNhbGN1bGFkb3JhaW1jX2ljb25fMTU0NzE4ODk1OF8wMTc/icon.png?w=170&fakeurl=1' }}
          />
        </View>

        <View style={{ marginTop: 50 }}>
          <TextInput
            placeholder="Informe sua massa"
            keyboardType="numeric" style={styles.input}
            onChangeText={(massa) => { this.setState({ massa }) }}
          />
          <TextInput placeholder="Informe sua altura" keyboardType="numeric" style={styles.input} onChangeText={(altura) => { this.setState({ altura }) }} />
        </View>

        <TouchableOpacity style={styles.button} onPress={this.onPress} disabled={!Boolean(this.state.altura && this.state.massa)}>
          <Text>Calcular IMC</Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          {
            this.state.show ?
              < View>
                <Text style={[styles.result, {}]}>
                  O seu IMC é: {this.state.result.toFixed(2)}
                </Text>
                <Text style={styles.result}>
                  O nível de obesidade é: {this.state.resultText}
                </Text>
              </View> : null
          }
        </View>

      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold"
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  },
  result: {
    textAlign: 'center',
    fontSize: 20
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
})

export default App;