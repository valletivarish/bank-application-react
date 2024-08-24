import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Table from '../../../../sharedComponents/Table/Table';
import './viewTransaction.css'
import { sanitizeTransactionData } from '../../../../utils/helpers/SanitizeData';
import { getAllTransactions as  fetchAllTransactions} from '../../../../services/AdminServices';
const ViewTransaction = () => {
    const navigate=useNavigate();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [from,setFromDate]=useState();
    const [to,setToDate]=useState();
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");
    const [transactions, setTransactions] = useState([]);

    const getAllTransactions = async () => {
        try {
            const data = await fetchAllTransactions(from,to,page, size, sortBy, direction);
            if (data && data.content) {
                console.log(data)
                const sanitizedData = sanitizeTransactionData(data);
                console.log(transactions)
                setTransactions(sanitizedData);
                console.log(transactions)
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        getAllTransactions();
    }, [page, size, sortBy, direction]);
  return (
    <div className="view-transactions-container">
          <div>
            <button className="button" onClick={()=>{
              navigate(-1);
            }}>
            Back
            </button>
          </div>
          <div className="title">
            View Transactions
          </div>
            <Table
                data={transactions}
                setPage={setPage}
                setSize={setSize}
                setDirection={setDirection}
                setSortBy={setSortBy}
            />
        </div>
  )
}

export default ViewTransaction
