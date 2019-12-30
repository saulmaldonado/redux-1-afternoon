import React, { Component } from "react";
import { Link } from "react-router-dom";
import store, { ADD_INGREDIENT } from './../../store'

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: store.getState().ingredients,
      input: ""
    };
  }

  componentDidMount(){
    store.subscribe(() => {
      this.setState({
        ingredients: store.getState().ingredients
      })
    })
  }

  handleChange(val) {
    this.setState({
      input: val
    });
  }
  addIngredient() {
    store.dispatch({
      type:ADD_INGREDIENT,
      payload: this.state.input
    })
    this.setState({
      input: ""
    });
  }
  render() {
    const ingredients = this.state.ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
    return (
      <div className="List forms">
        <h2>Ingredients:</h2>
        <div className="form_items_container">
          <ul className='list'>{ingredients}</ul>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button
            className="add_button"
            onClick={() => this.addIngredient()}
          >
            Add Ingredient
          </button>
        </div>
        <Link to="/add/author">
          <button className="left_button">Previous</button>
        </Link>
        <Link to="/add/instructions">
          <button className="right_button">Next</button>
        </Link>
      </div>
    );
  }
}

export default Ingredients;
