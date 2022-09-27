import { useState } from 'react';
import useFetch from './useFetch';

function App() {
  const [page, setPage] = useState(1);
  // const { loading, error, data } = useFetch(
  //   `https://randomuser.me/api/?page=${page}&results=10&seed=abc`
  // );
  const { loading, error, data } = useFetch(
    `https://randomuser.me/api/?results=50&seed=abc`
  );

  console.log({ loading, error, data });

  const PER_PAGE = 10;
  const total = data?.results?.length;
  const pages = Math.ceil(total / PER_PAGE);
  // let page = 1
  // Magic of pagination
  const skip = page * PER_PAGE - PER_PAGE;
  // console.log(skip, total);

  // use the useEffect to make api call based on the page.

  if (loading) {
    return <>Loading...</>;
  }

  if (!loading && error) {
    return <>Error</>;
  }

  return (
    <div className="App">
      <h1 className="title">List of Users</h1>
      {/* TODO: another magic with Array.slice() */}
      {data?.results.slice(skip, skip + PER_PAGE).map((each, index) => {
        const name = `${each.name.title} ${each.name.first} ${each.name.last}`;
        return (
          <li key={name.toLowerCase().replaceAll(' ', '')}>{`${
            index + 1 
          }.${name}`}</li>
        );
      })}
      {
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          prev
        </button>
      }
      <p className="pagination">
        Pages: {page} of {pages}
      </p>
      {
        <button
          disabled={page >= pages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </button>
      }
      {/* another magic here */}
      {Array.from({ length: pages }, (_, index) => index + 1).map((each) => (
        <button onClick={() => setPage(each)}>{each}</button>
      ))}
    </div>
  );
}

export default App;
