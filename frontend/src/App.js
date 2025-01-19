import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((res) => setMessage(res.message))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleCellClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const updatedBoard = board.slice();
    updatedBoard[index] = isXNext ? "X" : "O";
    setBoard(updatedBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;

  return (
    <div
      className="App"
      style={{
        // backgroundColor: "#f0f8ff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "linear-gradient(500deg, #ff9a9e, #fad0c4)",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333", marginBottom: "10px" }}>
            Contact Us
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none",
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none",
            }}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              outline: "none",
              resize: "none",
            }}
            required
          ></textarea>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>

        {/* Tic Tac Toe */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>Tic Tac Toe</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 100px)",
              gap: "10px",
            }}
          >
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "2rem",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #ddd",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {cell}
              </button>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#555" }}>
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
