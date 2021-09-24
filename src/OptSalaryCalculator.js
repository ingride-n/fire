import { TextField, Button } from "@material-ui/core";
import "./styles.css";

function OptSalaryCalculator({ classes }) {
  return (
    <div className="osc">
      <h1>Optimal salary calculator</h1>
      <div className="osc-form">
        <div>
          <h2>Annual 401k contribution</h2>
          <TextField></TextField> %<h2>Employer match base percentage</h2>
          <TextField></TextField> %<h2>Expected total income tax</h2>
          <TextField></TextField> %<h2>Expected housing cost (monthly)</h2>
          <TextField></TextField>
          <h2>Desired savings (monthly)</h2>
          <TextField></TextField>
          <h2>Desired Spending allowance per month</h2>
          Min: $ <TextField></TextField> Max: $ <TextField></TextField>
        </div>
        <center>
          <Button className={classes.button}>Go</Button>
        </center>
      </div>
    </div>
  );
}

export default OptSalaryCalculator;
