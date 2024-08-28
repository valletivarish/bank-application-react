
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import UserDashboard from './components/userDashboard/UserDashboard';
import Error from './utils/error/Error'
import ViewCustomers from './components/adminDashboard/adminComponents/viewCustomers/ViewCustomers';
import ViewTransaction from './components/adminDashboard/adminComponents/viewTransactions/ViewTransaction';
import AddCustomer from './components/adminDashboard/adminComponents/addCustomer/AddCustomer'
import Success from './utils/success/Success';
import InactivityHandler from './utils/InactivityHandler';
import Register from './components/Auth/Register';
import ConfirmAccountCreation from "../src/components/adminDashboard/adminComponents/addBankAccount/ConfirmAccountCreation";
import ViewPassbook from '../src/components/userDashboard/userComponents/viewPassbook/ViewPassbook'
import PerformTransaction from '../src/components/userDashboard/userComponents/PerformTransaction/PerformTransaction'
import Deposit from './components/userDashboard/userComponents/Deposit/Deposit';
import Profile from './components/userDashboard/userComponents/Profile/Profile';
import { ToastContainer } from 'react-bootstrap';

function App() {
  return (
    <>
    <InactivityHandler />
    <Routes>
      
      <Route path='/?(.*)' element={<Login/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/error/:code' element={<Error/>} />
      <Route path="/admin-dashboard/bank/:bankId/customer/:customerId/account" element={<ConfirmAccountCreation />} />
      <Route path='/success' element={<Success/>} />
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin-dashboard/view-customers' element={<ViewCustomers/>}/>
      <Route path='/admin-dashboard/add-customer/:userId' element={<AddCustomer/>}/>
      <Route path='/admin-dashboard/view-transactions' element={<ViewTransaction/>}/>
      <Route path='/user-dashboard/:userId' element={<UserDashboard/>}/>
      <Route path="/user-dashboard/:userId/passbook/:accountNumber" element={<ViewPassbook/>}/>
      <Route path="/user-dashboard/:userId/perform-transaction" element={<PerformTransaction/>}/>
      <Route path="/user-dashboard/:userId/deposit-amount" element={<Deposit/>}/>
      <Route path="/user-dashboard/:userId/profile" element={<Profile/>}/>

    </Routes>
    {/* <ToastContainer/> */}
    </>
  );
}

export default App;
