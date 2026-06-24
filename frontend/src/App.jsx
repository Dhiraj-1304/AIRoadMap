import Home from './pages/Home';
import AIGenerator from './pages/AIGenerator';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';      
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import MyRoadmap from './pages/MyRoadmap';
import RoadmapDetails from './pages/RoadMapDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Public-only routes (redirects to /generate if already logged in)
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]
  },
  // Protected routes (redirects to /login if not logged in)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/generate",
            element: <AIGenerator />,
          },{
            path: "/myroadmap",
            element : <MyRoadmap />,
          },{
            path: "/roadmap/:id",
            element : <RoadmapDetails />,
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <div className="font-sans antialiased text-white bg-[#030014] min-h-screen flex flex-col">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
