import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;

  const { data: recipe, isPending, error } = useFetch(url);

  const { mode } = useContext(ThemeContext);
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">loading...</p>}
      {recipe && (
        <div>
          <h2 className={`page-title page-title--${mode}`}>{recipe.title}</h2>
          <p>Ingredients: </p>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p>Takes:</p>
          <p>{recipe.cookingTime} to make.</p>
          <p className="method-title">How to prepare:</p>
          <p className="method">{recipe.method}</p>
        </div>
      )}
    </div>
  );
}
