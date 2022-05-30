import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from "./Logos/logo.svg"
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
     createStyles({
          grow: {
               flexGrow: 1,
          },
          main: {
               background: "transparent",
          },
          menuButton: {
               marginRight: theme.spacing(2),
          },
          title: {
               display: 'none',
               [theme.breakpoints.up('sm')]: {
                    display: 'block',
                    marginLeft: theme.spacing(2),
                    marginRight: theme.spacing(2),
                    textTransform: "capitalize",
                    fontFamily: "Saira",
               },
          },
          desktopButton: {
               minWidth: "150px",
               marginLeft: theme.spacing(2),
               marginRight: theme.spacing(2),
               textTransform: "capitalize",
          },
          sectionDesktop: {
               display: 'none',
               [theme.breakpoints.up('md')]: {
                    display: 'flex',
               },
          },
          sectionMobile: {
               display: 'flex',
               [theme.breakpoints.up('md')]: {
                    display: 'none',
               },
          },
     }),
);

export default function PrimarySearchAppBar() {
     const classes = useStyles();
     return (
          <div className={classes.grow}>
               <AppBar position="static" className={classes.main}>
                    <Toolbar>
                         <img src={Logo} alt="logo" height={40} width={40} />
                         <Button 
                              type="button"
                              onClick={(e) => {
                              e.preventDefault();
                              window.location.href='https://bountyhunterspaceguild.com/';}}
                              className={classes.title} variant="text">                         
                              Website
                         </Button>
                         <Button 
                              type="button"
                              onClick={(e) => {
                              e.preventDefault();
                              window.location.href='https://twitter.com/BountyHunterNFT';}}
                              className={classes.title} variant="text">                         
                              Twitter
                         </Button>
                         <Button 
                              type="button"
                              onClick={(e) => {
                              e.preventDefault();
                              window.location.href='https://discord.com/invite/mWtejvGMTQ';}}
                              className={classes.title} variant="text">                         
                              Discord
                         </Button>
                         <Button         
                              type="button"
                              onClick={(e) => {
                              e.preventDefault();
                              window.location.href='https://raydium.io/swap/?from=BNTYkJdHkdP9eH4uGouRkqz9RifYL8knHVVVmBMgcNzx&to=11111111111111111111111111111111';}}
                              className={classes.title} variant="text">
                              Purchase BNTY
                         </Button>
                    </Toolbar>
               </AppBar>
          </div>
     );
}
