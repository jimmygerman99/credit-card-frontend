import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import { getTransactions, createTransaction, deleteTransactionByID, clearAllTransactions, filterByCategory } from "./api/api";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Home from "./pages/Home";
import Form from "./pages/Form";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const loadTransactions = async () => {
        try {
            const res = await getTransactions();
            setTransactions(res.data);
        } catch (error) {
            console.error("Failed to load transactions", error);
            setError("Failed to load transactions");
            setTimeout(() => setError(""), 5000);
        }
    };
    const deleteByID = async (id) => {
        if (transactions.length === 0) {
            console.log("Id not found or empty list");
        } else {
            try {
                const res = await deleteTransactionByID(id);
                loadTransactions();
            } catch (error) {
                console.error("Failed to delete transaction by id", error);
                setError("Failed to delete transaction by id");
                setTimeout(() => setError(""), 5000);
            }
        }
    };
    const clear = async () => {
        if (transactions.length === 0) {
            console.log("empty list");
        } else {
            try {
                const res = await clearAllTransactions();
                loadTransactions();
            } catch (error) {
                console.error("Failed to clera transactions", error);
                setError("Failed to clear transactions");
                setTimeout(() => setError(""), 5000);
            }
        }
    };
    const filterCategory = async (category) => {
        if (transactions.length === 0) {
            console.log("Id not found or empty list");
        } else {
            try {
                if (category === "All") {
                    loadTransactions();
                } else {
                    const res = await filterByCategory(category);
                    setTransactions(res.data);
                }
            } catch (error) {
                console.error("Failed to filter by category", error);
                setError("Failed to filter by category");
                setTimeout(() => setError(""), 5000);
            }
        }
    };
    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/form">Submit Transaction</Link>
                <Link to="/list">Transaction List</Link>
            </nav>
            {error && <p className="app-error">{error}</p>}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/list"
                    element={<List transactions={transactions} onDelete={deleteByID} onClear={clear} filter={filterCategory} />}
                ></Route>
                <Route path="/form" element={<Form refresh={loadTransactions} />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
