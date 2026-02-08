import React, { useState } from "react";
import { createTransaction } from "../api/api";
//This handles the submit

function TransactionForm({ refresh }) {
    const [amount, setAmount] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [merchant, setMerchant] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!amount) newErrors.amount = "Amount is required";
        if (!cardHolder.trim()) newErrors.cardHolder = "Card holder is required";
        if (!merchant.trim()) newErrors.merchant = "Merchant is required";
        if (!category) newErrors.category = "Category is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
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
            <label>Enter the Amount of the Transaction</label>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            {errors.amount && <span className="error">{errors.amount}</span>}
            <label>Enter your Name</label>
            <input type="text" placeholder="Card Holder" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
            {errors.cardHolder && <span className="error">{errors.cardHolder}</span>}
            <label>Enter the Merchant</label>
            <input type="text" placeholder="Merchant" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
            {errors.merchant && <span className="error">{errors.merchant}</span>}
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
            {errors.category && <span className="error">{errors.category}</span>}
            <button type="submit">Submit</button>
            <h3>{message}</h3>
        </form>
    );
}
export default TransactionForm;
