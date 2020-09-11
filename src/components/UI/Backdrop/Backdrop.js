import React from 'react'
import classes from './Backdrop.css'

const backdrop = (props) => {
	const renderBackdrop = props.show ? <div className={ classes.Backdrop } onClick={ props.clicked }></div> : null
	return renderBackdrop
}

export default backdrop