import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import useAsync from "./hooks/useAsync";
import limit from "./lib/constant";
function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const { posts, loading, error } = useAsync(currentPage);

  const observer = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPageNumber) => prevPageNumber + limit);
        }
      });
      if (post && post.id < 99) observer.current.observe(post);
    },
    [loading]
  );

  return (
    <>
      {posts && (
        <div className="post-grid">
          {posts.map((item, index) => {
            //add the ref to the last key, had to hardcode the last id
            //because it keeps sending requests to the server
            //can use a total lenght to track tje end of records to remove hardcoded values
            if (posts.length === index + 1 && item.id < 99) {
              return (
                <div className="card" ref={lastPostRef} key={item}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              );
            } else {
              return (
                <div className="card" key={item}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </div>
              );
            }
          })}
        </div>
      )}

      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}

export default App;
