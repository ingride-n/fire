import { useState, useEffect } from "react";
import { TextField, Button, InputAdornment } from "@material-ui/core";
import "./styles.css";

function OptSalaryCalculator({ classes }) {
  const [data, setData] = useState({
    annual401k: "10",
    employerMatch: "5",
    incomeTax: "35",
    housingCost: "2000",
    savings: "2000",
    budget: {
      min: "0",
      max: "0",
    },
  });
  const [done, setDone] = useState(false);
  const [salary, setSalary] = useState({
    preTax: null,
    postTax: null,
  });

  const calculate = (budget) => {
    // (gross pay * (1 - retirement)) * (1-total tax) = x
    // housing cost + budget + savings = y
    // y * 12 = x
    console.log(budget, data);
    const after =
      (budget + parseInt(data.savings) + parseInt(data.housingCost)) * 12;
    console.log(after);
    const before =
      after /
      (1 - parseInt(data.incomeTax) / 100) /
      (1 - parseInt(data.annual401k) / 100);
    return { preTax: before.toFixed(0), postTax: after.toFixed(0) };
  };

  const handleCalculate = () => {
    const minTotals = calculate(parseInt(data.budget.min));
    const maxTotals = calculate(parseInt(data.budget.max));

    console.log(minTotals, maxTotals);

    setSalary((prevSalary) => ({
      preTax: [minTotals.preTax, maxTotals.preTax],
      postTax: [minTotals.postTax, maxTotals.postTax],
    }));
    setDone(true);
  };

  return (
    <div className="osc">
      <h1>Optimal salary calculator</h1>
      <div className="osc-form">
        <div>
          <h2>Annual 401k contribution</h2>
          <TextField
            value={data.annual401k}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                annual401k: e.target.value,
              }))
            }
          />{" "}
          %<h2>Employer match percentage</h2>
          <TextField
            value={data.employerMatch}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                employerMatch: e.target.value,
              }))
            }
          />
          %<h2>Estimated total income tax contribution</h2>
          <TextField
            value={data.incomeTax}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                incomeTax: e.target.value,
              }))
            }
          />
          %<h2>Estimated total housing cost (monthly)</h2>
          <TextField
            value={data.housingCost}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                housingCost: e.target.value,
              }))
            }
          />
          <h2>Estimated Savings - Pay Yourself First (monthly)</h2>
          <TextField
            value={data.savings}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, savings: e.target.value }))
            }
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
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                budget: { ...prevData.budget, min: e.target.value },
              }))
            }
          />{" "}
          Max:{" "}
          <TextField
            value={data.budget.max}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                budget: { ...prevData.budget, max: e.target.value },
              }))
            }
          />
        </div>
        <center>
          <Button className={classes.button} onClick={handleCalculate}>
            Go
          </Button>
        </center>
      </div>
      {done ? (
        <div>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Before Tax</td>
                <td>After Tax</td>
                <td>Monthly</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Min Budget</td>
                <td>{salary.preTax[0]}</td>
                <td>{salary.postTax[0]}</td>
                <td>{salary.postTax[0]/12}</td>
              </tr>
              <tr>
                <td>Max Budget</td>
              <td>{salary.preTax[1]}</td>
              <td>{salary.postTax[1]}</td>
              <td>{salary.postTax[1]/12}</td>
            </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default OptSalaryCalculator;
