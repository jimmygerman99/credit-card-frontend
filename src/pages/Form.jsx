import TransactionForm from "../components/TransactionForm";
function Form({ refresh }) {
    return (
        <div className="page">
            <h3>This is the Form Page</h3>
            <TransactionForm refresh={refresh} />
        </div>
    );
}
export default Form;
