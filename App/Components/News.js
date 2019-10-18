/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2019
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableHighlight, View, FlatList, Text, Linking, Item } from 'react-native'
import { material } from 'react-native-typography'
import { Metrics, Colors } from '../Themes'

export default class News extends Component {
  static defaultProps = { articles: [] }

  static propTypes = {
    articles: PropTypes.array
  }

  _onPress(url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  }

  render () {
    const {articles} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style={styles.article} >
              <TouchableHighlight
                onPress={() => this._onPress(item.url)}>
                <View style={{backgroundColor: 'white'}}>
                  <Text style={material.headline}>{item.title}</Text>
                </View>
              </TouchableHighlight>
              <Text>{item.snippet}</Text>
              <Text style={material.body2} >{item.byline}</Text>
              <Text style={{color: 'gray'}} >{item.date}</Text>
            </View>
          )}
          keyExtractor={item => item.url}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  article: {
    paddingTop: 20,
  }
});
