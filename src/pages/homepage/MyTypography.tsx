import { Typography } from "@mui/material";
import { Grid, Stack, Paper } from "@mui/material";
import { Box } from "@mui/material";
import homepageImage from "../../assets/images/homepageImage.png"
import { Wrapper } from "./MyTypography.styles";

const MyTypography = () => {
  return (
    <div>
      <Box sx={{bgcolor: 'white',p: 2}}>
        <Stack>
          <Typography variant='h3' component='h1' gutterBottom={true}> Welcome to Propintel</Typography>
        </Stack>
        <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={4} style={{display:'flex'}}>
              <Paper elevation={3} style={{ margin:"auto", marginTop:40}} >
                <Wrapper>
                  <div className="image-container">
                    <img src={homepageImage} alt="background"/>
                    <div className="text-image-center">Calculate your Return on investment</div>
                  </div>
                  <div className=".normal-text">
                    <Typography variant ='body2'>Whether your strategy is a plain vanilla buy to let or a buy refurbish refinance and let</Typography>
                  </div>
                </Wrapper>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{display:'flex'}}>
              <Paper elevation={3} style={{ margin:"auto", marginTop:40}} >
                <Wrapper>
                  <div className="image-container">
                    <img src={homepageImage} alt="background"/>
                    <div className="text-image-center">Get postcode information</div>
                  </div>
                  <div className=".normal-text">
                    <Typography variant='body2'> 
                    All demographic and economic numbers for a postcode to allow you to make your due dilligence</Typography>
                  </div>
                </Wrapper>
              </Paper>
            </Grid>
            <Grid item xs={4} style={{display:'flex'}}>
              <Paper elevation={3} style={{ margin:"auto", marginTop:40}} >
                <Wrapper>
                  <div className="image-container">
                    <img src={homepageImage} alt="background"/>
                    <div className="text-image-center">Coming soon: Sell your property</div>
                  </div>
                  <div className=".normal-text">
                    <Typography variant='body2'>
                      You will soon be able to share your portfolio with potential investors whithin our community. 
                    </Typography>
                  </div>
                </Wrapper>
              </Paper>
            </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default MyTypography;