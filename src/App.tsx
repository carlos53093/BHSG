import "./App.css";
import { useMemo, useState } from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Land from "./land";
import Cipher from "./cipher"
// import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ConnectWallet from "./ConnectWallet";
import Questions from "./Questions"
import UserAssets from "./UserAssets"

// const treasury = new anchor.web3.PublicKey(
//   process.env.REACT_APP_TREASURY_ADDRESS!
// );

// const config = new anchor.web3.PublicKey(
//   process.env.REACT_APP_CANDY_MACHINE_CONFIG!
// );

// const candyMachineId = new anchor.web3.PublicKey(
//   process.env.REACT_APP_CANDY_MACHINE_ID!
// );

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

// const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
// const connection = new anchor.web3.Connection(rpcHost);

// const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

// const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
        getPhantomWallet(),
        getSlopeWallet(),
        getSolflareWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network })
    ],
    [network]
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
      setIsOpen(!isOpen);
  };

  return (
    <Router>

    <div style={{background:"black"}}>
      <ThemeProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletDialogProvider>

              <Sidebar isOpen={isOpen} toggle={toggle}/>
              <Navbar toggle={toggle}/>  
                <Switch>
                  <Route path="/" exact component={Land} />
                  <Route path="/home/:id" exact component={Land} />
                  <Route path="/connectwallet" exact component={ConnectWallet} />
                  <Route path="/room/:url" render={(props) => <UserAssets {...props} />} />
                  <Route path="/jagasden" exact component={Cipher} />
                  <Route path="/questions" exact component={Questions} />
                </Switch>
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
      </div>
  </Router>
  );
};

export default App;
