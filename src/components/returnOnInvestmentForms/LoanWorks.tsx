import React from 'react'
import { useState } from 'react';
import { InputAdornment, Grid, TextField, FormControlLabel, Button, Checkbox } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {RefinanceProps} from './Refinance';
import {Refinance} from './Refinance';

type formValueProps = {
    id: number,
    PurchasePrice: number | string,
    LTVPercentage: number | string,
    MortgageRate: number | string,
    AmountLent: number | string,
    Deposit: number | string,
    StampDuty: number | string,
    RefurbCost: number | string,
    LegalCosts: number | string,
    AdditionalCosts: number | string,
    NewPrice: number | string,
    MonthlyRentalIncome: number | string,
    FirstTimeBuyer: boolean,
    CurrentMortgageRate: number | string,
    NewMortgageRate: number | string,
    IsRefurbished: boolean,
    RefinanceResults: RefinanceProps | null,
}
const initialFormValues = {
    id:0,
    PurchasePrice: "",
    LTVPercentage: "",
    MortgageRate:"",
    AmountLent: "",
    Deposit: "",
    StampDuty: "",
    RefurbCost: "",
    LegalCosts: 2000,
    AdditionalCosts: "",
    NewPrice: "",
    MonthlyRentalIncome: "",
    FirstTimeBuyer: false,
    CurrentMortgageRate: "",
    NewMortgageRate: "",
    IsRefurbished: false,
    RefinanceResults: null,
};

const stampDutyCalculation = (firstTimeBuyer : Boolean, purchasePrice : number) => {
    let firstStep : number = 250000;
    let firstStepTax : number = 0.05;
    let secondStep : number = 925000;
    let secondStepTax : number = 0.10;
    let thirdStep : number = 1500000;
    let thirdStepTax : number = 0.12;
    let additionalTax: number = 0.03;
    if(firstTimeBuyer)
    {
        additionalTax = 0;
        if(purchasePrice < 625000)
        {
            firstStep = 425000;
            firstStepTax = 0.05;
            secondStepTax = 0;
            thirdStepTax = 0;
        }
    }
    let taxableThird : number = 0; //taxable value third step
    let taxableSecond : number = 0; //taxable value second step
    let taxableFirst : number = 0; //taxable value first step
    if (purchasePrice > thirdStep)
    {
        taxableThird = purchasePrice - thirdStep;
        taxableSecond = thirdStep-secondStep;
        taxableFirst = secondStep - firstStep;
    }
    else {
        if (purchasePrice > secondStep)
        {
            taxableSecond = purchasePrice - secondStep;
            taxableFirst = secondStep - firstStep;
        }
        else{
            if (purchasePrice > firstStep)
            {
                taxableFirst = purchasePrice - firstStep;
            }
        }
    }
    let stampDuty = purchasePrice*additionalTax+ taxableFirst*firstStepTax+taxableSecond*secondStepTax + taxableThird*thirdStepTax;
    return stampDuty;
}

function calculateResults(formFilledValues: formValueProps){
    let totalCost : number = +formFilledValues.Deposit+
        +formFilledValues.LegalCosts+
        +formFilledValues.StampDuty+
        +formFilledValues.AdditionalCosts+
        +formFilledValues.RefurbCost;
    let totalCostwoDeposit : number = +formFilledValues.LegalCosts+
        +formFilledValues.StampDuty+
        +formFilledValues.AdditionalCosts+
        +formFilledValues.RefurbCost;
    let cashBack : number = +formFilledValues.IsRefurbished? 
        +formFilledValues.NewPrice*0.75 - totalCostwoDeposit - +formFilledValues.AmountLent : 0;
    let moneyStillIn: number = +formFilledValues.Deposit - cashBack;
    let yearlyIncome: number = +formFilledValues.MonthlyRentalIncome*12;
    let yearlyRepayment: number = (+formFilledValues.NewPrice===0?+formFilledValues.AmountLent*+formFilledValues.MortgageRate/100
        :+formFilledValues.NewPrice*0.75*+formFilledValues.NewMortgageRate/100);
    let netIncome: number =yearlyIncome - yearlyRepayment;
    let returnOnInv: number = netIncome/moneyStillIn;
    let refinanceRes : RefinanceProps = {
        TotalCost: totalCost,
        CashBack: cashBack,
        CashLeftIn: moneyStillIn,
        ReturnOnInvestment: returnOnInv,
        NetReturnOnInvestment: returnOnInv*(1-0.20),
        YearlyIncome: yearlyIncome,
        YearlyMortgageRepayment: yearlyRepayment,
        NetIncome: netIncome
    };
    return refinanceRes;
}

export const LoanWorks = () => {
    const [formValues, setFormValues] = useState<formValueProps>(initialFormValues);
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {type, name, id, value} = e.target;
        if(type ==="radio") {
            setFormValues({
                ...formValues,
                [name]: value
            });
        } 
        else {
            setFormValues({
                ...formValues,
                [id]: value
            });
        }
    }
    const handlePurchasePriceChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const isFirstTimeBuyer = formValues.FirstTimeBuyer;
        setFormValues({
            ...formValues,
            'PurchasePrice': value,
            'StampDuty': stampDutyCalculation(isFirstTimeBuyer, +value)
        });
        if (formValues.LTVPercentage!=="")
        {
            let amountLent : number= +formValues.LTVPercentage*(+value)/100;
            let deposit = +value-amountLent;
            setFormValues(previousValues=>({
                ...previousValues,
                'AmountLent': amountLent,
                'Deposit': deposit
            }));
        }
        else{
            if(formValues.AmountLent!=="")
            {
                let ltvPercentage : number= (+formValues.AmountLent)/(+value)*100;
                let deposit = +value-(+formValues.AmountLent);
                setFormValues(previousValues=>({
                    ...previousValues,
                    'LTVPercentage': Math.round(ltvPercentage*10000)/10000,
                    'Deposit': deposit
                }));
            }
            else{
                if(formValues.Deposit!=="")
                {
                    let amountLent = +value - (+formValues.Deposit);
                    let ltvPercentage = (+amountLent)/(+value)*100;
                    setFormValues({
                        ...formValues,
                        'LTVPercentage': Math.round(ltvPercentage*10000)/10000,
                        'AmountLent': amountLent,
                    });
                }
            }
        }
    }
    const handleLoanChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { id, value} = e.target;
        if(formValues.PurchasePrice==""){
            setFormValues({
                ...formValues,
                [id]: value
            })
        }
        else{
            switch(id){
                case "LTVPercentage": {
                    let amountLent : number= +formValues.PurchasePrice*(+value)/100;
                    let deposit = +formValues.PurchasePrice-amountLent;
                    setFormValues({
                        ...formValues,
                        'LTVPercentage': value,
                        'AmountLent': amountLent,
                        'Deposit': deposit
                    });
                    break;
                }
                case "AmountLent": {
                    let ltvPercentage : number= (+value)/(+formValues.PurchasePrice)*100;
                    let deposit = +formValues.PurchasePrice-(+value);
                    setFormValues({
                        ...formValues,
                        'LTVPercentage': Math.round(ltvPercentage*10000)/10000,
                        'AmountLent': value,
                        'Deposit': deposit
                    });
                    break;
                }
                case "Deposit":{
                    let amountLent = +formValues.PurchasePrice - (+value);
                    let ltvPercentage = (+amountLent)/(+formValues.PurchasePrice)*100;
                    setFormValues({
                        ...formValues,
                        'LTVPercentage': Math.round(ltvPercentage*10000)/10000,
                        'AmountLent': amountLent,
                        'Deposit': value
                    });
                    break;
                }
                default:
                    break;
            }
        }
        
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let depositValue : number = +formValues.Deposit;
        let newPrice : number = +formValues.NewPrice;
        if(formValues.Deposit ===""){
             depositValue = +formValues.PurchasePrice- +formValues.AmountLent;
        }
        if(formValues.NewPrice===""){
            newPrice = +formValues.NewPrice;
        }
        setFormValues({
            ...formValues,
            'Deposit': depositValue,
            'StampDuty': stampDutyCalculation(formValues.FirstTimeBuyer, +formValues.PurchasePrice),
            'NewPrice': newPrice
        });
        setFormValues(previousState => ({
            ...previousState,
            'RefinanceResults': calculateResults(previousState)}));
        console.log(formValues);
    };
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.id]: event.target.checked});
        if (event.target.id === 'FirstTimeBuyer'){
            let firstTimeBuyer: boolean = event.target.checked;
            let stampDuty = stampDutyCalculation(firstTimeBuyer, +formValues.PurchasePrice);
            setFormValues(previousState =>({
                ...previousState,
                'StampDuty': stampDuty
            }));
        }
      };
  return (
    <Grid container spacing={2}>
        {/* Form on the left */}
        <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
        <FormControlLabel control={<Checkbox 
            id='IsRefurbished'
            checked={formValues.IsRefurbished}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'controlled' }} />} label="Refurbish and refinance?" />
        <Paper elevation={3}  style={{ margin:"auto"}}>    
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1}} >
            <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h6" gutterBottom>
                    Purchase
                </Typography>
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='Purchase Price'
                required
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                size="small"
                id='PurchasePrice'
                variant='outlined'
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.PurchasePrice}
                onChange ={handlePurchasePriceChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <FormControlLabel control={<Checkbox 
                id='FirstTimeBuyer'
                checked={formValues.FirstTimeBuyer}
                onChange={handleCheck}
                inputProps={{ 'aria-label': 'controlled' }} />} label="First Time Buyer?" />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
            <TextField label='Stamp Duty'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='StampDuty'
                variant='outlined'
                size="small"
                sx={{ width: '60%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.StampDuty}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
            <TextField label='Legal Costs'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='LegalCosts'
                variant='outlined'
                size="small"
                sx={{ width: '60%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.LegalCosts}
                onChange ={handleInputChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
            <TextField label='Additional Costs'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='AdditionalCosts'
                variant='outlined'
                size="small"
                sx={{ width: '60%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.AdditionalCosts}
                onChange ={handleInputChange}
                />
            </Grid>
        </Grid>
        </Paper>
        <Paper elevation={3}  style={{ margin:"auto", marginTop:18}} >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h6" gutterBottom>
                    Loan
                </Typography>
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='Amount Lent'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='AmountLent'
                variant='outlined'
                type="number"
                size="small"
                sx={{ width: '70%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value= {formValues.AmountLent}
                onChange ={handleLoanChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='LTV'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='LTVPercentage'
                variant='outlined'
                type="number"
                size="small"
                sx={{ width: '70%' }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                value={formValues.LTVPercentage}
                onChange={handleLoanChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='Deposit'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='Deposit'
                variant='outlined'
                type="number"
                size="small"
                sx={{ width: '70%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.Deposit}
                onChange={handleLoanChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='Mortgage Rate'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='MortgageRate'
                variant='outlined'
                type="number"
                size="small"
                sx={{ width: '70%' }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                value={formValues.MortgageRate}
                onChange={handleInputChange}
                />
            </Grid>
        </Grid>
        </Paper>
        <Paper elevation={3} style={{ margin:"auto", marginTop:18}} >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="h6" gutterBottom>
                    Refurbishment
                </Typography>
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
            <TextField label='Refurbishment Cost'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                id='RefurbCost'
                variant='outlined'
                size="small"
                sx={{ width: '70%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                value={formValues.RefurbCost}
                onChange ={handleInputChange}
                />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='Monthly Rental Income'
                    required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    id='MonthlyRentalIncome'
                    variant='outlined'
                    size="small"
                    sx={{ width: '70%' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                    value={formValues.MonthlyRentalIncome}
                    onChange ={handleInputChange}
                    />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='New Property Price'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    id='NewPrice'
                    disabled = {!formValues.IsRefurbished}
                    variant='outlined'
                    size="small"
                    sx={{ width: '70%' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">£</InputAdornment>,
                    }}
                    value={formValues.NewPrice}
                    onChange ={handleInputChange}
                    />
            </Grid>
            <Grid item my={2} xs={5} marginLeft="2px">
                <TextField label='New mortgage rate'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    id='NewMortgageRate'
                    disabled = {!formValues.IsRefurbished}
                    variant='outlined'
                    size="small"
                    sx={{ width: '70%' }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    value={formValues.NewMortgageRate}
                    onChange ={handleInputChange}
                    />
            </Grid>
        </Grid>
        </Paper>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Submit
        </Button>
        </form>
        </Grid>
        {/* Results on the right */}
        <Grid item xs={12} sm={6}>
            <Refinance props={formValues.RefinanceResults}/>
        </Grid>
    </Grid>
  )
}
