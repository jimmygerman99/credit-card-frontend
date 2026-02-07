import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import { getTransactions, createTransaction } from "./api/api";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Home from "./pages/Home";
import Form from "./pages/Form";

function App() {
    const [transactions, setTransactions] = useState([]);

    const loadTransactions = async () => {
        const res = await getTransactions();
        setTransactions(res.data);
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
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/list" element={<List transactions={transactions} />}></Route>
                <Route path="/form" element={<Form refresh={loadTransactions}/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
