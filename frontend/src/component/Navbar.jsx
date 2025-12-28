import logo from '/public/logo.png';
import React, { useEffect, useState } from 'react';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Home from './Home';
import styles from "../CSS/Navbar.module.css";
import Profile from "./Profile.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const [assignment, setAssignments] = useState([]);
  const [Qstatus, setQstatus] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    const fetchAssignment = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(
          `http://localhost:5000/api/fetch/assignments?token=${token}`
        );

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        const questions = data[0].questions;

        setAssignments(questions);
        setSelectedQuestion(questions[0]);
        localStorage.setItem("question", JSON.stringify(questions[0]));
      } catch (error) {
        console.log("Backend Error", error);
      }
    };

    fetchAssignment();
  }, [navigate]);

  const showQuestion = () => {
    setQstatus(prev => !prev);
  };

  const changeQuestion = (question) => {
    setSelectedQuestion(question);
    localStorage.setItem("question", JSON.stringify(question));
    setQstatus(false);
  };

  const currentIndex = assignment.findIndex(
    q => q._id === selectedQuestion?._id
  );

  const nextQuestion = () => {
    if (currentIndex < assignment.length - 1) {
      const next = assignment[currentIndex + 1];
      setSelectedQuestion(next);
      localStorage.setItem("question", JSON.stringify(next));
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      const prev = assignment[currentIndex - 1];
      setSelectedQuestion(prev);
      localStorage.setItem("question", JSON.stringify(prev));
    }
  };

  const showProfile = () => {
    if (!profile)
      setProfile(true);
    else
      setProfile(false);
  };

  return (
    <>

      {profile && (
        <Profile/>
      )}
      {Qstatus && (
        <div className={styles.questionContainer}>
          <ul className={styles.questionUl}>
            <div className={styles.header}>
              <h1>All Questions</h1>
              <button className={styles.closebtn} onClick={showQuestion}>
                <IoMdCloseCircle />
              </button>
            </div>

            {assignment.map(q => (
              <li
                key={q._id}
                onClick={() => changeQuestion(q)}
                className={q._id === selectedQuestion?._id ? styles.active : ""}
              >
                {q.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <div className={styles.logoSection}>
            <img src={logo} alt="logo" className={styles.logo} />
            <h1 className={styles.navbarLogo} onClick={showQuestion}>
              Problem
            </h1>
          </div>

          <div className={styles.navbarButtons}>
            <button
              className={styles.iconButton2}
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              <GrFormPrevious />
            </button>

            <button
              className={styles.iconButton2}
              onClick={nextQuestion}
              disabled={currentIndex === assignment.length - 1}
            >
              <MdNavigateNext />
            </button>
          </div>

          <button
            className={styles.profileButton}
            onClick={showProfile}
          >
            Profile
          </button>
        </div>
      </nav>

      <Home question={selectedQuestion} />
    </>
  );
};

export default Navbar;
