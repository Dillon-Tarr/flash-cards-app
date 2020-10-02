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
        <div id="main-content">
          <h1 id="main-content-title">{this.getTitle()}</h1>
          {this.getMainContent()}
        </div>

        <div id="my-collections">

        </div>
      </div>
    )
  }

  getTitle = () => {
    let title;
    if(this.state.activeCollection === null){
      title = 'My Collections';
    }
    else if(typeof this.state.activeCollection == 'object'){
      title = this.state.activeCollection.title;
    }
    return title;
  }

  getMainContent = () => {
    let content;
    if(this.state.activeCollection === null){
      content = (
        <div id="all-collections" className="flex-container">
          {this.renderCollectionButtons()}
        </div>
      );
    }
    else if(typeof this.state.activeCollection == 'object'){
      content = (
        <div id="active-collection">
          <ActiveCollection
          cards={this.state.activeCollection.cards}
          />
        </div>
      );
    }
    else{
      content = (<h1>ya dun messed up</h1>);
    }
    return content;
  }

  renderCollectionButtons = () => {
    let buttons = [];
    for(let i = 0; i < this.state.allCollections.length; i++){
      buttons.push(this.renderCollectionButton(i));
    }
    return buttons;
  }

  renderCollectionButton = (i) => {
    return <CollectionButton
    key={`collection-button-index${i}`}
    collection={this.state.allCollections[i]}
    setActiveCollection={this.setActiveCollection}/>
  }

  setActiveCollection = (_id) => {
    let collection = this.state.allCollections.filter((el) => {
      return _id === el._id;
    });
    collection = collection[0];
    console.log(`setActiveCollection() ran with _id as: ${_id}`);
    this.setState({
      activeCollection: collection
    });
  }

  // `5f726d81879a6422645f5609`
  
}
