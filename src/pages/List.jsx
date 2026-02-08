import TransactionList from "../components/TransactionList";
function List({ transactions, onDelete, onClear, filter }) {
    return (
        <div className="page">
            <TransactionList transactions={transactions} onDelete={onDelete} onClear={onClear} filter={filter} />
        </div>
    );
}
export default List;
