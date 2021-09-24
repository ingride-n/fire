import { makeStyles } from "@material-ui/core/styles";
import './styles.css';
import OptSalaryCalculator from "./OptSalaryCalculator";

const useStyles = makeStyles(() => ({
  button: {
    textTransform: "none",
    border: "1px solid black",
    backgroundColor: "yellow",
    marginTop: "40px",
    fontSize: "16px",
    fontWeight: "bold",
  }
  
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <OptSalaryCalculator classes={classes}/>
      <div></div>
    </div>
  );
}

export default App;
