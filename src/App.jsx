import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import TodoContainer from "./components/todoContainer";

import { WalletProvider } from "./context/WalletProvider";
function App() {
  return (
    <WalletProvider>
      <title>Todo App 🐱</title>
      <Header />
      <TodoContainer />
      <Footer />
    </WalletProvider>
  );
}

export default App;
