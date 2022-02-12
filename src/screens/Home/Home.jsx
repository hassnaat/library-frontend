import React, { useState, useEffect } from "react";
import "./Home.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CustomTable from "../../components/Table/Table";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const students = useFetch("/students");
  const books = useFetch("/books");

  return (
    <div className="home_screen">
      <Header />
      <div className="home__accordion_wrap">
        <Accordion sx={{ margin: "15px 0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="home_accordion_header">
              <div className="home_accordion_headerleft">
                <AccountCircleIcon className="home_accordion_icon" />
              </div>
              <div className="home_accordion_headerright">Students</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {students.loading ? (
              "loading"
            ) : students.error ? (
              students.error
            ) : students.response ? (
              <CustomTable
                type="student"
                headings={["First Name", "Last Name"]}
                students={students.response}
              />
            ) : null}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ margin: "15px 0" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="home_accordion_header">
              <div className="home_accordion_headerleft">
                <LibraryBooksIcon className="home_accordion_icon" />
              </div>
              <div className="home_accordion_headerright">Books</div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {books.error ? (
              books.error
            ) : books.loading ? (
              "Loading..."
            ) : books.response && students.response ? (
              <CustomTable
                type="books"
                headings={["First Name", "Last Name"]}
                students={students.response}
                books={books.response}
              />
            ) : null}
          </AccordionDetails>
        </Accordion>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
