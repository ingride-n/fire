import { makeStyles } from "@material-ui/core/styles";
import './styles.css';
import ReverseSalaryCalculator from "./ReverseSalaryCalculator";

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
      <ReverseSalaryCalculator classes={classes}/>
      <div></div>
    </div>
  );
}

export default App;
