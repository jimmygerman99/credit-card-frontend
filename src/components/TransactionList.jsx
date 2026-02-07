function TransactionList({ transactions }) {
    return (
        <div className="transactionsList">
            <h3>Transactions</h3>
            <ul>
                {transactions.map((t, index) => (
                    <li key={t.id ?? index}>
                        {t.cardHolder} - ${t.amount} - {t.merchant} - {t.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TransactionList;
