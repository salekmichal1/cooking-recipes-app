import { useContext, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { addDoc, collection } from 'firebase/firestore';
import { projectDatabase } from '../../firebase/config';

import './Create.css';

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const navigate = useNavigate();
  // const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  const { mode, color } = useContext(ThemeContext);

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
    try {
      await addDoc(collection(projectDatabase, 'recipies'), postRecipie);
      navigate('/');
    } catch (err) {
      console.error(err);
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
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className={`page-title page-title--${mode}`}>Add new recipe</h2>
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
            />
            <button
              className="btn"
              style={{ background: color }}
              onClick={handleAdd}>
              Add ingredient
            </button>
          </div>
        </label>
        <p>
          Current ingredients:
          {ingredients.map((ing, index, arr) => {
            if (index + 1 === arr.length) {
              return <em key={ing}> {ing}.</em>;
            } else {
              return <em key={ing}> {ing}, </em>;
            }
          })}
        </p>
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
          Submit
        </button>
      </form>
    </div>
  );
}
