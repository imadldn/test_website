import React from 'react'
import { Grid } from '@mui/material'
import { LoanWorks } from '../../components/returnOnInvestmentForms/LoanWorks'

export const ReturnOnInvestment = () => {
  return (
    <div>
        <Grid container>
            <Grid item xs={12}>
                <LoanWorks/>
            </Grid>
        </Grid>

    </div>
  )
}
