import React, { useState } from "react";
import { createTransaction } from "../api/api";
//This handles the submit

function TransactionForm({ refresh }) {
    const [amount, setAmount] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [merchant, setMerchant] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { amount, cardHolder, merchant, category };
        try {
            const res = await createTransaction(data);
            refresh();
            setAmount("");
            setCardHolder("");
            setMerchant("");
            setCategory("");
            setMessage("Successfully added to the list");
        } catch (error) {
            console.error("Failed to create transcation", error);
            setMessage("Transaction Failed");
        }
        setTimeout(() => setMessage(""), 5000);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter the Amount of the Transcation</label>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <label>Enter your Name</label>
            <input type="text" placeholder="Card Holder" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
            <label>Enter the Merchant</label>
            <input type="text" placeholder="Merchant" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
            <label>Enter the Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>
                    Select a Category
                </option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
            </select>
            <button type="submit">Submit</button>
            <h3>{message}</h3>
        </form>
    );
}
export default TransactionForm;
