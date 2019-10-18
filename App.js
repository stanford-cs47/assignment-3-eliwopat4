/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2019
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
  }

  searchAPI = (articleName) => {
    this.loadArticles(articleName)
  }

  componentDidMount() {
    this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    this.setState({loading: false, articles: resultArticles})
  }

  getContent = () => {
    const {articles, loading} = this.state;
    let contentDisplay = null
    if(loading) {
      contentDisplay = <ActivityIndicator
                          style={styles.activityindicator}
                          size='large' color='black' />
    } else {
      contentDisplay = <News {...this.state}/>
    }

    return contentDisplay
  }

  render() {
    const {articles, loading} = this.state;

    return (
      <SafeAreaView style={styles.container}>

        <Image style={styles.logo} source={require('/Users/elijahwopat/Desktop/cs47/assignment-3-eliwopat4/App/Images/nyt.png')} />
       
        { <Search {...this.state} searchAPI = {this.searchAPI} /> }
        
        { this.getContent() }

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: '90%',
    height: 70,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
