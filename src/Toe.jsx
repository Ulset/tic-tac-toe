import React from 'react'

const Toe = (props) => {
    return (
        <div className={props.clicked ? "toe clicked" : "toe"} onClick={props.clickHandler}>

        </div>
    )
}

export default Toe