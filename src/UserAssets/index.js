import './Styles.css'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'
import useConnectWallet from '../hooks/LoadingMetaData'

import mintList1 from '../MINT_LIST_1.json'
import mintList2 from '../MINT_LIST_2.json'
import mintList3 from '../MINT_LIST_3.json'
import axios from 'axios'

import Carousel from '../Carousel2/Carousel'

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

  const [metaplexList, setMetaplexList] = useState([])
  const [metaplexList1, setMetaplexList1] = useState([])
  const [metaplexList2, setMetaplexList2] = useState([])
  const [metaplexList3, setMetaplexList3] = useState([])
  const [metaplexListOther, setMetaplexListOther] = useState([])
  const { metaData, loadMetaData } = useConnectWallet()

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PROXY_URL + 'nftlist/' + url,
          config,
        )
        loadMetaData(res.data.walletAddr)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    if (
      !_.find(metaplexList, { Pubkey: _.get(metaData, 'data.Pubkey', '') }) &&
      metaData
    ) {
      if (mintList1.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(metaplexList1)
        newMetaList.push(metaData.data)
        setMetaplexList1(newMetaList)
      } else if (mintList2.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(metaplexList2)
        newMetaList.push(metaData.data)
        setMetaplexList2(newMetaList)
      } else if (mintList3.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(metaplexList3)
        newMetaList.push(metaData.data)
        setMetaplexList3(newMetaList)
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

  const renderMetaDataContainer = (data, title) => {
    if (data.length === 0) return null
    return (
      <Carousel show={5} title={title}>
        {_.map(data, (each, index) => {
          return (
            <div key={index} style={{ margin: '10px 20px' }}>
              <Card
                style={{
                  font: '10px important',
                  width: 250,
                  height: 450,
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
                  <Typography
                    variant="subtitle2"
                    style={{ textOverflow: 'ellipsis', paddingBottom: 10 }}
                  >
                    {_.get(each, 'Description', '')}
                  </Typography>
                </CardContent>
              </Card>
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
      {renderMetaDataContainer(metaplexList1, 'Group1')}
      {renderMetaDataContainer(metaplexList2, 'Group2')}
      {renderMetaDataContainer(metaplexList3, 'Group3')}
      {renderMetaDataContainer(metaplexListOther, 'Other')}
    </div>
  )
}

export default UserAssets
