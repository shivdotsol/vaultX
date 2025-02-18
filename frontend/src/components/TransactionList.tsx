import { Button } from "./ui/button";

function TransactionList() {
    return (
        <div className="flex flex-col p-5 w-[40%] rounded-2xl border-[3px] border-slate-800 bg-slate-900 bg-opacity-50">
            <div className="flex justify-between">
                <div>Your Transactions</div>
                <Button>+ New Transaction</Button>
            </div>
        </div>
    );
}

export default TransactionList;
