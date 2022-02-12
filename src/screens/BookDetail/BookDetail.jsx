import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "../../axiosInstance";
import "./BookDetail.css";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const BookDetail = () => {
  const params = useParams();
  const students = useFetch(`/students`);
  const books = useFetch(`/books/${params.id}`);
  const sid = new URLSearchParams(window.location.search).get("sid");
  const [borrowedBy, setBorrowedBy] = useState();
  const formatDate = (ts) => {
    const date = new Date(ts);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getYear()}`;
  };
  const formatUnixTimestamp = (ts) => {
    const date = new Date(ts * 1000);
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getYear()}`;
  };
  useEffect(() => {
    console.log(sid);
    if (sid && sid !== null) {
      axios(`/students/${sid}`)
        .then((res) => {
          setBorrowedBy(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [sid]);
  return (
    <div className="book_detail_wrap">
      <Header />
      {books.error ? (
        books.error
      ) : books.loading ? (
        "loading..."
      ) : students.response && books.response ? (
        <div className="book_detail_card">
          <div className="bd_card_heading">{books.response[0].title}</div>
          <div className="bd_card_subheading">{books.response[0].author}</div>
          <div className="bd_card_body">
            <div className="bd_card_desc">
              Borrowed By: {borrowedBy?.first_name} {borrowedBy?.last_name}
            </div>
            <div className="bd_card_desc">
              Borrowed At: {formatDate(books.response[0].created_at)}
            </div>
            <div className="bd_card_desc">
              Expected Return Date:
              {formatUnixTimestamp(books.response[0].return_date)}
            </div>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default BookDetail;
