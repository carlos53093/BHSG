import './Styles.css'
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-material-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { Program, Provider, web3 } from '@project-serum/anchor'
import { programs } from '@metaplex/js'
import { useEffect, useState } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Card, CardHeader, CardMedia, CardContent, Grid, Typography } from '@material-ui/core'

const programId = new PublicKey('E7XQrWFnmS2RonnqXscWR9VtcdKygwvSZnGs8CmT9uFf')

const addressId = new PublicKey('6ksPqG9FNsAPKK9uw7U4xw7R6pbkgRYCTiuUNWHRcVdh')
const keyPair = Keypair.fromSeed(programId.toBytes())

const connection = new web3.Connection(
  web3.clusterApiUrl('mainnet-beta'),
  'confirmed',
)

const GetTokenUrl = 'https://public-api.solscan.io/account/tokens'
const GetMetaDataUrl = 'https://api.all.art/v1/solana/'

const ConnectWallet = () => {
  const { publicKey } = useWallet();
  // const [accountCnt, setAccountCnt] = useState(0);
  const [metaplexList, setMetaplexList] = useState([]);

  useEffect(() => {
    if (publicKey) loadMetaData(publicKey.toBase58())
  }, [publicKey])

  const loadMetaData = async (publicKey) => {
    try {
      const info = await axios.get(GetTokenUrl, {
        params: { account: publicKey },
      })
      // setAccountCnt(info.data.length)
      console.log(info.data)
      _.map(info.data, async (each) => {
        const metadata = await axios.get(GetMetaDataUrl + each.tokenAddress)
        console.log(metadata)
        const metaList = metaplexList
        if(!_.find(metaList, {Pubkey: _.get(metadata, "data.Pubkey", "")})){
          metaList.push(metadata.data)
          setMetaplexList(metaList)
        }
      })
    } catch (err) {}
  }

  const renderMetaDataContainer = () => {
    return _.map(metaplexList, (each, index)=>{
      return (<Grid item xs={2} sm={4} md={4} key={index}>
          <Card style={{width: 300, height: 500}}>
            <CardHeader title={_.get(each,"Title","")} subheader={`Symbol: ${_.get(each, "Properties.symbol", "Unknow")}`} />
            <CardMedia
              component="img"
              height="300"
              image={_.get(each, "Preview_URL", "")}
              alt={_.get(each, "Preview_URL", "") !== "" ? "Loading..." : "Unknown Image"}
            />
            <CardContent>
              <Typography variant="body2">
                {_.get(each, "Description", "")}
              </Typography>
            </CardContent>
          </Card>
      </Grid>)
    })
  }

  return (
    <div className="wallet-container">
      <h1>My Residences</h1>
      <br />
      <h4>A place for you to view every place you own</h4>
      <WalletMultiButton style={{ marginTop: 70 }} />
      <Grid style={{marginTop: 100}} container columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center">
        {renderMetaDataContainer()}
      </Grid>
    </div>
  )
}

export default ConnectWallet
