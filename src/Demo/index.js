import React, { useEffect, useState, useMemo } from "react";
import "./Styles.css";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Box,
  Container,
  Grid,
  Link,
  AppBar,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

import SwipeableViews from "react-swipeable-views";
import styled from "styled-components";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "../utils/icon";
import useConnectWallet from "../hooks/LoadingMetaData";

import mintList1 from "../MINT_LIST_1.json";
// import mintList2 from '../MINT_LIST_2.json'
// import mintList3 from '../MINT_LIST_3.json'
import spaceList from "../SPCACESHIP_LIST.json";
import spiderList from "../SPIDER_LIST.json";
import axios from "axios";

import { Link as RouterLink } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

function HomeIcon(props) {
  return (
    <SvgIcon
      {...props}
      width="238"
      height="216"
      viewBox="0 0 238 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_460_343)">
        <path
          d="M30.8867 112C29.1004 108.906 29.1004 105.094 30.8868 102L70.1132 34.0577C71.8996 30.9637 75.2008 29.0577 78.7735 29.0577H157.227C160.799 29.0577 164.1 30.9637 165.887 34.0577L205.113 102C206.9 105.094 206.9 108.906 205.113 112L165.887 179.942C164.1 183.036 160.799 184.942 157.227 184.942H78.7735C75.2008 184.942 71.8996 183.036 70.1132 179.942L30.8867 112Z"
          fill="#80A9BD"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_460_343"
          x="0.546875"
          y="0.0576172"
          width="236.906"
          height="215.885"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="15" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.582448 0 0 0 0 0.807954 0 0 0 0 0.879167 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_460_343"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_460_343"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Wrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 100px);
  padding-top: 100px;
  background: url("/abstract-hexagon-pattern-molecular-sci-600w-455480596 4.png")
    no-repeat center center;
  background-size: cover;
  & .heading {
    font-size: 54px;
    margin-bottom: 40px;
    font-family: Punc-Regular;
    line-height: 0.9;
    @media screen and (max-width: 1560px) {
      font-size: 46px;
    }
  }
  & .description {
    font-size: 16px;
    font-family: Saira;
    margin-top: 30px;
    color: #8fbac8;
  }
  & .ship-image {
    box-shadow: 0px 1px 20px 3px rgba(83, 194, 230, 0.4);
    object-fit: cover;
    border-radius: 10px;
    @media screen and (max-width: 1560px) {
      height: 280px;
      border-radius: 8px;
    }
  }
  & .link-left {
    margin-top: 30px;
    display: block;
    font-family: Saira;
    color: #8fbac8;
    text-decoration: underline;
  }
  & .tabs-bar {
    box-shadow: none;
    & .MuiTab-root.MuiTab-textColorPrimary {
      font-family: Saira;
      font-size: 20px;
    }
  }
  & .polygone-main {
    width: 180px;
    cursor: pointer;
    position: relative;
    margin: 0 auto;
    & .svg-bg {
      width: 180px;
      height: 180px;
      path {
        fill: #0d1e29;
      }
    }
    & .react-svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      svg {
        width: 60px;
        height: 60px;
      }
    }
    &.active {
      & .svg-bg {
        path {
          fill: #80a9bd;
        }
      }
      & .react-svg {
        path {
          fill: #fff;
          stroke: #fff;
        }
        circle {
          stroke: #fff;
        }
      }
    }
  }
  & .MuiTabs-flexContainer {
    border-bottom: 2px solid rgba(155, 189, 215, 0.6);
  }
  & .tab-panel-main {
    & > div {
      padding-left: 0;
      padding-right: 0;
    }
  }
  & .grid-container {
    margin: -16px;
    & .image-container {
      object-fit: cover;
      height: 250px;
      border-radius: 10px;
      @media screen and (max-width: 1560px) {
        height: 200px;
        border-radius: 6px;
      }
    }
  }
`;

const ConnectWallet = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const {
    match: { params },
  } = props;
  const { url } = params;

  const { publicKey } = useWallet();

  const [metaplexList, setMetaplexList] = useState([]);
  const [metaplexList1, setMetaplexList1] = useState([]);
  // const [metaplexList2, setMetaplexList2] = useState([])
  // const [metaplexList3, setMetaplexList3] = useState([])
  const [metaplexListOther, setMetaplexListOther] = useState([]);
  const [spaceShip, setSpaceShip] = useState([]);
  const [spider, setSpider] = useState([]);
  const {
    metaData,
    loadMetaData,
    metaDataList,
    loadTokenInfo,
    tokenInfo,
    loadMetadataByWallet,
  } = useConnectWallet();
  const [bountyTokenList, setBountyTokenList] = useState([]);
  const [defaultTokenInfo, setDefaultTokenInfo] = useState(null);

  useMemo(() => {
    if (defaultTokenInfo === null) return;
    (async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_PROXY_URL + "nftlist/" + defaultTokenInfo.url,
          config
        );
        loadMetaData(res.data.walletAddr);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [defaultTokenInfo]);

  useEffect(() => {
    if (!publicKey) return;
    if (publicKey) {
      loadMetadataByWallet(publicKey.toBase58());
    }
  }, []);

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
          // url: defaultTokenInfo.url,
          tokenInfo: bountyTokenList,
        }
      );
      setDefaultTokenInfo(res.data);
    })();
  }, [metaDataList]);

  useEffect(() => {
    if (
      !_.find(metaplexList, { Pubkey: _.get(metaData, "data.Pubkey", "") }) &&
      metaData
    ) {
      if (mintList1.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(metaplexList1);
        newMetaList.push(metaData.data);
        setMetaplexList1(newMetaList);
      } else if (spaceList.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(spaceShip);
        newMetaList.push(metaData.data);
        setSpaceShip(newMetaList);
      } else if (spiderList.indexOf(metaData.data.Mint) !== -1) {
        const newMetaList = _.cloneDeep(spider);
        newMetaList.push(metaData.data);
        setSpider(newMetaList);
      } else {
        const newMetaList = _.cloneDeep(metaplexListOther);
        newMetaList.push(metaData.data);
        setMetaplexListOther(newMetaList);
      }
      const newMetaList = _.cloneDeep(metaplexList);
      newMetaList.push(metaData.data);
      setMetaplexList(newMetaList);
    }
  }, [metaData]);
  const renderMetaDataContainer = (data, title, isLink) => {
    if (data.length === 0) return null;
    let len = 0;
    _.map(data, (each) => {
      if (!_.isEmpty(each)) len++;
    });
    return (
      <Grid container spacing={2} className="grid-container">
        {_.map(data, (each, index) => {
          if (_.isEmpty(each)) return null;
          const mapObj = {
            "#": "",
            " ": "-",
          };
          const title = _.replace(each.Title, / |#/gi, function (matched) {
            return mapObj[matched];
          });
          return (
            <Grid key={index} item xl={3} lg={3}>
              <Link
                to={isLink ? `/room/${title}` : "#"}
                style={{ textDecoration: "none" }}
                component={RouterLink}
              >
                <Box
                  component="img"
                  src={_.get(each, "Preview_URL", "")}
                  alt={
                    _.get(each, "Preview_URL", "") !== ""
                      ? "Loading..."
                      : "Unknown Image"
                  }
                  width="100%"
                  height={250}
                  className="image-container"
                />
                {/* <Card
                  style={{
                    font: "10px important",
                    width: 250,
                    height: 550,
                    boxShadow: "#26b8e9 0px 0 10px 0px",
                    borderRadius: 10,
                  }}
                >
                  <CardHeader
                    title={_.get(each, "Title", "")}
                    subheader={`Symbol: ${_.get(
                      each,
                      "Properties.symbol",
                      "Unknow"
                    )}`}
                    style={{ height: "100px" }}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image={_.get(each, "Preview_URL", "")}
                    alt={
                      _.get(each, "Preview_URL", "") !== ""
                        ? "Loading..."
                        : "Unknown Image"
                    }
                  />
                  <CardContent>
                    <Box overflow="auto" height="150px" paddingRight="10px">
                      <Typography
                        variant="subtitle2"
                        style={{ textOverflow: "ellipsis", paddingBottom: 10 }}
                      >
                        {_.get(each, "Description", "")}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card> */}
              </Link>
            </Grid>
          );
        })}
      </Grid>
    );
  };
  return (
    <Wrapper>
      <Container fixed className="container-listing">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            {/* <Box>
              {_.map(spaceShip, (each, key) => {
                const mapObj = {
                  "#": "",
                  " ": "-",
                };
                const title = _.replace(
                  each.Title,
                  / |#/gi,
                  function (matched) {
                    return mapObj[matched];
                  }
                );
                if (title === params.url) {
                  return (
                    <div style={{ textAlign: "center" }}>
                      <h3>{title}</h3>
                      <Card
                        className="card-view-container"
                        style={{ font: "10px important", borderRadius: 10 }}
                      >
                        <CardMedia
                          component="img"
                          style={{ width: "250px", height: "250px" }}
                          key={key}
                          image={_.get(each, "Preview_URL", "")}
                          alt={
                            _.get(each, "Preview_URL", "") !== ""
                              ? "Loading..."
                              : "Unknown Image"
                          }
                        />
                      </Card>
                    </div>
                  );
                }
              })}
            </Box> */}
            <Typography variant="h3" gutterBottom className="heading">
              BOUNty HUNteR SPacE GUIlD
            </Typography>
            {_.map(spaceShip, (each, key) => {
              const mapObj = {
                "#": "",
                " ": "-",
              };
              const title = _.replace(each.Title, / |#/gi, function (matched) {
                return mapObj[matched];
              });
              if (title === params.url) {
                return (
                  <Box
                    component="img"
                    src={_.get(each, "Preview_URL", "")}
                    alt={
                      _.get(each, "Preview_URL", "") !== ""
                        ? "Loading..."
                        : "Unknown Image"
                    }
                    width="100%"
                    height={324}
                    className="ship-image"
                  />
                );
              }
            })}

            <Typography gutterBottom className="description">
              Spaceships showcase acquired Bounties (NFTs), Bounty Hunters,
              Black Market items, and other owned Spaceships.
            </Typography>
            <Typography gutterBottom className="description">
              Spaceships are completely 3D modelled and can eventually be
              piloted in whatever Metaverse you choose.
            </Typography>
            <Link href="" target="_blank" className="link-left">
              www.bountyhunterspaceguild.com
            </Link>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2} justifyContent="center">
              {["Prisoners SVG", "Group 48", "Group 49", "Prisoners SVG"].map(
                (v, i) => (
                  <Grid xl={3} lg={3} key={Math.random()}>
                    <Box
                      onClick={() => setValue(i)}
                      className={`polygone-main ${value === i ? "active" : ""}`}
                    >
                      <HomeIcon className="svg-bg" />
                      <Icon path={v} className={`react-svg`} />
                    </Box>
                  </Grid>
                )
              )}
            </Grid>

            <div>
              <AppBar
                position="static"
                color="transparent"
                className="tabs-bar"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="bounty Hunters" {...a11yProps(0)} />
                  <Tab label="Black Market" {...a11yProps(1)} />
                  <Tab label="Spaceships" {...a11yProps(2)} />
                  <Tab label="Bounties" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
              <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} className="tab-panel-main">
                  {renderMetaDataContainer(metaplexList1, "Bounty Hunter")}
                </TabPanel>
                <TabPanel value={value} index={1} className="tab-panel-main">
                  {renderMetaDataContainer(spider, "Spider")}
                </TabPanel>
                <TabPanel value={value} index={2} className="tab-panel-main">
                  {renderMetaDataContainer(spaceShip, "SpaceShip", true)}
                </TabPanel>
                <TabPanel value={value} index={3} className="tab-panel-main">
                  {renderMetaDataContainer(metaplexListOther, "Other")}
                </TabPanel>
              </SwipeableViews>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default ConnectWallet;
