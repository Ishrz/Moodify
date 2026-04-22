import {RouterProvider} from "react-router"
import { router } from "./app.routes";
import { AuthProvider}  from "./features/auth/auth.context.jsx";

const App = () => {
  
  return (
    <main>
      
    <AuthProvider>
    <RouterProvider  router={router} />
    </AuthProvider>
     
    </main>
  );
};

export default App;