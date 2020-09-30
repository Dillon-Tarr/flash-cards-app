import './App.css'
import React, { Component } from 'react'
import axios from 'axios'
import CollectionButton from './components/CollectionButton/CollectionButton';

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
      <div id="app">
        <div id="main-content">
          <h1 id="main-content-title">{this.state.mainContentTitle}</h1>
          <div id="main-content-buttons" className="flex-container">
            {this.renderCollectionButtons()}
          </div>
        </div>
        <div id="my-collections">

        </div>
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

  renderCollectionButtons(){
    let allCollections = this.state.allCollections;
    let buttons = [];
    for(let i = 0; i < allCollections.length; i++){
      let collectionTitle = allCollections[i].title;
      let collectionLength = allCollections[i].cards.length;
      console.log(collectionLength);
      buttons.push(this.renderCollectionButton(collectionTitle, collectionLength, i));
    }
    return buttons;
  }

  renderCollectionButton(collectionTitle, collectionLength, i){
    return <CollectionButton key={`collection-button${i + 1}`} collectionTitle={collectionTitle} numberOfCards={collectionLength}/>
  }

}
