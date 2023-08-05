import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { projectDatabase } from '../firebase/config';

import './RecipeList.css';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';

export default function RecipeList({ recipes: data }) {
  const { mode, color } = useContext(ThemeContext);

  if (data.length === 0) {
    return <p className="error">No recipe to load</p>;
  }

  const handleClick = async function (id) {
    await deleteDoc(doc(projectDatabase, 'recipies', id));
  };

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
          <DeleteIcon
            className="delete-icon"
            onClick={() => handleClick(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
