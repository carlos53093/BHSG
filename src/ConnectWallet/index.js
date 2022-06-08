// import "./Styles.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useMemo, useState } from "react";
import _ from "lodash";
import { Card, CardMedia, Box, Grid, Typography } from "@material-ui/core";
import useConnectWallet from "../hooks/LoadingMetaData";
import mintList1 from "../SPCACESHIP_LIST.json";
// import mintList2 from "../MINT_LIST_2.json";
// import mintList3 from "../MINT_LIST_3.json";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAdmin } from "../actions/UserInfo";
import styled from "styled-components";
import spaceList from "../SPIDER_LIST.json";
import HomeBg from "../assets/images/home-bg.png";
import AssetImage from "../assets/images/Asset 1 3.png";
import Loading from "../assets/images/loading.png";
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };
const RootStyled = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${HomeBg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "end",
  "& .card-main": {
    background:
      "linear-gradient(180deg, #070707 0%, rgba(32, 32, 33, 0.07) 100%)",
    borderRadius: "30px 30px 0 0",
    maxWidth: 1080,
    width: "100%",
    margin: "0 auto",
    maxHeight: `calc(100vh - 15vh)`,

    height: "100%",
    overflow: "hidden",
    "& > div": {
      padding: "56px 71px",
    },
    "& .img-asset": {
      maxWidth: "118px",
      // height: "100%",
    },
    "& .heading-main": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "2px solid #fff",
      paddingBottom: "10px",
      "& .heading": {
        fontFamily: "Punc-Regular",
        fontSize: "2rem",
      },
      img: {
        width: "20%",
        height: "100%",
      },
    },
  },
}));
const Wrapper = styled(Box)`
  max-width: 700px;
  padding: 30px;
  overflow-x: auto;
`;

const ConnectWallet = () => {
  const { publicKey } = useWallet();
  const {
    loadTokenAddressList,
    tokenInfo,
    loadTokenInfo,
    metaData,
    setMetaData,
    metaDataList,
    setMetaDataList,
    loadMetaData,
  } = useConnectWallet();
  const [defaultTokenInfo, setDefaultTokenInfo] = useState(null);
  const [bountyTokenList, setBountyTokenList] = useState([]);
  const dispatch = useAppDispatch();
  const [spaceShip, setSpaceShip] = useState([]);

  useEffect(() => {
    setMetaData(null);
    setMetaDataList([]);
    if (publicKey) {
      dispatch(setAdmin(false));
      loadTokenAddressList(publicKey.toBase58());
      loadMetaData(publicKey.toBase58());
    }
  }, [publicKey]);

  useEffect(() => {
    if (!metaData) return;
    if (spaceList.indexOf(metaData.data.Mint) !== -1) {
      const newMetaList = _.cloneDeep(spaceShip);
      newMetaList.push(metaData.data);
      setSpaceShip(newMetaList);
    }
  }, [metaData]);

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
        setBountyTokenList(tokenAddress);
        loadTokenInfo(tokenAddress);
      }
    })();
  }, [tokenInfo]);

  useMemo(() => {
    (async () => {
      if (!metaDataList || !metaDataList.length) return;
      // const mapObj = {
      //   '#':'',
      //   ' ':'-'
      // };
      // const url = _.replace(metaData.Title, / |#/gi, function(matched){
      //   return mapObj[matched];
      // });
      const _defaultAddress = [];
      _.map(metaDataList, (each) => {
        _defaultAddress.push(each.Mint);
      });
      const res = await axios.post(
        process.env.REACT_APP_PROXY_URL + "nftlist",
        {
          walletAddr: publicKey.toBase58(),
          defaultTokenAddress: _defaultAddress,
          // url: url,
          tokenInfo: bountyTokenList,
        }
      );
      setDefaultTokenInfo(res.data);
    })();
  }, [metaDataList]);

  const RenderMetaDataContainer = () => {
    const ref = useRef(null);
    const [offsetTop, setOffsetTop] = useState(0);
    // if (!metaDataList || !defaultTokenInfo) return null;
    useEffect(() => {
      if (ref.current) {
        setOffsetTop(ref.current.offsetTop);
      }
    }, []);
    return (
      <Grid container spacing={2}>
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
          <img src={AssetImage} className="img-asset" />
        </Grid>
        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
          <Box className="heading-main">
            <Typography variant="h2" className="heading">
              SPACESHIPS
            </Typography>
            <img src={Loading} />
          </Box>

          {/* <Box display="flex" width="fit-content"> */}
          <Box py={1} />
          <Grid
            container
            spacing={2}
            ref={ref}
            style={{
              maxHeight: `calc(100vh - ${offsetTop}px)`,
              overflowY: "auto",
              height: "100%",
              paddingBottom: 70,
            }}
          >
            {_.map(metaDataList, (each, key) => {
              // const title = _.replace(each.Title, " ", "_");
              const mapObj = {
                "#": "",
                " ": "-",
              };
              const title = _.replace(each.Title, / |#/gi, function (matched) {
                return mapObj[matched];
              });
              return (
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
                  <Card
                    // className="card-container"
                    style={{
                      font: "10px important",
                      borderRadius: 10,
                      boxShadow: "0px 1px 20px 3px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <Link to={`room/${title}`}>
                      <CardMedia
                        component="img"
                        style={{
                          width: "250px",
                          height: "210px",
                        }}
                        key={key}
                        image={_.get(each, "Preview_URL", "")}
                        alt={
                          _.get(each, "Preview_URL", "") !== ""
                            ? "Loading..."
                            : "Unknown Image"
                        }
                      />
                    </Link>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          {/* </Box> */}
        </Grid>
      </Grid>
    );
  };

  return (
    <RootStyled>
      <WalletMultiButton style={{ marginTop: 70 }} />
      <Box className="card-main">
        <div>{RenderMetaDataContainer()}</div>
      </Box>
    </RootStyled>
  );
};

export default ConnectWallet;
