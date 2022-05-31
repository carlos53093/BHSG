import './Styles.css'
import { useEffect, useState, useMemo } from 'react'
import _ from 'lodash'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box
} from '@material-ui/core'
import useConnectWallet from '../hooks/LoadingMetaData'

import mintList1 from '../MINT_LIST_1.json'
// import mintList2 from '../MINT_LIST_2.json'
// import mintList3 from '../MINT_LIST_3.json'
import spaceList from '../SPCACESHIP_LIST.json'
import spiderList from '../SPIDER_LIST.json'
import axios from 'axios'

import Carousel from '../Carousel2/Carousel'
import { useWallet } from '@solana/wallet-adapter-react'
import { Link } from 'react-router-dom'

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
}

const UserAssets = (props) => {
  const {
    match: { params },
  } = props
  const { url } = params

  const { publicKey } = useWallet()

  const [metaplexList, setMetaplexList] = useState([])
  const [metaplexList1, setMetaplexList1] = useState([])
  // const [metaplexList2, setMetaplexList2] = useState([])
  // const [metaplexList3, setMetaplexList3] = useState([])
  const [metaplexListOther, setMetaplexListOther] = useState([])
  const [spaceShip, setSpaceShip] = useState([])
  const [spider, setSpider] = useState([])
  const { metaData, loadMetaData, metaDataList, loadTokenInfo, tokenInfo, loadMetadataByWallet } = useConnectWallet()
  const [bountyTokenList, setBountyTokenList] = useState([]);
  const [defaultTokenInfo, setDefaultTokenInfo] = useState(null)

  useMemo(() => {
    if(defaultTokenInfo === null) return;
    (async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PROXY_URL + 'nftlist/' + defaultTokenInfo.url,
          config,
        )
        loadMetaData(res.data.walletAddr)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [defaultTokenInfo])

  useEffect(() => {
    if(!publicKey) return;
    if (publicKey) {
      loadMetadataByWallet(publicKey.toBase58())
    }
  }, [])

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
        // url: defaultTokenInfo.url,
        tokenInfo: bountyTokenList
      })
      setDefaultTokenInfo(res.data)
    })()

  }, [metaDataList])

  useEffect(() => {
    if (
      !_.find(metaplexList, { Pubkey: _.get(metaData, 'data.Pubkey', '') }) &&
      metaData
    ) {
      if (mintList1.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(metaplexList1)
        newMetaList.push(metaData.data)
        setMetaplexList1(newMetaList)
      } else if (spaceList.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(spaceShip)
        newMetaList.push(metaData.data)
        setSpaceShip(newMetaList)
      } else if (spiderList.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(spider)
        newMetaList.push(metaData.data)
        setSpider(newMetaList)
      } else {
        const newMetaList = _.cloneDeep(metaplexListOther)
        newMetaList.push(metaData.data)
        setMetaplexListOther(newMetaList)
      }
      const newMetaList = _.cloneDeep(metaplexList)
      newMetaList.push(metaData.data)
      setMetaplexList(newMetaList)
    }
  }, [metaData])

  const renderMetaDataContainer = (data, title, isLink) => {
    if (data.length === 0) return null
    let len = 0;
    _.map(data, (each) => {
      if(!_.isEmpty(each)) len++;
      
    });
    return (
      <Carousel show={5} title={title} length={len}>
        {_.map(data, (each, index) => {
          if(_.isEmpty(each)) return null;
          const mapObj = {
            '#':'',
            ' ':'-'
          };
          const title = _.replace(each.Title, / |#/gi, function(matched){
            return mapObj[matched];
          });
          return (
            <div key={index} style={{ margin: '10px 20px' }}>
              <Link to={isLink ? `/room/${title}`: '#'} style={{ textDecoration: 'none' }}>
                <Card
                  style={{
                    font: '10px important',
                    width: 250,
                    height: 550,
                    boxShadow: '#26b8e9 0px 0 10px 0px',
                    borderRadius: 10,
                  }}
                >
                  <CardHeader
                    title={_.get(each, 'Title', '')}
                    subheader={`Symbol: ${_.get(
                      each,
                      'Properties.symbol',
                      'Unknow',
                    )}`}
                    style={{height: '100px'}}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image={_.get(each, 'Preview_URL', '')}
                    alt={
                      _.get(each, 'Preview_URL', '') !== ''
                        ? 'Loading...'
                        : 'Unknown Image'
                    }
                  />
                  <CardContent>
                    <Box overflow="auto" height="150px" paddingRight="10px" >
                      <Typography
                        variant="subtitle2"
                        style={{ textOverflow: 'ellipsis', paddingBottom: 10 }}
                      >
                        {_.get(each, 'Description', '')}
                      </Typography>
                    </Box>
                    
                  </CardContent>
                </Card>
              </Link>
            </div>
          )
        })}
      </Carousel>
    )
  }

  return (
    <div className="assets-container">
      <h1>'My Residences'</h1>
      <br />
      <h4>A place for you to view every place you own</h4>
      <Box>
        {
          _.map(spaceShip, (each, key) => {
            const mapObj = {
              '#':'',
              ' ':'-'
            };
            const title = _.replace(each.Title, / |#/gi, function(matched){
              return mapObj[matched];
            });
            if(title === params.url ) {
              return <Card className="card-view-container" style={{ font: '10px important', borderRadius: 10, }}>
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
              </Card>
            }
          })
        }
      </Box>
      {renderMetaDataContainer(spaceShip, 'SpaceShip', true)}
      {renderMetaDataContainer(metaplexList1, 'Bounty Hunter')}
      {renderMetaDataContainer(spider, 'Spider')}
      {renderMetaDataContainer(metaplexListOther, 'Other')}
    </div>
  )
}

export default UserAssets
