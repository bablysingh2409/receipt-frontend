
import './App.css'
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar';
import ReceiptHomePage from './components/ReceiptHomePage';
import ReceiptForm from './components/ReceiptForm';
import { useAuth } from './context/auth';


function App() {
  const { isLogin} = useAuth();

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/nav',
      element:isLogin?<Navbar/>:<Home/>,
      children:[
        {
          path:'/nav/receipt-home-page',
          element:isLogin?<ReceiptHomePage/>:<Home/>
        },{
          path:'/nav/receipt-form',
          element:isLogin?<ReceiptForm/>:<Home/>
        }
      ]
    }
  ])
  

  return <RouterProvider router={router}></RouterProvider>;
}

export default App
