import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, InputAdornment, Dialog } from "@material-ui/core";
import "./styles.css";

const useStyles = makeStyles(() => ({
  goButton: {
    textTransform: "none",
    border: "1px solid black",
    marginTop: "40px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  closeButton: {
    float: "right",
    width: "50px",
    margin: "10px",
  },
}));

function ReverseSalaryCalculator() {
  const classes = useStyles();
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
  const [openDetails, setOpenDetails] = useState(false);
  const [salary, setSalary] = useState({
    preTax: [],
    postTax: [],
  });

  const calculate = (budget) => {
    const after =
      (budget + parseInt(data.savings) + parseInt(data.housingCost)) * 12;
    const before =
      after /
      (1 - parseInt(data.incomeTax) / 100) /
      (1 - parseInt(data.annual401k) / 100);
    return { preTax: before.toFixed(0), postTax: after.toFixed(0) };
  };

  const handleCalculate = () => {
    const minTotals = calculate(parseInt(data.budget.min));
    const maxTotals = calculate(parseInt(data.budget.max));

    setSalary({
      preTax: [minTotals.preTax, maxTotals.preTax],
      postTax: [minTotals.postTax, maxTotals.postTax],
    });
    setOpenDetails(true);
  };

  return (
    <div className="rsc">
       {/* <h1>Reverse Salary Calculator</h1> */}
      <div className="rsc-form">
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
          <h2>Estimated Savings - "Pay Yourself First" (monthly)</h2>
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
          <Button className={classes.goButton} onClick={handleCalculate}>
            Go
          </Button>
        </center>
      </div>
      <DetailsPopup
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        salary={salary}
      />
    </div>
  );
}

function DetailsPopup({ salary, openDetails, setOpenDetails }) {
  const classes = useStyles();
  return (
    <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
      <div>
        <table id="rsc-table">
          <tr>
            <td style={{ width: "150px" }}></td>
            <th style={{ width: "100px" }}>Min Budget</th>
            <th style={{ width: "100px" }}>Max Budget</th>
          </tr>
          <tr>
            <th>Annual Before Tax</th>
            <td>{salary.preTax[0]}</td>
            <td>{salary.preTax[1]}</td>
          </tr>
          <tr>
            <th>Annual After Tax</th>
            <td>{salary.postTax[0]}</td>
            <td>{salary.postTax[1]}</td>
          </tr>
          <tr>
            <th>Monthly After Tax</th>
            <td>{salary.postTax[0] / 12}</td>
            <td>{salary.postTax[1] / 12}</td>
          </tr>
        </table>
        <Button
          className={classes.closeButton}
          onClick={() => setOpenDetails(false)}
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
}

export default ReverseSalaryCalculator;
