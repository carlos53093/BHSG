import { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'

const GetTokenUrl = 'https://public-api.solscan.io/account/tokens'
const GetMetaDataUrl = 'https://api.all.art/v1/solana/'

const useConnectWallet = () => {
  const [metaData, setMetaData]  = useState()
  const [tokenInfo, setTokenInfo] = useState([])

  const loadMetaData = async (publicKey) => {
    try {
      const info = await axios.get(GetTokenUrl, {
        params: { account: publicKey },
      })
      // setAccountCnt(info.data.length)
      console.log(info.data)
      setTokenInfo(info.data)
      _.map(info.data, async (each) => {
        const temp = await axios.get(GetMetaDataUrl + each.tokenAddress)
        setMetaData(temp)
        console.log("LoadMetadata------",temp)
        //   if(!_.find(metaList, {Pubkey: _.get(metadata, "data.Pubkey", "")})){
        // metaList.push(metadata.data)
        //   }
      })
    } catch (err) {}
  }

  return { metaData, loadMetaData, tokenInfo }
}

export default useConnectWallet
