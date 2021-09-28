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
    backgroundColor: "lavender",
  },
  box: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();
  const [show, setShow] = useState(null);
  const products = ["Reverse Salary Calculator"];
  return (
    <div className="App">
      <div className="home">
        <div id="site-header">
          <h1 className="page-title">AIVIE</h1>
          <p>Financial Independence Toolkit</p>
        </div>
        <Box className={classes.box}>
          {products.map((product, i) => (
            <Paper className={classes.item} onClick={() => setShow(i)}>
              {product}
            </Paper>
          ))}
        </Box>
        {show === 0 ? <ReverseSalaryCalculator /> : null}
      </div>
    </div>
  );
}

export default App;
