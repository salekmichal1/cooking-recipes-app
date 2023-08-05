// import { useFetch } from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { projectDatabase } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useContext(ThemeContext);
  // const url = 'http://localhost:3000/recipes/' + id;

  // const { data: recipe, isPending, error } = useFetch(url);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const recipeCollection = doc(projectDatabase, 'recipies', id);

    getDoc(recipeCollection).then(doc => {
      if (doc.exists()) {
        setIsPending(false);
        setRecipe(doc.data());
      } else {
        setIsPending(false);
        setError('No recipe found');
      }
    });
  }, [id]);

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
