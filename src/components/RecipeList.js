import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

import './RecipeList.css';

export default function RecipeList({ recipes: data }) {
  const { mode, color } = useContext(ThemeContext);

  if (data.length === 0) {
    return <p className="error">No recipe to load</p>;
  }

  return (
    <div className="recipe-list">
      {data.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`} style={{ background: color }}>
            Cook this
          </Link>
        </div>
      ))}
    </div>
  );
}
