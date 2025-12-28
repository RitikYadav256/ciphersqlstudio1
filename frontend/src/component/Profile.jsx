import { useEffect, useState } from "react";
import styles from "../CSS/Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/user/profile?emailId=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className={styles["profile-loading"]}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles["profile-loading"]}>Profile not found</div>;
  }

  return (
    <div className={styles["profile-container"]}>
      {/* Header */}
      <div className={styles["profile-header"]}>
        <h1>{user.name}</h1>
        <p>{user.emailId}</p>

        {user.github && (
          <a href={user.github} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
        )}
      </div>

      {/* Stats */}
      <div className={styles["profile-statsGrid"]}>
        <div className={styles["profile-card"]}>
          <h3>Total Questions</h3>
          <span>{user.stats?.totalQuestions || 0}</span>
        </div>

        <div className={styles["profile-card"]}>
          <h3>Attempted</h3>
          <span>{user.stats?.attempted || 0}</span>
        </div>

        <div className={styles["profile-card"]}>
          <h3>Solved</h3>
          <span>{user.stats?.solved || 0}</span>
        </div>

        <div className={styles["profile-card"]}>
          <h3>Accuracy</h3>
          <span>{user.stats?.accuracy || 0}%</span>
        </div>

        <div className={styles["profile-card"]}>
          <h3>Total Time</h3>
          <span>{user.stats?.totalTimeSpent || 0} mins</span>
        </div>
      </div>

      {/* Daily Progress */}
      <div className={styles["profile-progress"]}>
        <h2>Daily Progress</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Attempted</th>
              <th>Solved</th>
              <th>Time (min)</th>
            </tr>
          </thead>
          <tbody>
            {user.dailyProgress?.length > 0 ? (
              user.dailyProgress.map((day, index) => (
                <tr key={index}>
                  <td>{new Date(day.date).toLocaleDateString()}</td>
                  <td>{day.questionsAttempted}</td>
                  <td>{day.questionsSolved}</td>
                  <td>{day.timeSpent}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No progress data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
