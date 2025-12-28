import styles from "../CSS/Home.module.css";
import { FaPlay, FaRegLightbulb } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import { useState, useEffect } from "react";

const Home = ({ question: selectedQuestion }) => {
  const [code, setCode] = useState("");
  const [table, setTable] = useState(null);
  const [question, setQuestion] = useState(null);
  const [testcase, settestcase] = useState();
  const [expected, setexpected] = useState();
  const [result, setresult] = useState();
  const [tableStatus, settableStatus] = useState("Query output will appear here");
  const [hint, setHint] = useState("Noting Hint");

  useEffect(() => {
    const data = selectedQuestion || JSON.parse(localStorage.getItem("question"));
    if (data) {
      setQuestion(data);
    }
  }, [selectedQuestion]);

  const submitCode = async () => {
    try {
      const expectedOutput = question.expectedOutput.value;
      const res = await fetch("http://localhost:5000/api/code/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.error) {
        settableStatus(data.error);
        return;
      }
      const userResult = data.rows || [];
      setTable(userResult);
      const isCorrect = JSON.stringify(userResult) === JSON.stringify(expectedOutput);
      settestcase(isCorrect);
      setexpected(expectedOutput);
      setresult(userResult);
    } catch (error) {
      console.error("Backend error:", error.message);
    }
  };

  const onSubmit = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      console.log(email);
       const res=await fetch("http://localhost:5000/api/code/submit-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
          email_id:email,
          questionId: question._id,
          submittedCode: code,
          expectedOutput: expected,
          userResult: result,
        }),
       });
      if (res) {
        window.alert("submitted");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (!question) {
    return <div className={styles.loading}>Loading question...</div>;
  }
  const Hint = async () => {
    console.log("Hint clicked",question);
    try {
      const res = await fetch("http://localhost:5000/api/code/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question)
      })
      setHint(res);
    } catch (error) {
      console.log("Backend problem",error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <h1 className={styles.title}>{question.title}</h1>
        <p className={styles.description1}>
          <span className={styles.descrispan2}>Description:</span> {question.description}
        </p>
        <div className={styles.section}>
          <h3>📝 Problem Statement</h3>
          <p>{question.questionDetails}</p>
        </div>
        <div className={styles.section}>
          <h5>Table : { question.sampleTables[0].tableName}</h5>
          <h3>Expected Output</h3>
          <div className={styles.tableSection}>
            {question.expectedOutput?.value?.length > 0 ? (
              <table className={styles.table1}>
                <thead>
                  <tr>
                    {Object.keys(question.expectedOutput.value[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {question.expectedOutput.value.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No expected output available</p>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.editor}>
          <div className={styles.editorHeader}>
            <h3 className={styles.heading}>Code Editor</h3>
            <span>
              <button className={styles.helpBtn}
                onClick={Hint}>
                 <FaRegLightbulb />
              </button>
              
            </span>
          </div>
          <textarea
            placeholder="Write your SQL query here..."
            onChange={(e) => setCode(e.target.value)}
            className={styles.textarea}
          />
          <div className={styles.navbarUser}>
            <button className={styles.iconButton1} onClick={submitCode}>
              <FaPlay />
            </button>
            <button className={styles.iconButton2}
            onClick={onSubmit}>
              <IoCloudUpload />
              Submit
            </button>
          </div>
        </div>

        <div className={styles.result}>
          <h3>Result</h3>
          {!table || table.length === 0 ? (
            <div className={styles.output}>{tableStatus}</div>
          ) : (
            <div className={styles.output}>
              <div className={styles.table}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {Object.keys(table[0]).map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, i) => (
                          <td key={i}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
