import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./../RecipeCard/RecipeCard";
import "./Home.css";
import store, { DELETE_RECIPE } from './../../store'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: store.getState().recipes
    };
  }

  deleteRecipe = id => {
    store.dispatch({
      type:DELETE_RECIPE,
      payload: id
    })
  }

  componentDidMount = () => {
    store.subscribe(() => {
      this.setState({recipes: store.getState().recipes})
    })
  }


  render() {
    const recipes = this.state.recipes.map((recipe, i) => {
      return (
        <RecipeCard
          key={i}
          recipe_id={i}
          name={recipe.name}
          category={recipe.category}
          authorFirst={recipe.authorFirst}
          authorLast={recipe.authorLast}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
          deleteRecipe={this.deleteRecipe}
        />
      );
    });
    return (
      <div className="Home">
        <Link to="/add/name">
          <button>Create New Recipe</button>
        </Link>
        <div className="card_container">{recipes}</div>
      </div>
    );
  }
}

export default Home;
