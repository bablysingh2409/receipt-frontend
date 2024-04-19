
import './App.css'
import Home from './components/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar';
import ReceiptHomePage from './components/ReceiptHomePage';
import ReceiptForm from './components/ReceiptForm';


function App() {

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/nav',
      element:<Navbar/>,
      children:[
        {
          path:'/nav/receipt-home-page',
          element:<ReceiptHomePage/>
        },{
          path:'/nav/receipt-form',
          element:<ReceiptForm/>
        }
      ]
    }
  ])
  

  return <RouterProvider router={router}></RouterProvider>;
}

export default App
