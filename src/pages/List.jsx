import TransactionList from "../components/TransactionList";
function List({ transactions }) {
    return (
        <div className="page">
            <TransactionList transactions={transactions} />
        </div>
    );
}
export default List;
