import './App.css'
import React, { Component } from 'react'
import axios from 'axios'
import MainContent from './components/MainContent/MainContent';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      allCollections: [],
      activeCollection: null,
      mainContentTitle: `My Collections`
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/collections')
    .then((response) => {
      console.log(response.data);
      this.setState({
        allCollections: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <MainContent mainContentTitle={this.state.mainContentTitle}/>
      </div>
    )
  }

  setMainContentTitle(){
    let newTitle;
    if(this.state.activeCollection === null){
      newTitle = 'My Collections';
    }
    else{
      newTitle = this.state.activeCollection.title;
    }
    this.setState({
      mainContentTitle: newTitle
    });
  }

}
