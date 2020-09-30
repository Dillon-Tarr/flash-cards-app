import './App.css'
import React, { Component } from 'react'
import axios from 'axios'
import CollectionButton from './components/CollectionButton/CollectionButton';
import ActiveCollection from './components/ActiveCollection/ActiveCollection';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      allCollections: [],
      activeCollection: null
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
        {this.getMainContent()}
        <div id="my-collections">

        </div>
      </div>
    )
  }

  getMainContent(){
    let title;
    let content;
    if(this.state.activeCollection === null){
      title = 'My Collections';
      content = (
        <div id="main-content">
          <h1 id="main-content-title">{title}</h1>
          <div id="main-content-buttons" className="flex-container">
            {this.renderCollectionButtons()}
          </div>
        </div>
      );
    }
    else if(typeof this.state.activeCollection == 'string'){
      title = this.state.activeCollection.title;
      content = (
        <div id="main-content">
          <h1 id="main-content-title">{title}</h1>
          <div id="active-collection">
            <ActiveCollection />
          </div>
      </div>
      );
    }
    else{
      title = this.state.activeCollection.title;
      content = (<h1>ya dun messed up</h1>);
    }
    return content;
  }

  renderCollectionButtons(){
    let allCollections = this.state.allCollections;
    let buttons = [];
    for(let i = 0; i < allCollections.length; i++){
      let collectionTitle = allCollections[i].title;
      let collectionLength = allCollections[i].cards.length;
      buttons.push(this.renderCollectionButton(collectionTitle, collectionLength, i));
    }
    return buttons;
  }

  renderCollectionButton(collectionTitle, collectionLength, i){
    return <CollectionButton key={`collection-button${i + 1}`} collectionTitle={collectionTitle} numberOfCards={collectionLength}/>
  }

}
