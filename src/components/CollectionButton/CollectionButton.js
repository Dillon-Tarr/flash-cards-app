import React from 'react'

export default function CollectionButton(props) {
  let collection = props.collection;
  return (
    <button onClick={() => {props.setActiveCollection(collection._id)}}>
      <div className="collection-container-main">
        <div className="card card-main-back"></div>
        <div className="card card-main-middle"></div>
        <div className="card card-main-front">
          <p>{collection.title}<br/>
          ({collection.cards.length})</p>
        </div>
      </div>
    </button>
  )
}
