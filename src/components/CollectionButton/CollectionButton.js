import React from 'react'

export default function CollectionButton(props) {
  return (
    <button>
      <div className="collection-container-main">
        <div className="card card-main-back"></div>
        <div className="card card-main-middle"></div>
        <div className="card card-main-front">
          <p>{props.collectionTitle}</p>
        </div>
      </div>
    </button>
  )
}
