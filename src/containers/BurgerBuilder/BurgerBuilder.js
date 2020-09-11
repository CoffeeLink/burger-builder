import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get('ingredients.json')
      .then((resp) => {
        this.setState({ ingredients: resp.data })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  updateParchaseState = (updatedIngredients, newPrice) => {
    const ingredients = { ...updatedIngredients };

    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
      purchasable: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.updateParchaseState(updatedIngredients, newPrice);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.updateParchaseState(updatedIngredients, newPrice);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
    this.setState({ loading: true })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'idang cok',
        address: {
          street: 'jancok jalan',
          zipCode: '89899',
          country: 'new normal'
        },
        email: 'idang@ngentot.com'
      },
      deliveryMethod: 'dukun express'
    }
    axios.post('order', order)
      .then((response) => {
        this.setState({ 
          purchasing: false,
          loading: false
        })
        console.log(response)
      })
      .catch((error) => {
        this.setState({
          purchasing: false,
          loading: false,
        });
      })
  }

  render() {
    let disabledInfo = {}
    for (let key in this.state.ingredients) {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    }

    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
