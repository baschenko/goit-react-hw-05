import { Link } from "react-router-dom";
import errorImage from "./error.jpg";

const NotFoundPage = ({ children }) => {
  return (
    <div>
      <img src={errorImage} width="300" alt="button oops" />
      <h2>{children}</h2>
      <p>Перейти на головну сторінку:</p>
      <Link to="/">На головну</Link>
    </div>
  );
};

export default NotFoundPage;
