import './Styles.css'
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import {
  Card,
  CardMedia,
  Box
} from '@material-ui/core'
import useConnectWallet from '../hooks/LoadingMetaData'
import mintList1 from "../SPCACESHIP_LIST.json";
// import mintList2 from "../MINT_LIST_2.json";
// import mintList3 from "../MINT_LIST_3.json";
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setAdmin } from '../actions/UserInfo'
import styled from "styled-components";
import spaceList from '../SPIDER_LIST.json'
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };
const Wrapper = styled(Box)`
  max-width: 700px;
  padding: 30px;
  overflow-x: auto;
`;


const ConnectWallet = () => {

  const { publicKey } = useWallet()
  const { loadTokenAddressList, tokenInfo, loadTokenInfo, metaData, setMetaData, metaDataList, setMetaDataList, loadMetaData } = useConnectWallet()
  const [defaultTokenInfo, setDefaultTokenInfo] = useState(null)
  const [bountyTokenList, setBountyTokenList] = useState([]);
  const dispatch = useAppDispatch();
  const [spaceShip, setSpaceShip] = useState([])

  useEffect(() => {
    setMetaData(null)
    setMetaDataList([])
    if (publicKey) {
      dispatch(setAdmin(false));
      loadTokenAddressList(publicKey.toBase58())
      loadMetaData(publicKey.toBase58())
    }
  }, [publicKey])

  useEffect(()=>{
    if(!metaData) return;
    if (spaceList.indexOf(metaData.data.Mint) !== -1) {
      const newMetaList = _.cloneDeep(spaceShip)
      newMetaList.push(metaData.data)
      setSpaceShip(newMetaList)
    }
  },[metaData])

  useMemo(() => {
    (async () => {
      let tokenAddress = [];
      for (let i = 0; i < tokenInfo.length; i++) {
        if (mintList1.indexOf(tokenInfo[i].tokenAddress) !== -1) {
          tokenAddress.push(tokenInfo[i].tokenAddress);
          // break;
        }
      }
      if (tokenAddress.length) {
        setBountyTokenList(tokenAddress)
        loadTokenInfo(tokenAddress)
      }
    })()
  }, [tokenInfo])

  useMemo(() => {
    (async () => {
      if (!metaDataList || !metaDataList.length) return
      // const mapObj = {
      //   '#':'',
      //   ' ':'-'
      // };
      // const url = _.replace(metaData.Title, / |#/gi, function(matched){
      //   return mapObj[matched];
      // });
      const _defaultAddress = [];
      _.map(metaDataList, each => {
        _defaultAddress.push(each.Mint)
      })
      const res = await axios.post(process.env.REACT_APP_PROXY_URL + "nftlist", {
        walletAddr: publicKey.toBase58(),
        defaultTokenAddress: _defaultAddress,
        // url: url,
        tokenInfo: bountyTokenList
      })
      setDefaultTokenInfo(res.data)
    })()

  }, [metaDataList])

  const renderMetaDataContainer = () => {
    if (!metaDataList || !defaultTokenInfo) return null;
    return (
      <Box style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%)' }} display="flex">
        <Wrapper>
          <Box display="flex" width="fit-content">
            {
              _.map(metaDataList, (each, key) => {
                // const title = _.replace(each.Title, " ", "_");
                const mapObj = {
                  '#':'',
                  ' ':'-'
                };
                const title = _.replace(each.Title, / |#/gi, function(matched){
                  return mapObj[matched];
                });
                return <Card className="card-container" style={{ font: '10px important', borderRadius: 10, marginRight: '30px' }}>
                  <Link to={`room/${title}`}>
                    <CardMedia
                      component="img"
                      style={{width:'250px', height: '250px'}}
                      key={key}
                      image={_.get(each, 'Preview_URL', '')}
                      alt={
                        _.get(each, 'Preview_URL', '') !== ''
                          ? 'Loading...'
                          : 'Unknown Image'
                      }
                    />
                  </Link>
                </Card>
              })
            }
          </Box>
        </Wrapper>
      </Box>
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
