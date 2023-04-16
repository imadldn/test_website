import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { networkInterfaces } from 'os';

export type RefinanceProps = {
    TotalCost: number,
    CashBack: number,
    CashLeftIn: number,
    ReturnOnInvestment: number,
    NetReturnOnInvestment: number,
    YearlyIncome: number,
    YearlyMortgageRepayment: number,
    NetIncome: number
};
type Props = {
  props: RefinanceProps | null
};

export const Refinance : React.FC<Props> = (props) => {
  if (!!props.props)
  {
    console.log(props.props);
    let ROI: number = props.props.ReturnOnInvestment;
    let cashBack: number = props.props.CashBack;
    let cashLeftIn: number = props.props.CashLeftIn;
    let netROI: number = props.props.NetReturnOnInvestment;
    let YealyIncome: number = props.props.YearlyIncome;
    let YealyRepayment: number = props.props.YearlyMortgageRepayment;
    let NetIncome: number = props.props.NetIncome;
    return(
      <Paper elevation={3} style={{ margin:"auto", marginTop:40}} >
        <Grid container rowSpacing={1}>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Yearly Income: {YealyIncome}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Yearly Mortgage Payments: {YealyRepayment}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Net Yearly Income: {NetIncome}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Money back after remortgage and offsetting costs: {cashBack}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Net cash invested into the property: {cashLeftIn}</Typography>
          </Grid>
          <Grid item xs={12} display="flex" style={{ border: "1px solid grey" }}>
            <Typography variant="subtitle1" marginLeft={2}>Return on cash invested: {Math.round(ROI*10000)/100}%</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  else{
  return (
    <></>
  )
  }
}
