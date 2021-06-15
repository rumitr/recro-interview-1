import { useEffect, useState } from "react";
import limit from "../lib/constant";

function useAsync(currentPage) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${currentPage}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts((prev) => [...prev, ...data]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [currentPage]);
  return { posts, loading, error };
}

export default useAsync;
