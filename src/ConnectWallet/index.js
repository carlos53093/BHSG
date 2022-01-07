import './Styles.css'
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Card,
  CardMedia,
} from '@material-ui/core'
import useConnectWallet from '../hooks/LoadingMetaData'
import mintList1 from "../MINT_LIST_1.json";
// import mintList2 from "../MINT_LIST_2.json";
// import mintList3 from "../MINT_LIST_3.json";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setAdmin } from '../actions/UserInfo'

// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };

const ConnectWallet = (props) => {

  const { publicKey } = useWallet()
  const { loadTokenAddressList , tokenInfo, loadTokenInfo, metaData, setMetaData } = useConnectWallet()
  const [defaultTokenInfo, setDefaultTokenInfo] = useState(null)
  const dispatch = useAppDispatch();

  useEffect(() => {
    setMetaData(null)
    if (publicKey) {
      dispatch(setAdmin(false));
      loadTokenAddressList(publicKey.toBase58())
    }
  }, [publicKey])

  useEffect(() => {
    (async() => {
      let tokenAddress = null;
      console.log(tokenInfo)
      for(let i = 0; i < tokenInfo.length; i++) {
        console.log("------------token array id-----", i, tokenInfo[i].tokenAddress)
        if( mintList1.indexOf(tokenInfo[i].tokenAddress) !== -1) {
          console.log("-------- belong to the mintList1----------", mintList1.indexOf(tokenInfo[i].tokenAddress))
          tokenAddress = tokenInfo[i].tokenAddress;
          break;
        }
      }
      if(tokenAddress) {
        loadTokenInfo(tokenAddress)
      }
    })()
  }, [tokenInfo])

  useEffect(()=>{
    (async() => {
      if(!metaData) return
      const mapObj = {
        '#':'',
        ' ':'-'
      };
      const url = _.replace(metaData.Title, / |#/gi, function(matched){
        return mapObj[matched];
      });
      const res = await axios.post(process.env.REACT_APP_PROXY_URL + "nftlist", {
        walletAddr: publicKey.toBase58(),
        defaultTokenAddress: metaData.Mint,
        url: url
      })
      setDefaultTokenInfo(res.data)
      console.log("-----metaData-----",res.data)
      dispatch(setAdmin(res.data.isAdmin));
    })()
    
  }, [metaData])

  const renderMetaDataContainer = () => {
    if(!metaData || !defaultTokenInfo) return null;
    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%)'}}>
          <Card className="card-container" style={{ font: '10px important', borderRadius: 10 }}>
            <Link to={`room/${defaultTokenInfo.url}`}>
              <CardMedia
              component="img"
              height="250"
              width="250"
              image={_.get(metaData, 'Preview_URL', '')}
              alt={
                _.get(metaData, 'Preview_URL', '') !== ''
                  ? 'Loading...'
                  : 'Unknown Image'
              }
            />
            </Link>
          </Card>
        </div>
    )
  }

  return (
    <div className="wallet-container">
      <h1>'My Residences'</h1>
      <br />
      <h4>A place for you to view every place you own</h4>
        <WalletMultiButton style={{ marginTop: 70 }} />
        {renderMetaDataContainer()}
    </div>
  )
}

export default ConnectWallet
