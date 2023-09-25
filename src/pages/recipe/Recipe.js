// import { useFetch } from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { projectDatabase } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

import { ReactComponent as EditIcon } from '../../assets/edit.svg';

// styles
import './Recipe.css';

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useContext(ThemeContext);

  const navigate = useNavigate();
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
    <>
      {isPending && (
        <div className="pending-overlay">
          <p className="loading">Loading</p>
          <div className="loader"> </div>
        </div>
      )}

      {!isPending && (
        <div className={`recipe ${mode}`}>
          {error && <p className="error">{error}</p>}

          {recipe && (
            <div>
              <h2 className={`page-title page-title--${mode}`}>
                {recipe.title}
              </h2>
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
          <EditIcon
            className="edit-icon"
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          />
        </div>
      )}
    </>
  );
}
