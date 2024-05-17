import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "react-medium-image-zoom/dist/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <main className="relative flex-col flex h-[100dvh] w-full overflow-hidden bg-zinc-200/50 text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <App />
    </main>
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
);
