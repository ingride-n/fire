import { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import "./styles.css";

function OptSalaryCalculator({ classes }) {
  const [data, setData] = useState({
    annual401k: 10,
    employerMatch: 5,
    incomeTax: 35,
    housingCost: 2000,
    savings: 2000,
    budget: {
      min: 0,
      max: 0,
    },
  });
  const [done, setDone] = useState(false);
  const [salary, setSalary] = useState({
    pretax: new Array(2),
    posttax: new Array(2),
  });

  const calculate = (budgetAmount) => {
    // (gross pay * (1 - retirement)) * (1-total tax) = x
    // housing cost + budget + savings = y
    // y * 12 = x
    const totalAfterTax = (budgetAmount + data.savings + data.housingCost) * 12;
    const total =
      totalAfterTax / (1 - data.incomeTax / 100) / (1 - data.annual401k / 100);
    return [total, totalAfterTax];
  };

  const handleCalculate = () => {
    const minTotals = calculate(data.min);
    const maxTotals = calculate(data.max);

    setSalary((prev) => {});
  };

  return (
    <div className="osc">
      <h1>Optimal salary calculator</h1>

      {done ? <div></div> : <div></div>}

      <div className="osc-form">
        <div>
          <h2>Annual 401k contribution</h2>
          <TextField value={data.annual401k} type="number" /> %
          <h2>Employer match percentage</h2>
          <TextField value={data.employerMatch} type="number" />%
          <h2>Estimated total income tax contribution</h2>
          <TextField value={data.incomeTax} type="number" />%
          <h2>Estimated total housing cost (monthly)</h2>
          <TextField
            value={data.housingCost}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
          />
          <h2>Estimated Savings - Pay Yourself First (monthly)</h2>
          <TextField
            value={data.savings}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
          />
          <h2>Spending Budget (monthly)</h2>
          Min:{" "}
          <TextField
            value={data.budget.min}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
          />{" "}
          Max:{" "}
          <TextField
            value={data.budget.max}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            type="number"
          />
        </div>
        <center>
          <Button className={classes.button} onClick={handleCalculate}>
            Go
          </Button>
        </center>
      </div>
    </div>
  );
}

export default OptSalaryCalculator;
