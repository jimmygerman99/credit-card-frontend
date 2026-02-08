function TransactionList({ transactions, onDelete, onClear, filter }) {
    return (
        <div className="transactionsList">
            <h3>Transactions</h3>
            <label htmlFor="category">Filter by Category</label>
            <select name="category" id="category" onChange={(e) => filter(e.target.value)}>
                <option value="All">All</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
            </select>
            <div className="list-header">
                <span>Card Holder</span>
                <span>Amount</span>
                <span>Merchant</span>
                <span>Category</span>
                <span></span>
            </div>
            <ul>
                {transactions.map((t, index) => (
                    <li key={t.ID ?? index}>
                        <span>{t.cardHolder}</span>
                        <span>${t.amount}</span>
                        <span>{t.merchant}</span>
                        <span>{t.category}</span>
                        <button onClick={() => onDelete(t.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button className="clear-btn" onClick={() => onClear()}>
                Clear List
            </button>
        </div>
    );
}
export default TransactionList;
