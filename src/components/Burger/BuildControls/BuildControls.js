import React from 'react'

import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
	{ label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => {
	const renderBuildControl = controls.map((control) => {
		return (
			<BuildControl
				disabled={ props.disabled[control.type] }
				key={ control.label }
				label={ control.label }
				added={ () => props.ingredientAdded(control.type) }
				removed={ () => props.ingredientRemoved(control.type) }
			/>
			)
	})

	return (
		<div className={ classes.BuildControls }>
			<p>Current Price: <strong>${ props.price.toFixed(2) }</strong></p>
			{ renderBuildControl }
			<button
				className={ classes.OrderButton }
				disabled={ !props.purchasable }
				onClick={ props.ordered }
			>
				ORDER NOW
			</button>
		</div>
	)
}

export default buildControls