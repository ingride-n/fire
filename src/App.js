import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import "./styles.css";
import ReverseSalaryCalculator from "./ReverseSalaryCalculator";

const useStyles = makeStyles(() => ({
  item: {
    width: "150px",
    height: "150px",
    padding: "20px",
    fontSize: "25px",
    textAlign: "center",
    fontWeight: "bold",
    // margin: "auto",
    backgroundColor: "lavender",
  },
  box: {
    display: "flex",
    // margin: "auto",
    // justifyContent: "space-evenly",
    // border: "1px solid black"
  },
}));

function App() {
  const classes = useStyles();
  const [show, setShow] = useState(null);
  const products = ["Reverse Salary Calculator"];
  return (
    <div className="App">
      <div id="site-header">
        <h1>AIVIE</h1>
        <p>Financial Independence Toolkit</p>
      </div>
      {show === 0 ? <ReverseSalaryCalculator /> : null}
      {!show ? (
        <Box className={classes.box}>
          {products.map((product) => (
            <Paper className={classes.item}>{product}</Paper>
          ))}
        </Box>
      ) : null}
    </div>
  );
}

export default App;
