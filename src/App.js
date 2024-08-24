
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import UserDashboard from './components/userDashboard/UserDashboard';
import Error from './utils/error/Error'
import ViewCustomers from './components/adminDashboard/adminComponents/viewCustomers/ViewCustomers';
import ViewTransaction from './components/adminDashboard/adminComponents/viewTransactions/ViewTransaction';
import AddCustomer from './components/adminDashboard/adminComponents/addCustomer/AddCustomer'
import Success from './utils/success/Success';

function App() {
  return (
    <>
    <Routes>
      <Route exact path='/?(.*)' element={<Login/>} />
      <Route exact path='/' element={<Login/>} />
      <Route exact path='/error' element={<Error/>} />
      <Route exact path='/success' element={<Success/>} />
      <Route exact path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route exact path='/admin-dashboard/view-customers' element={<ViewCustomers/>}/>
      <Route exact path='/admin-dashboard/add-customer/:userId' element={<AddCustomer/>}/>
      <Route exact path='/admin-dashboard/view-transactions' element={<ViewTransaction/>}/>
      <Route exact path='/user-dashboard/' element={<UserDashboard/>}/>

    </Routes>
    </>
  );
}

export default App;
