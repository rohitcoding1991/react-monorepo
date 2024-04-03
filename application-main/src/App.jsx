import { Button } from "@himanshu077/application-framework";
import "./App.css";

function App() {
  const changeBackground = (variant) => {
    const allVariants = {
      warn: "linear-gradient(white, orange) orange",
      success: "linear-gradient(white, green) green",
      danger: "linear-gradient(white, red) red",
      info: "linear-gradient(white, blue) blue",
    };
    // prepare code to set the background of body on the click of the button variant
    document.body.style.background = allVariants[variant];
  };
  return (
    <div>
      <Button variant="danger" onClick={() => changeBackground("danger")}>
        Danger Button
      </Button>
      <Button variant="info" onClick={() => changeBackground("info")}>
        Info Button
      </Button>
      <Button variant="success" onClick={() => changeBackground("success")}>
        Success Button
      </Button>
      <Button variant="warn" onClick={() => changeBackground("warn")}>
        Warning Button
      </Button>
    </div>
  );
}

export default App;
