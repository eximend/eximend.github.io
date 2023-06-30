// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchData,
// } from "../newsReciever";

// import Loading from "../Components/Loading";
// import Button from "../Components/Button";

// function Politics() {
//   const dispatch = useDispatch();
//   const [articles, setArticles] = useState([]);
//   const customParam = "politics";


//   useEffect(() => {
//     const fetchDataAsync = async () => {
//       try {
//         const action = await dispatch(fetchData(customParam));
//         const data = action.payload;
//         console.log(data);
//         if (data && data.response && data.response.docs) {
//           const firstTenArticles = data.response.docs.slice(0, 20);
//           setArticles(firstTenArticles);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDataAsync();
//   }, [dispatch]);

//   return <div>

//   {articles.length > 0 ? (
//     <div className='mainPage'>
//       {articles.map((article, index) => (
//         <div className='mainPage_smallDiv' key={index}>
//           <div className='mainPage_Imgdiv'>
//           {article.multimedia.length > 0 && (
//             <img src={`https://static01.nyt.com/${article.multimedia[0].url}`} alt="Article" />
//           )}
//           </div>
//           <h2>{article.abstract}</h2>
//           <Button/>
//         </div>
//       ))}
//     </div>
//   ) : (
//     <Loading/>
//   )}</div>;
// }

// export default Politics;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchData } from "../newsReciever";
import Loading from "../Components/Loading";
import Button from "../Components/Button";

function Politics() {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  const customParam = "politics";

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const action = await dispatch(fetchData(customParam));
        const data = action.payload;
        if (data && data.response && data.response.docs) {
          const firstTenArticles = data.response.docs.slice(0, 20);
          setArticles(firstTenArticles);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, [dispatch]);

  return (
    <div>
      {articles.length > 0 ? (
        <div className="mainPage">
          {articles.map((article, index) => (
            <Link
              to={{
                pathname: `/news/${encodeURIComponent(
                  JSON.stringify(article)
                )}`,
                state: { article }
              }}
              key={index}
            >
              <div className="mainPage_smallDiv" key={index}>
                <div className="mainPage_Imgdiv">
                  {article.multimedia.length > 0 && (
                    <img
                      src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                      alt="Article"
                    />
                  )}
                </div>
                <h2>{article.headline.main}</h2>
                <Button />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Politics;
