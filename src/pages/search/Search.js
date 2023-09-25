import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../../components/RecipeList';
import { projectDatabase } from '../../firebase/config';
// import { useFetch } from '../../hooks/useFetch';

// styles
import './Search.css';

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  // const url = 'http://localhost:3000/recipes?q=' + query;
  // const { data, isPending, error } = useFetch(url);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const recipiesCollection = collection(projectDatabase, 'recipies');

    const unSub = onSnapshot(
      recipiesCollection,
      snapshot => {
        if (snapshot.empty) {
          setError('No recipie with this phrase');
          setIsPending(false);
        } else {
          let searchResults = [];
          snapshot.docs.forEach(doc => {
            if (doc.data().title.toLowerCase().includes(query.toLowerCase())) {
              searchResults.push({ id: doc.id, ...doc.data() });
            }
          });
          setData(searchResults);
          setIsPending(false);
        }
      },
      error => {
        setError(error.message);
        setIsPending(false);
      }
    );
    return () => unSub();
  }, [query]);

  return (
    <div className="search">
      <h2 className="page-title">Recipes including: {query}</h2>
      {error && <p className="error">{error}</p>}
      {isPending && (
        <div className="pending-overlay">
          <p className="loading">Loading</p>
          <div className="loader"> </div>
        </div>
      )}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
