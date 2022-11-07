import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>The Wild Life - Professional Wild Life Photographer</title>
        <meta
          name="description"
          content="The Wild Life is a professional wild life photographer"
        />
      </Helmet>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
