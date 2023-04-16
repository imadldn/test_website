import React from "react";
import {
  Container,
  Typography,
  Box,
  Link,
  Divider,
  Grid,
  Paper,
  TextField,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: useTheme().spacing(2),
    textAlign: "center",
    color: useTheme().palette.text.secondary,
  },
  divider: {
    margin: useTheme().spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: useTheme().spacing(3),
    marginBottom: useTheme().spacing(3),
  },
  textField: {
    margin: useTheme().spacing(1),
  },
  button: {
    margin: useTheme().spacing(1),
  },
}));

const ProprintelPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Proprintel
      </Typography>

      <Typography variant="subtitle1" align="center" gutterBottom>
        Your go-to source for property investment data
      </Typography>

      <Divider className={classes.divider} />

      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Services
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5">In-Depth Data</Typography>
            <Typography variant="body1" align="justify">
              Our platform provides you with detailed information on the
              smallest area around a postcode, sourced primarily from the
              Office of National Statistics (ONS). We also offer historical
              values of properties within a postcode, giving you a comprehensive
              overview of the local property market.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Return on Investment Calculator</Typography>
            <Typography variant="body1" align="justify">
              Our return on investment calculator can help you estimate your
              potential return on investment based on various factors such as
              property value and rental income.
            </Typography>

            <Box mt={2}>
              <form className={classes.form} noValidate>
                
                <Button
                  variant="contained"
                  color="primary"
                  href="/returnOnInvestment"
                  className={classes.button}
                >
                  Calculate
                </Button>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          News & Videos
        </Typography>

        <Typography variant="body1" align="center" gutterBottom>
          Stay up-to-date with the latest trends and developments in the
          property investment industry
        </Typography>

        <Box mt={2}>
          <Link href="#" color="primary" align="center">
            Check out our latest news and videos
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ProprintelPage;