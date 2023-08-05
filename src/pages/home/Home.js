// import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';
import { useEffect, useState } from 'react';
import { projectDatabase } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

// styles
import './Home.css';

export default function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
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
          setError('No recipies to load');
          setIsPending(false);
          setData([]);
        } else {
          let results = [];
          snapshot.docs.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      error => {
        setError(error.message);
        setIsPending(false);
      }
    );
    return () => unSub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
