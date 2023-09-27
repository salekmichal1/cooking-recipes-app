import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { projectDatabase } from '../../firebase/config';

import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const { mode, color } = useContext(ThemeContext);
  const addIngredientInput = useRef();

  const navigate = useNavigate();
  const queryString = useLocation();
  const locationPath = queryString.pathname.split('/')[1];

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    setIsPending(true);
    if (locationPath === 'edit') {
      const recipeCollection = doc(projectDatabase, 'recipies', id);

      getDoc(recipeCollection).then(doc => {
        const data = doc.data();
        setTitle(data.title);
        setMethod(data.method);
        setCookingTime(Number(data.cookingTime.split(' ')[0]));
        setIngredients(data.ingredients);

        setIsPending(false);
      });
    } else {
      setTitle('');
      setMethod('');
      setCookingTime('');
      setIngredients([]);

      setIsPending(false);
    }
  }, [locationPath, id]);

  // const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  // const handleSubmit = function (e) {
  //   e.preventDefault();
  //   console.log(title, method, cookingTime, ingredients);
  //   postData({
  //     title,
  //     method,
  //     cookingTime: cookingTime + ' minutes',
  //     ingredients,
  //   });
  // };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const postRecipie = {
      title,
      method,
      cookingTime: cookingTime + ' minutes',
      ingredients,
    };

    if (ingredients.length === 0) {
      addIngredientInput.current.focus();
    } else {
      if (locationPath === 'create') {
        try {
          await addDoc(collection(projectDatabase, 'recipies'), postRecipie);
          navigate('/');
        } catch (err) {
          console.error(err);
        }
      } else if (locationPath === 'edit') {
        try {
          const recipeCollection = doc(projectDatabase, 'recipies', id);
          await updateDoc(recipeCollection, postRecipie);
          navigate('/');
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     navigate('/');
  //   }
  // }, [navigate, data]);

  const handleAdd = function (e) {
    e.preventDefault();
    const ingredient = newIngredient.trim();

    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients(prevState => [...prevState, ingredient]);
    }

    setNewIngredient('');
    addIngredientInput.current.focus();
  };

  const handleDelete = function (index) {
    setIngredients([
      ...ingredients.slice(0, index),
      ...ingredients.slice(index + 1, ingredients.length),
    ]);
  };

  return (
    <>
      {isPending && (
        <div className="pending-overlay">
          <p className="loading">Loading</p>
          <div className="loader"> </div>
        </div>
      )}
      {!isPending && (
        <div className={`create ${mode}`}>
          <h2 className={`page-title page-title--${mode}`}>
            {locationPath === 'create'
              ? 'Add new recipe'
              : `Upadte recipe for ${title}`}
          </h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Recipe title:</span>
              <input
                type="text"
                onChange={e => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>
            <label>
              <span>Recipe ingridients:</span>
              <div className="ingredients">
                <input
                  type="text"
                  onChange={e => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  ref={addIngredientInput}
                />
                <button
                  className="btn"
                  style={{ background: color }}
                  onClick={handleAdd}>
                  {locationPath === 'create'
                    ? 'Add ingredient'
                    : 'Upadte ingredient'}
                </button>
              </div>
            </label>
            <p>
              Current ingredients:{' '}
              {ingredients.map((ing, index, arr) => {
                if (index + 1 === arr.length) {
                  return (
                    <em
                      className="ingredient"
                      key={ing}
                      onClick={() => handleDelete(index)}>
                      {ing}.
                    </em>
                  );
                } else {
                  return (
                    <React.Fragment key={ing}>
                      <em
                        className="ingredient"
                        onClick={() => handleDelete(index)}>
                        {ing}
                      </em>
                      {', '}
                    </React.Fragment>
                  );
                }
              })}
            </p>
            {ingredients.length === 0 && (
              <p className="ingredient-alert">
                There must be ingredient in recipe
              </p>
            )}
            {ingredients.length !== 0 && (
              <p className="ingredient-tip">
                Click on ingredient to dalete from list
              </p>
            )}
            <label>
              <span>Recipe method:</span>
              <textarea
                onChange={e => setMethod(e.target.value)}
                value={method}
                required
              />
            </label>
            <label>
              <span>Cooking Time:</span>
              <input
                type="number"
                onChange={e => setCookingTime(e.target.value)}
                value={cookingTime}
                required
              />
            </label>
            <button className="btn" style={{ background: color }}>
              {locationPath === 'create' ? 'Add recipie' : 'Upadte recipie'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
