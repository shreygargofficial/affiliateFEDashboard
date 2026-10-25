import { useState } from "react";
import "./App.css";
import AllAffiliate from "./components/affiliateTable/AllAffiliate";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AllAffiliate />
    </>
  );
}

export default App;
