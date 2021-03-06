import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
	let transformedIngredients =  Object.keys(props.ingredients)
		.map((ingredient) => {
			return [...Array(props.ingredients[ingredient])].map((_, index) => {
				return <BurgerIngredient key={ingredient + index} type={ingredient} />;
			})
		})
		.reduce((arr, el) => {
			return arr.concat(el)
		})

	if (transformedIngredients <= 0) {
		transformedIngredients = <p>You must start adding ingredients!</p>
	}

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      { transformedIngredients }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger