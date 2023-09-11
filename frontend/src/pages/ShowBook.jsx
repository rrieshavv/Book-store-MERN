import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.book); // Access the 'book' property from the API response
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Include 'id' in the dependency array to fetch data when 'id' changes

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl text-gray-500 mr-4">Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
