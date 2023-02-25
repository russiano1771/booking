import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotels/Hotel";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/hotels",
        element: <List/>,
    },
    {
        path: "/hotels/:id",
        element: <Hotel/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
]);

function App() {
  return (
      <div className={'app'}>
          <RouterProvider router={router} />
      </div>
  );
}

export default App;
