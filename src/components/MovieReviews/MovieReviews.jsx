import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as API from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    async function getMovieInfo() {
      try {
        const reviews = await API.getReviewMovie(movieId); //запит на сервер АРІ
        setReviews(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    //HTTP запит на монтування
    getMovieInfo();
  }, [movieId]);

  return (
    <>
      {reviews &&
        (reviews.total_results === 0 ? (
          `We don't have any review for this movie`
        ) : (
          <>
            <ul>
              {reviews.results.map((review) => (
                <li key={review.id}>
                  <h2>{review.author}</h2>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          </>
        ))}
    </>
  );
};

export default MovieReviews;
