import React from 'react'

const Toe = (props) => {
    return (
        <div className="toe" onClick={props.clickHandler} style={{backgroundColor: props.clicked ? props.color : "grey"}}>
        </div>
    )
}

export default Toe