import "./Styles.css"
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-material-ui';
const ConnectWallet = () => {

    return (<div className="wallet-container">
        <h1>My Residences</h1><br />
        <h4>A place for you to view every place you own</h4>
        <WalletMultiButton style={{marginTop: 70}} />

    </div>)
}

export default ConnectWallet