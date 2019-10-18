/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2019
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, View, Button, TextInput, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Metrics, Colors } from '../Themes'

export default class Search extends Component {

  state = {
    text: '',
  }

	onChangeText = txt => {
    this.setState({text: txt})
  }

  searchAPI = () => {
    this.props.searchAPI(this.state.text)
    this.setState({text: ''})
  }

  render () {
    return (
      <View style={styles.container} > 
         <TextInput
          style={{width: '80%', padding: 10}}
          onChangeText={(txt) => this.onChangeText(txt)} 
          value={this.state.text} 
          placeholder={'Search for News'}
        />
        <TouchableOpacity onPress={() => this.searchAPI()}> 
          <FontAwesome name={'search'} size={ 15 } style={{color: 'orange'}}/> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    height: 40,
    backgroundColor: 'whitesmoke',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
	},
});
