import React from "react";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { bookBaseaseUrl } from "../utilities/axiosInstance";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";

const Home = () => {
  const [bookList, setBookList] = useState([]);
  const [totalBook, setTotalBook] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  //calculate
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookList.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(bookList.length / booksPerPage);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // get data from input   ---
  const [bookFormData, setBookFormData] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishedDate: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setBookFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validate
  const validateForm = () => {
    const newErrors = {};

    if (!bookFormData.BookName) newErrors.BookName = "Book Name is required";
    if (!bookFormData.BookTitle) newErrors.BookTitle = "Book Title is required";
    if (!bookFormData.Author) newErrors.Author = "Author is required";
    if (!bookFormData.SellingPrice)
      newErrors.SellingPrice = "Selling Price is required";
    if (!bookFormData.PublishedDate)
      newErrors.PublishedDate = "Published Date is required";

    setErrorMsg(newErrors);
    return Object.keys(newErrors).length === 0; // return true if no errors
  };

  // insert
  const handleSubmitForm = async () => {
    if (!validateForm()) return;

    try {
      if (
        !bookFormData?.BookName ||
        !bookFormData?.BookTitle ||
        !bookFormData?.Author ||
        !bookFormData?.SellingPrice
        // !bookFormData?.PublishedDate
      ) {
        showToast("All fields are required", "error");
        return;
      }

      setLoading(true);
      const res = await bookBaseaseUrl.post("/addbook", bookFormData);
      if (res?.data?.Success) {
        showToast(res.data.Message, "success");

        // ✅ Reset form instantly
        setBookFormData({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishedDate: "",
        });

        await getBookList();
      } else {
        showToast(res?.data?.Message || "Something went wrong", "error");
      }
    } catch (error) {
      showToast(error.message || "Internal Server Error", "error");

      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch
  const getBookList = async () => {
    try {
      setLoading(true);
      const data = await bookBaseaseUrl.get("/getBookList");

      setBookList(data?.data.data);
      setTotalBook(data?.data.totalCount);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookList();
  }, []);

  // delete
  const handleDeleteBook = async (_id) => {
    try {
      // const res = await bookBaseaseUrl.post(`/deleteBook/${_id}`);
      const res = await bookBaseaseUrl.post("/deleteBook", {
        Id: _id,
      });

      if (res?.data?.success) {
        showToast(res?.data.message, "success");
        getBookList();
      }
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-5 pt-10">
      <div className="w-full max-w-8xl bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Add New Book
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Book Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bookName" className="text-gray-700 font-medium">
              Book Name
            </label>
            <input
              name="BookName"
              value={bookFormData.BookName}
              onChange={handleFormChange}
              id="bookName"
              type="text"
              placeholder="Enter book name"
              className={`w-full border px-3 py-2 rounded-md outline-none transition ${
                errorMsg.BookName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100"
              }`}
            />
            {errorMsg.BookName && (
              <span className="text-red-500 text-sm">{errorMsg.BookName}</span>
            )}
          </div>

          {/* Book Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="bookTitle" className="text-gray-700 font-medium">
              Book Title
            </label>
            <input
              name="BookTitle"
              value={bookFormData.BookTitle}
              onChange={handleFormChange}
              id="bookTitle"
              type="text"
              placeholder="Enter book title"
              className={`w-full border px-3 py-2 rounded-md outline-none transition ${
                errorMsg.BookTitle
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100"
              }`}
            />
            {errorMsg.BookTitle && (
              <span className="text-red-500 text-sm">{errorMsg.BookTitle}</span>
            )}
          </div>

          {/* Author */}
          <div className="flex flex-col gap-2">
            <label htmlFor="author" className="text-gray-700 font-medium">
              Author
            </label>
            <input
              name="Author"
              value={bookFormData.Author}
              onChange={handleFormChange}
              id="author"
              type="text"
              placeholder="Enter author name"
              className={`w-full border px-3 py-2 rounded-md outline-none transition ${
                errorMsg.Author
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100"
              }`}
            />
            {errorMsg.Author && (
              <span className="text-red-500 text-sm">{errorMsg.Author}</span>
            )}
          </div>

          {/* Selling Price */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-gray-700 font-medium">
              Selling Price
            </label>
            <input
              name="SellingPrice"
              value={bookFormData.SellingPrice}
              id="price"
              type="number"
              onChange={handleFormChange}
              placeholder="Enter price"
              className={`w-full border px-3 py-2 rounded-md outline-none transition ${
                errorMsg.SellingPrice
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100"
              }`}
            />
            {errorMsg.SellingPrice && (
              <span className="text-red-500 text-sm">
                {errorMsg.SellingPrice}
              </span>
            )}
          </div>

          {/* Published Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="publishedDate"
              className="text-gray-700 font-medium"
            >
              Published Date
            </label>
            <input
              name="PublishedDate"
              value={bookFormData.PublishedDate}
              onChange={handleFormChange}
              id="publishedDate"
              type="date"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-3 py-2 text-gray-700 outline-none transition"
            />
          </div>

          {/* Genre */}
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="genre" className="text-gray-700 font-medium">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              placeholder="e.g. Fiction, Mystery"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-3 py-2 text-gray-700 outline-none transition"
            />

          </div> */}

          {/* Submit Button */}
          <div className="mt-8 flex ">
            <button
              onClick={handleSubmitForm}
              type="submit"
              className="h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-md shadow-md transition cursor-pointer"
            >
              Save Book
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-8xl mt-12 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Book List</h3>
          <span className="text-sm text-gray-500">{totalBook} Books</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm font-semibold border-b">
              <tr>
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Book Name</th>
                <th className="py-3 px-5">Book Title</th>
                <th className="py-3 px-5">Author</th>
                <th className="py-3 px-5">Price</th>
                <th className="py-3 px-5">Published Date</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            {/*  */}
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : currentBooks.length > 0 ? (
                currentBooks.map((book, index) => (
                  <tr className="hover:bg-gray-50 transition" key={index}>
                    <td className="py-3 px-5">
                      {indexOfFirstBook + index + 1}
                    </td>
                    <td className="py-3 px-5 font-medium">{book?.BookName}</td>
                    <td className="py-3 px-5">{book?.BookTitle}</td>
                    <td className="py-3 px-5">{book?.Author}</td>
                    <td className="py-3 px-5">{book?.SellingPrice}</td>
                    <td className="py-3 px-5">{book?.PublishedDate}</td>
                    <td className="py-3 px-5 text-center flex items-center justify-center gap-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                        title="Edit Book"
                        // onClick={handleEditBook}
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        title="Delete Book"
                        onClick={() => handleDeleteBook(book?._id)}
                      >
                        <FaTrashAlt className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500 flex justify-between">
          <span>
            Showing {indexOfFirstBook + 1}–
            {Math.min(indexOfLastBook, bookList.length)} of {bookList.length}{" "}
            entries
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Home;
