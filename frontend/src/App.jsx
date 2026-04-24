import {RouterProvider} from "react-router"
import { router } from "./app.routes";
import { AuthProvider}  from "./features/auth/auth.context.jsx";
import { SongContextProvider } from "./features/Home/home.context.jsx";
const App = () => {
  
  return (
    <main>
      
    <SongContextProvider>
    <AuthProvider>
    <RouterProvider  router={router} />
    </AuthProvider>
    </SongContextProvider>
     
    </main>
  );
};

export default App;