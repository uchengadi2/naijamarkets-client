import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { useParams } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import CircularProgress from "@material-ui/core/CircularProgress";

import api from "./../apis/local";
import CallToAction from "./ui/CallToAction";
import animationData from "./../animations/landinganimation/data";

import revolutionBackground from "./../assets/repeatingBackground.svg";
import infoBackground from "./../assets/infoBackground.svg";

import background from "./../assets/images/covers/main-cover.png";
import UpperFooter from "./ui/UpperFooter";
import TopCover from "./homePageCards/TopCover";
import LearningPath from "./homePageCards/LearningPath";
import ShoppingPreferences from "./homePageCards/ShoppingPreferences";

//import mobileBackground from "./../../assets/mobileBackground.jpg";

import AllCourses from "./homePageCards/AllCourses";
import AllProducts from "./homePageCards/AllProducts";

import { baseURL } from "./../apis/util";
import TopCoverCommunity from "./homePageCards/TopCoverCommunity";
import TopCoverDeal from "./homePageCards/TopCoverDeal";
import FreezingPriceAdMainHome from "./homePageCards/FreezingPriceAdMainHome";
import FreezePriceAdCommunityPage from "./homePageCards/FreezePriceAdCommunityPage";
import FreezePriceAdDealPage from "./homePageCards/FreezePriceAdDealPage";
import DealPropositionPage from "./deals/DealPropositionPage";
import DealSearchBox from "./deals/DealSearchBox";
import heroVideo from "./../assets/video/background_video.mp4";
import heroVideoMobile from "./../assets/video/background_video_mobile.mp4";
import EntityTopCover from "./entities/EntityTopCover";
import EntityPurchaseSchemes from "./deals/EntityPurchaseSchemes";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  rootMobile: {
    maxWidth: "100%",
    width: "100%",

    height: "80vh",
    // height: "100%",
    marginTop: "8em",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  overlayMobile: {
    position: "absolute",
    top: 0,
    left: 0,
    //width: "99rem",
    width: "100%",
    height: 60,

    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 250,
    marginRight: 10,
    marginLeft: 130,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "1.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 250,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },

  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  // background: {
  //   backgroundImage: `url(${background})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   //backgroundAttachment: "fixed",
  //   backgroundRepeat: "no-repeat",
  //   height: "17em",
  //   width: "100%",
  //   [theme.breakpoints.down("md")]: {
  //     // backgroundImage: `url(${mobileBackground})`,
  //     backgroundAttachment: "inherit",
  //   },
  // },
  backgroundMobile: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    //height: "28em",
    height: "17em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
}));

const Entities = (props) => {
  const classes = useStyles();
  const params = useParams();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [coursesList, setCourseList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const [isLoading, setIsLoading] = useState(null);
  const [updateShoppingPath, setUpdateShoppingPath] = useState(false);
  const [updateBuyingPath, setUpdateBuyingPath] = useState(false);
  const [path, setPath] = useState("community");
  const [deal, setDeal] = useState("");
  const [updateDeal, setUpdateDeal] = useState(false);
  const [dealCode, setDealCode] = useState(null);
  const [preference, setPreference] = useState("all");
  //const [path, setPath] = useState("retail");
  const [policy, setPolicy] = useState();
  const [currency, setCurrency] = useState();
  const [numberOfDeals, setNumberOfDeals] = useState();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const entity = params.entity;

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const updatePathHandler = (value) => {
    setPath(value);
  };

  const updatePreferenceHandler = (value) => {
    setPreference(value);
  };

  const dealHandler = (value) => {
    setDeal(value);
  };

  const updateShoppingPathInfoInfo = () => {
    setUpdateShoppingPath((prevState) => !prevState);
  };

  const updateDealHandler = () => {
    setUpdateDeal((prevState) => !prevState);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];

      //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (entity) {
        if (preference === "all") {
          const response = await api.get("/products?sort=desc", {
            params: {
              displayOnStore: "yes",
              salesPreference: "deal",
              dealSlug: entity,
            },
          });
          const workingData = response.data.data.data;
          workingData.map((product) => {
            allData.push({
              id: product._id,
              name: product.name,
              image: product.imageCover,
              shortDescription: product.shortDescription,
              fullDescription: product.fullDescription,
              pricePerUnit: product.pricePerUnit,
              category: product.category,
              minimumQuantity: product.minimumQuantity,
              currency: product.currency,
              unit: product.unit,
              isFeaturedProduct: product.isFeaturedProduct,
              configuration: product.configuration,
              displayOnStore: product.displayOnStore,
              brand: product.brand,
              salesPreference: product.salesPreference,
              keyword1: product.keyword1,
              keyword2: product.keyword2,
              keyword3: product.keyword3,
              slug: product.slug,
              images: product.images,
              sku: product.sku,
              pricingMechanism: product.pricingMechanism,
              priceLabel: product.priceLabel,
              weightPerUnit: product.weightPerUnit,
              stockStatus: product.stockStatus,
              allowSubscription: product.allowSubscription,
              isVatable: product.isVatable,
              hasVariant: product.hasVariant,
              barcode: product.barcode,
              marketPricingCondition: product.marketPricingCondition,
              deliverability: product.deliverability,
              pickupInfo: product.pickupInfo,
              allowPriceFreezing: product.allowPriceFreezing,
              allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
              freezedPriceLowBound: product.freezedPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
              freezedPriceMaximumDurationInWeeks:
                product.freezedPriceMaximumDurationInWeeks,
              minimumFreezableQuantity: product.minimumFreezableQuantity,
              datePriceWasSet: product.datePriceWasSet,
              dealCode: product.dealCode,
              dealExpiryDate: product.dealExpiryDate,
              dealType: product.dealType,
              showDealPricePerUnit: product.showDealPricePerUnit,
              allowDealQuantityChange: product.allowDealQuantityChange,
              dealStatus: product.dealStatus,
              dealComment: product.dealComment,

              dealDeliveryMode: product.dealDeliveryMode,
              dealCentralizedDeliveryLocation:
                product.dealCentralizedDeliveryLocation,
              dealCentralizedAgreedDeliveryCost:
                product.dealCentralizedAgreedDeliveryCost,
              dealDecentralizedDeliveryLocation:
                product.dealDecentralizedDeliveryLocation,
              dealDecentralizedAgreedDeliveryCost:
                product.dealDecentralizedAgreedDeliveryCost,
              showDealDeliveryCost: product.showDealDeliveryCost,
              productType: product.productType,
              dealPaymentPreference: product.dealPaymentPreference,
              showDealPaymentDetails: product.showDealPaymentDetails,
              requestDealRedemptionCode: product.requestDealRedemptionCode,
              isAContributoryDeal: product.isAContributoryDeal,
              dealOwnerEntity: product.dealOwnerEntity,
              dealOwner: product.dealOwner,
              dealInitialPercentageContribution:
                product.dealInitialPercentageContribution,
              dealMaximumInstallmentAllowed:
                product.dealMaximumInstallmentAllowed,
              includeGatewayChargesInPrice:
                product.includeGatewayChargesInPrice,
              gatewayFixedCharge: product.gatewayFixedCharge,
              gatewayRateCharge: product.gatewayRateCharge,
              isACreditDeal: product.isACreditDeal,
              preferredEntityVariant: product.preferredEntityVariant,
              dealSlug: product.dealSlug,
            });
          });
        } else if (preference === "regular") {
          const response = await api.get("/products?sort=desc", {
            params: {
              displayOnStore: "yes",
              salesPreference: "deal",
              dealSlug: entity,
              isACreditDeal: false,
              isAContributoryDeal: false,
            },
          });
          const workingData = response.data.data.data;
          workingData.map((product) => {
            allData.push({
              id: product._id,
              name: product.name,
              image: product.imageCover,
              shortDescription: product.shortDescription,
              fullDescription: product.fullDescription,
              pricePerUnit: product.pricePerUnit,
              category: product.category,
              minimumQuantity: product.minimumQuantity,
              currency: product.currency,
              unit: product.unit,
              isFeaturedProduct: product.isFeaturedProduct,
              configuration: product.configuration,
              displayOnStore: product.displayOnStore,
              brand: product.brand,
              salesPreference: product.salesPreference,
              keyword1: product.keyword1,
              keyword2: product.keyword2,
              keyword3: product.keyword3,
              slug: product.slug,
              images: product.images,
              sku: product.sku,
              pricingMechanism: product.pricingMechanism,
              priceLabel: product.priceLabel,
              weightPerUnit: product.weightPerUnit,
              stockStatus: product.stockStatus,
              allowSubscription: product.allowSubscription,
              isVatable: product.isVatable,
              hasVariant: product.hasVariant,
              barcode: product.barcode,
              marketPricingCondition: product.marketPricingCondition,
              deliverability: product.deliverability,
              pickupInfo: product.pickupInfo,
              allowPriceFreezing: product.allowPriceFreezing,
              allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
              freezedPriceLowBound: product.freezedPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
              freezedPriceMaximumDurationInWeeks:
                product.freezedPriceMaximumDurationInWeeks,
              minimumFreezableQuantity: product.minimumFreezableQuantity,
              datePriceWasSet: product.datePriceWasSet,
              dealCode: product.dealCode,
              dealExpiryDate: product.dealExpiryDate,
              dealType: product.dealType,
              showDealPricePerUnit: product.showDealPricePerUnit,
              allowDealQuantityChange: product.allowDealQuantityChange,
              dealStatus: product.dealStatus,
              dealComment: product.dealComment,

              dealDeliveryMode: product.dealDeliveryMode,
              dealCentralizedDeliveryLocation:
                product.dealCentralizedDeliveryLocation,
              dealCentralizedAgreedDeliveryCost:
                product.dealCentralizedAgreedDeliveryCost,
              dealDecentralizedDeliveryLocation:
                product.dealDecentralizedDeliveryLocation,
              dealDecentralizedAgreedDeliveryCost:
                product.dealDecentralizedAgreedDeliveryCost,
              showDealDeliveryCost: product.showDealDeliveryCost,
              productType: product.productType,
              dealPaymentPreference: product.dealPaymentPreference,
              showDealPaymentDetails: product.showDealPaymentDetails,
              requestDealRedemptionCode: product.requestDealRedemptionCode,
              isAContributoryDeal: product.isAContributoryDeal,
              dealOwnerEntity: product.dealOwnerEntity,
              dealOwner: product.dealOwner,
              dealInitialPercentageContribution:
                product.dealInitialPercentageContribution,
              dealMaximumInstallmentAllowed:
                product.dealMaximumInstallmentAllowed,
              includeGatewayChargesInPrice:
                product.includeGatewayChargesInPrice,
              gatewayFixedCharge: product.gatewayFixedCharge,
              gatewayRateCharge: product.gatewayRateCharge,
              isACreditDeal: product.isACreditDeal,
              preferredEntityVariant: product.preferredEntityVariant,
              dealSlug: product.dealSlug,
            });
          });
        } else if (preference === "target") {
          const response = await api.get("/products?sort=desc", {
            params: {
              displayOnStore: "yes",
              salesPreference: "deal",
              dealSlug: entity,
              isACreditDeal: false,
              isAContributoryDeal: true,
            },
          });
          const workingData = response.data.data.data;
          workingData.map((product) => {
            allData.push({
              id: product._id,
              name: product.name,
              image: product.imageCover,
              shortDescription: product.shortDescription,
              fullDescription: product.fullDescription,
              pricePerUnit: product.pricePerUnit,
              category: product.category,
              minimumQuantity: product.minimumQuantity,
              currency: product.currency,
              unit: product.unit,
              isFeaturedProduct: product.isFeaturedProduct,
              configuration: product.configuration,
              displayOnStore: product.displayOnStore,
              brand: product.brand,
              salesPreference: product.salesPreference,
              keyword1: product.keyword1,
              keyword2: product.keyword2,
              keyword3: product.keyword3,
              slug: product.slug,
              images: product.images,
              sku: product.sku,
              pricingMechanism: product.pricingMechanism,
              priceLabel: product.priceLabel,
              weightPerUnit: product.weightPerUnit,
              stockStatus: product.stockStatus,
              allowSubscription: product.allowSubscription,
              isVatable: product.isVatable,
              hasVariant: product.hasVariant,
              barcode: product.barcode,
              marketPricingCondition: product.marketPricingCondition,
              deliverability: product.deliverability,
              pickupInfo: product.pickupInfo,
              allowPriceFreezing: product.allowPriceFreezing,
              allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
              freezedPriceLowBound: product.freezedPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
              freezedPriceMaximumDurationInWeeks:
                product.freezedPriceMaximumDurationInWeeks,
              minimumFreezableQuantity: product.minimumFreezableQuantity,
              datePriceWasSet: product.datePriceWasSet,
              dealCode: product.dealCode,
              dealExpiryDate: product.dealExpiryDate,
              dealType: product.dealType,
              showDealPricePerUnit: product.showDealPricePerUnit,
              allowDealQuantityChange: product.allowDealQuantityChange,
              dealStatus: product.dealStatus,
              dealComment: product.dealComment,

              dealDeliveryMode: product.dealDeliveryMode,
              dealCentralizedDeliveryLocation:
                product.dealCentralizedDeliveryLocation,
              dealCentralizedAgreedDeliveryCost:
                product.dealCentralizedAgreedDeliveryCost,
              dealDecentralizedDeliveryLocation:
                product.dealDecentralizedDeliveryLocation,
              dealDecentralizedAgreedDeliveryCost:
                product.dealDecentralizedAgreedDeliveryCost,
              showDealDeliveryCost: product.showDealDeliveryCost,
              productType: product.productType,
              dealPaymentPreference: product.dealPaymentPreference,
              showDealPaymentDetails: product.showDealPaymentDetails,
              requestDealRedemptionCode: product.requestDealRedemptionCode,
              isAContributoryDeal: product.isAContributoryDeal,
              dealOwnerEntity: product.dealOwnerEntity,
              dealOwner: product.dealOwner,
              dealInitialPercentageContribution:
                product.dealInitialPercentageContribution,
              dealMaximumInstallmentAllowed:
                product.dealMaximumInstallmentAllowed,
              includeGatewayChargesInPrice:
                product.includeGatewayChargesInPrice,
              gatewayFixedCharge: product.gatewayFixedCharge,
              gatewayRateCharge: product.gatewayRateCharge,
              isACreditDeal: product.isACreditDeal,
              preferredEntityVariant: product.preferredEntityVariant,
              dealSlug: product.dealSlug,
            });
          });
        } else if (preference === "credit") {
          const response = await api.get("/products?sort=desc", {
            params: {
              displayOnStore: "yes",
              salesPreference: "deal",
              dealSlug: entity,
              isACreditDeal: true,
              isAContributoryDeal: true,
            },
          });
          const workingData = response.data.data.data;
          workingData.map((product) => {
            allData.push({
              id: product._id,
              name: product.name,
              image: product.imageCover,
              shortDescription: product.shortDescription,
              fullDescription: product.fullDescription,
              pricePerUnit: product.pricePerUnit,
              category: product.category,
              minimumQuantity: product.minimumQuantity,
              currency: product.currency,
              unit: product.unit,
              isFeaturedProduct: product.isFeaturedProduct,
              configuration: product.configuration,
              displayOnStore: product.displayOnStore,
              brand: product.brand,
              salesPreference: product.salesPreference,
              keyword1: product.keyword1,
              keyword2: product.keyword2,
              keyword3: product.keyword3,
              slug: product.slug,
              images: product.images,
              sku: product.sku,
              pricingMechanism: product.pricingMechanism,
              priceLabel: product.priceLabel,
              weightPerUnit: product.weightPerUnit,
              stockStatus: product.stockStatus,
              allowSubscription: product.allowSubscription,
              isVatable: product.isVatable,
              hasVariant: product.hasVariant,
              barcode: product.barcode,
              marketPricingCondition: product.marketPricingCondition,
              deliverability: product.deliverability,
              pickupInfo: product.pickupInfo,
              allowPriceFreezing: product.allowPriceFreezing,
              allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
              freezedPriceLowBound: product.freezedPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
              chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
                product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
              freezedPriceMaximumDurationInWeeks:
                product.freezedPriceMaximumDurationInWeeks,
              minimumFreezableQuantity: product.minimumFreezableQuantity,
              datePriceWasSet: product.datePriceWasSet,
              dealCode: product.dealCode,
              dealExpiryDate: product.dealExpiryDate,
              dealType: product.dealType,
              showDealPricePerUnit: product.showDealPricePerUnit,
              allowDealQuantityChange: product.allowDealQuantityChange,
              dealStatus: product.dealStatus,
              dealComment: product.dealComment,

              dealDeliveryMode: product.dealDeliveryMode,
              dealCentralizedDeliveryLocation:
                product.dealCentralizedDeliveryLocation,
              dealCentralizedAgreedDeliveryCost:
                product.dealCentralizedAgreedDeliveryCost,
              dealDecentralizedDeliveryLocation:
                product.dealDecentralizedDeliveryLocation,
              dealDecentralizedAgreedDeliveryCost:
                product.dealDecentralizedAgreedDeliveryCost,
              showDealDeliveryCost: product.showDealDeliveryCost,
              productType: product.productType,
              dealPaymentPreference: product.dealPaymentPreference,
              showDealPaymentDetails: product.showDealPaymentDetails,
              requestDealRedemptionCode: product.requestDealRedemptionCode,
              isAContributoryDeal: product.isAContributoryDeal,
              dealOwnerEntity: product.dealOwnerEntity,
              dealOwner: product.dealOwner,
              dealInitialPercentageContribution:
                product.dealInitialPercentageContribution,
              dealMaximumInstallmentAllowed:
                product.dealMaximumInstallmentAllowed,
              includeGatewayChargesInPrice:
                product.includeGatewayChargesInPrice,
              gatewayFixedCharge: product.gatewayFixedCharge,
              gatewayRateCharge: product.gatewayRateCharge,
              isACreditDeal: product.isACreditDeal,
              preferredEntityVariant: product.preferredEntityVariant,
              dealSlug: product.dealSlug,
            });
          });
        }
        setProductsList(allData);

        setNumberOfDeals(allData.length);

        setIsLoading(false);
        setCurrency(allData.length > 0 ? allData[0].currency : "");
      } else {
        const response = await api.get("/products?sort=desc", {
          params: {
            displayOnStore: "yes",
            salesPreference: "deal",
            dealCode: deal,
          },
        });
        const workingData = response.data.data.data;
        workingData.map((product) => {
          allData.push({
            id: product._id,
            name: product.name,
            image: product.imageCover,
            shortDescription: product.shortDescription,
            fullDescription: product.fullDescription,
            pricePerUnit: product.pricePerUnit,
            category: product.category,
            minimumQuantity: product.minimumQuantity,
            currency: product.currency,
            unit: product.unit,
            isFeaturedProduct: product.isFeaturedProduct,
            configuration: product.configuration,
            displayOnStore: product.displayOnStore,
            brand: product.brand,
            salesPreference: product.salesPreference,
            keyword1: product.keyword1,
            keyword2: product.keyword2,
            keyword3: product.keyword3,
            slug: product.slug,
            images: product.images,
            sku: product.sku,
            pricingMechanism: product.pricingMechanism,
            priceLabel: product.priceLabel,
            weightPerUnit: product.weightPerUnit,
            stockStatus: product.stockStatus,
            allowSubscription: product.allowSubscription,
            isVatable: product.isVatable,
            hasVariant: product.hasVariant,
            barcode: product.barcode,
            marketPricingCondition: product.marketPricingCondition,
            deliverability: product.deliverability,
            pickupInfo: product.pickupInfo,
            allowPriceFreezing: product.allowPriceFreezing,
            allowFreezedPriceLowBound: product.allowFreezedPriceLowBound,
            freezedPriceLowBound: product.freezedPriceLowBound,
            chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound:
              product.chargesPerWeekOnFreezedPriceServiceWithoutPriceLowBound,
            chargesPerWeekOnFreezedPriceServiceWithPriceLowBound:
              product.chargesPerWeekOnFreezedPriceServiceWithPriceLowBound,
            freezedPriceMaximumDurationInWeeks:
              product.freezedPriceMaximumDurationInWeeks,
            minimumFreezableQuantity: product.minimumFreezableQuantity,
            datePriceWasSet: product.datePriceWasSet,
            dealCode: product.dealCode,
            dealExpiryDate: product.dealExpiryDate,
            dealType: product.dealType,
            showDealPricePerUnit: product.showDealPricePerUnit,
            allowDealQuantityChange: product.allowDealQuantityChange,
            dealStatus: product.dealStatus,
            dealComment: product.dealComment,

            dealDeliveryMode: product.dealDeliveryMode,
            dealCentralizedDeliveryLocation:
              product.dealCentralizedDeliveryLocation,
            dealCentralizedAgreedDeliveryCost:
              product.dealCentralizedAgreedDeliveryCost,
            dealDecentralizedDeliveryLocation:
              product.dealDecentralizedDeliveryLocation,
            dealDecentralizedAgreedDeliveryCost:
              product.dealDecentralizedAgreedDeliveryCost,
            showDealDeliveryCost: product.showDealDeliveryCost,
            productType: product.productType,

            dealPaymentPreference: product.dealPaymentPreference,
            showDealPaymentDetails: product.showDealPaymentDetails,
            requestDealRedemptionCode: product.requestDealRedemptionCode,
            isAContributoryDeal: product.isAContributoryDeal,
            dealOwnerEntity: product.dealOwnerEntity,
            dealOwner: product.dealOwner,
            dealInitialPercentageContribution:
              product.dealInitialPercentageContribution,
            dealMaximumInstallmentAllowed:
              product.dealMaximumInstallmentAllowed,
            includeGatewayChargesInPrice: product.includeGatewayChargesInPrice,
            gatewayFixedCharge: product.gatewayFixedCharge,
            gatewayRateCharge: product.gatewayRateCharge,
            isACreditDeal: product.isACreditDeal,
          });
        });
        setProductsList(allData);
        setNumberOfDeals(allData.length);
        setIsLoading(false);
        setCurrency(allData.length > 0 ? allData[0].currency : "");
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateShoppingPath, preference, deal, entity]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/policies`, {
        params: { status: "active" },
      });
      const policies = response.data.data.data;

      policies.map((policy) => {
        allData.push({
          id: policy._id,
          country: policy.country,
          currency: policy.currency,
          vat: policy.vat,
          implementVatCollection: policy.implementVatCollection,
          implementSalesTaxCollection: policy.implementSalesTaxCollection,
          salesTaxDirection: policy.salesTaxDirection,
          status: policy.status,
          shoppingMode: policy.shoppingMode,
          onlineOrigin: policy.onlineOrigin,
          allowCentralCommission: policy.allowCentralCommission,
          commissionRate: policy.commissionRate,
          allowOriginSalesTax: policy.allowOriginSalesTax,
          implementSalesTaxCollection: policy.implementSalesTaxCollection,
        });
      });

      setPolicy(allData[0]);
      //setCurrency(allData[0].currency);
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateShoppingPath]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const Str = require("@supercharge/strings");

  const allProductList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {productsList.map((product, index) => (
            <AllProducts
              name={product.name}
              //policy={policy}
              key={`${product.id}${index}`}
              shortDescription={Str(product.shortDescription)
                .limit(500, "...")
                .get()}
              fullDescription={product.fullDescription}
              pricePerUnit={product.pricePerUnit}
              category={product.category}
              marketPricingCondition={product.marketPricingCondition}
              minimumQuantity={product.minimumQuantity}
              sku={product.sku}
              priceLabel={product.priceLabel}
              barcode={product.barcode}
              currency={currency}
              unit={product.unit}
              isFeaturedProduct={product.isFeaturedProduct}
              configuration={product.configuration}
              displayOnStore={product.displayOnStore}
              brand={product.brand}
              salesPreference={product.salesPreference}
              dealCode={product.dealCode}
              dealExpiryDate={product.dealExpiryDate}
              dealType={product.dealType}
              showDealPricePerUnit={product.showDealPricePerUnit}
              allowDealQuantityChange={product.allowDealQuantityChange}
              dealStatus={product.dealStatus}
              dealComment={product.dealComment}
              dealDeliveryMode={product.dealDeliveryMode}
              dealCentralizedDeliveryLocation={
                product.dealCentralizedDeliveryLocation
              }
              dealCentralizedAgreedDeliveryCost={
                product.dealCentralizedAgreedDeliveryCost
              }
              dealDecentralizedDeliveryLocation={
                product.dealDecentralizedDeliveryLocation
              }
              dealDecentralizedAgreedDeliveryCost={
                product.dealDecentralizedAgreedDeliveryCost
              }
              showDealDeliveryCost={product.showDealDeliveryCost}
              productType={product.productType}
              dealPaymentPreference={product.dealPaymentPreference}
              showDealPaymentDetails={product.showDealPaymentDetails}
              requestDealRedemptionCode={product.requestDealRedemptionCode}
              isAContributoryDeal={product.isAContributoryDeal}
              isACreditDeal={product.isACreditDeal}
              dealOwnerEntity={product.dealOwnerEntity}
              dealOwner={product.dealOwner}
              dealInitialPercentageContribution={
                product.dealInitialPercentageContribution
              }
              dealMaximumInstallmentAllowed={
                product.dealMaximumInstallmentAllowed
              }
              includeGatewayChargesInPrice={
                product.includeGatewayChargesInPrice
              }
              gatewayFixedCharge={product.gatewayFixedCharge}
              gatewayRateCharge={product.gatewayRateCharge}
              allowPriceFreezing={product.allowPriceFreezing}
              keyword1={product.keyword1}
              keyword2={product.keyword2}
              keyword3={product.keyword3}
              image={product.image}
              productId={product.id}
              slug={product.slug}
              pricingMechanism={product.pricingMechanism}
              images={product.images}
              weightPerUnit={product.weightPerUnit}
              stockStatus={product.stockStatus}
              allowSubscription={product.allowSubscription}
              deliverability={product.deliverability}
              pickupInfo={product.pickupInfo}
              isVatable={product.isVatable}
              hasVariant={product.hasVariant}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              updateShoppingPathInfoInfo={updateShoppingPathInfoInfo}
              updateDealHandler={updateDealHandler}
              updatePreferenceHandler={updatePreferenceHandler}
              deal={deal}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {productsList.map((product, index) => (
            <AllProducts
              name={product.name}
              //policy={policy}
              key={`${product.id}${index}`}
              shortDescription={Str(product.shortDescription)
                .limit(500, "...")
                .get()}
              fullDescription={product.fullDescription}
              pricePerUnit={product.pricePerUnit}
              category={product.category}
              minimumQuantity={product.minimumQuantity}
              marketPricingCondition={product.marketPricingCondition}
              sku={product.sku}
              priceLabel={product.priceLabel}
              barcode={product.barcode}
              currency={currency}
              unit={product.unit}
              isFeaturedProduct={product.isFeaturedProduct}
              configuration={product.configuration}
              displayOnStore={product.displayOnStore}
              brand={product.brand}
              salesPreference={product.salesPreference}
              dealCode={product.dealCode}
              dealExpiryDate={product.dealExpiryDate}
              dealType={product.dealType}
              showDealPricePerUnit={product.showDealPricePerUnit}
              allowDealQuantityChange={product.allowDealQuantityChange}
              dealStatus={product.dealStatus}
              dealComment={product.dealComment}
              dealDeliveryMode={product.dealDeliveryMode}
              dealCentralizedDeliveryLocation={
                product.dealCentralizedDeliveryLocation
              }
              dealCentralizedAgreedDeliveryCost={
                product.dealCentralizedAgreedDeliveryCost
              }
              dealDecentralizedDeliveryLocation={
                product.dealDecentralizedDeliveryLocation
              }
              dealDecentralizedAgreedDeliveryCost={
                product.dealDecentralizedAgreedDeliveryCost
              }
              showDealDeliveryCost={product.showDealDeliveryCost}
              productType={product.productType}
              dealPaymentPreference={product.dealPaymentPreference}
              showDealPaymentDetails={product.showDealPaymentDetails}
              requestDealRedemptionCode={product.requestDealRedemptionCode}
              isAContributoryDeal={product.isAContributoryDeal}
              isACreditDeal={product.isACreditDeal}
              dealOwnerEntity={product.dealOwnerEntity}
              dealOwner={product.dealOwner}
              dealInitialPercentageContribution={
                product.dealInitialPercentageContribution
              }
              dealMaximumInstallmentAllowed={
                product.dealMaximumInstallmentAllowed
              }
              includeGatewayChargesInPrice={
                product.includeGatewayChargesInPrice
              }
              gatewayFixedCharge={product.gatewayFixedCharge}
              gatewayRateCharge={product.gatewayRateCharge}
              allowPriceFreezing={product.allowPriceFreezing}
              deliverability={product.deliverability}
              pickupInfo={product.pickupInfo}
              keyword1={product.keyword1}
              keyword2={product.keyword2}
              keyword3={product.keyword3}
              image={product.image}
              productId={product.id}
              slug={product.slug}
              pricingMechanism={product.pricingMechanism}
              images={product.images}
              weightPerUnit={product.weightPerUnit}
              stockStatus={product.stockStatus}
              allowSubscription={product.allowSubscription}
              isVatable={product.isVatable}
              hasVariant={product.hasVariant}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              updateShoppingPathInfoInfo={updateShoppingPathInfoInfo}
              updateDealHandler={updateDealHandler}
              updatePreferenceHandler={updatePreferenceHandler}
              deal={deal}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  let entityTitle = "";
  let extend = false;
  let extendTitle = "";
  let entityName = "";

  if (entity === "mtn") {
    entityTitle = "Staff Members of MTN (Nig) Plc";
    entityName = "MTN (Nig) Limited";
  } else if (entity === "nimasa") {
    entityTitle = "Staffers of Nigerian Maritime Administration";
    extend = true;
    extendTitle = "and Safety Agency(NIMASA) ";
    entityName = "Nigerian Maritime Administration and Safety Agency(NIMASA) ";
  } else if (entity === "fbn") {
    entityTitle = "Staff Members of First Bank (Nig) Plc";
    entityName = "First Bank (Nig) Plc";
  } else if (entity === "accessbank") {
    entityTitle = "Staff Members of Access Bank (Nig) Plc";
    entityName = "Access Bank (Nig) Plc";
  } else if (entity === "gtb") {
    entityTitle = "Staff Members of Guarantee Trust Bank";
    entityName = "Guarantee Trust Bank (Nig) Plc";
  } else if (entity === "promasidor") {
    entityTitle = "Staff Members of Promasidor (Nig) Ltd";
    entityName = "Promasidor (Nig) Ltd";
  } else if (entity === "uba") {
    entityTitle = "Staff Members of United Bank of Africa";
    entityName = "United Bank of Africa (Nig) Plc";
  } else if (entity === "unilag") {
    entityTitle = "the University of Lagos Community";
    entityName = "University of Lagos(Unilag)";
  } else if (entity === "yabatech") {
    entityTitle = "the Yaba Technology Community";
    entityName = "Yaba College of Technology";
  } else if (entity === "lasu") {
    entityTitle = "the Lagos State Univeristy Community";
    entityName = "Lagos State Univeristy(LASU)";
  } else if (entity === "interswitch") {
    entityTitle = "Staff Members of InterSwitch (Nig) Ltd";
    entityName = "InterSwitch (Nig) Ltd";
  } else if (entity === "glo") {
    entityTitle = "Staff Members of Glo (Nig) Ltd";
    entityName = "Glo (Nig) Ltd";
  } else if (entity === "airtel") {
    entityTitle = "Staff Members of Airtel (Nig) Plc";
    entityName = "Airtel (Nig) Plc";
  } else if (entity === "nibss") {
    entityTitle = "Staff Members of NIBSS Plc";
    entityName = "NIBBS Plc";
  } else if (entity === "shell") {
    entityTitle = "Staff Members of Shell Petroleum, Nigeria";
    entityName = "Shell Petroleum, Nigeria";
  } else if (entity === "chevron") {
    entityTitle = "Staff Members of Chevron, Nigeria";
  } else if (entity === "mobil") {
    entityTitle = "Staff Members of Mobil, Nigeria";
  } else if (entity === "nnpc") {
    entityTitle = "Staff Members of NNPC, Nigeria";
  } else if (entity === "oando") {
    entityTitle = "Staff Members of Oando (Nig) Plc";
  } else if (entity === "seplat") {
    entityTitle = "Staff Members of Seplat (Nig) Ltd";
  } else if (entity === "nbplc") {
    entityTitle = "Staff Members of Nigerian Breweries Plc";
  } else if (entity === "unilever") {
    entityTitle = "Staff Members of Unilever, Nigeria";
  } else if (entity === "flourmills") {
    entityTitle = "Staff Members of Flour Mills (Nig) Plc";
  } else if (entity === "npa") {
    entityTitle = "Staff Members of Nigerian Ports Authority";
  } else if (entity === "yabafstc") {
    entityTitle = "Staff Members of Federal Science & Technical";
    extend = true;
    extendTitle = "College, Yaba";
  } else {
    entityTitle = "Members of a Community/Organization";
  }

  return (
    <>
      {/* <Grid container direction="row" className={classes.mainContainer}> */}
      {matchesMD ? (
        <Grid container direction="row" className={classes.root}>
          {/* <section className={classes.root}> */}
          <Grid
            container
            alignItems="center"
            //className={classes.background}
            justifyContent={matchesSM ? "center" : "space-between"}
            direction={matchesSM ? "column" : "row"}
            style={{ marginTop: -100 }}
          >
            <Grid item>
              {" "}
              {/*..... HERO BLOCK.... */}
              <Grid
                container
                //justifyContent="flex-end"
                //alignItems="center"
                direction="row"
              >
                <ReactPlayer
                  url={matchesSM ? heroVideoMobile : heroVideo}
                  playing
                  loop
                  muted
                  // width="100%"
                  // height="100%"
                  width="99rem"
                  height="49rem"
                />
                <div className={classes.overlay}>
                  {/* <img
                  src={logo}
                  alt="Udaraa Marketplace"
                  width={180}
                  height={150}
                /> */}
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    //justifyContent="center"
                    //alignItems="center"
                    color="#fff"
                  >
                    <Grid sm item className={classes.heroTextContainer}>
                      <Typography
                        variant={matchesSM ? "subtitle2" : "h2"}
                        align="left"
                        style={{ marginTop: "16rem" }}
                      >
                        <span style={{ marginLeft: matchesSM ? 20 : 5 }}>
                          {" "}
                          We utilize the Power of Numbers and Bulk Purchasing
                        </span>{" "}
                        <br />
                        <span style={{ marginLeft: matchesSM ? 20 : 50 }}>
                          to provide Quality & Affordable Food Items to
                        </span>
                        <br />
                        <span style={{ marginLeft: matchesSM ? 50 : 115 }}>
                          {entityTitle}
                        </span>
                        <br />
                        {extend && (
                          <span style={{ marginLeft: matchesSM ? 20 : 200 }}>
                            {extendTitle}
                          </span>
                        )}
                      </Typography>
                      {matchesMD ? (
                        <Grid
                          container
                          justifyContent="flex-start"
                          direction={matchesSM ? "column" : "row"}
                          className={classes.buttonContainer}
                        >
                          {/* <Grid item>
                            <Button
                              // component={Link}
                              // to="/estimate"
                              className={classes.estimateButton}
                              variant="contained"
                              onClick={(event) => {
                                event.preventDefault();
                                //  history.push(`/orders/completed`);
                                window.open(
                                  "https://partners.eshieldafrica.com/"
                                );
                              }}
                            >
                              See Our Product Categories
                            </Button>
                          </Grid> */}
                          {/* <Grid item>
                          <Button
                            // component={Link}
                            // to="/revolution"
                            variant="outlined"
                            className={classes.visitPartnerButtonsite}
                            onClick={(event) => {
                              event.preventDefault();
                              //  history.push(`/orders/completed`);
                              window.open(
                                "https://partners.eshieldafrica.com/"
                              );
                            }}
                          >
                            <span
                              style={{
                                marginRight: 10,
                              }}
                            >
                              {matchesSM
                                ? "Courier Partner"
                                : "Become a Courier Partner"}
                            </span>
                            <ButtonArrow
                              width={15}
                              height={15}
                              fill={theme.palette.common.orange}
                            />
                          </Button>
                        </Grid> */}
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Box>
                </div>
                {/* <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {/* </section> */}
          {/* <FreezePriceAdDealPage /> */}
          <EntityTopCover preference={preference} entityName={entityName} />
          {/* <DealPropositionPage /> */}
          {/* <DealSearchBox
            updateDealHandler={updateDealHandler}
            dealHandler={dealHandler}
          /> */}
          <EntityPurchaseSchemes
            updateDealHandler={updateDealHandler}
            updatePreferenceHandler={updatePreferenceHandler}
            dealHandler={dealHandler}
            preference={preference}
          />

          {!isLoading && numberOfDeals === 0 && (
            <Typography style={{ marginLeft: 100, marginTop: 80 }}>
              There Are No Available Products for this Organization/community
              Yet
            </Typography>
          )}

          {isLoading && (
            <CircularProgress
              size={100}
              color="inherit"
              style={{ marginTop: 250, marginLeft: 650 }}
            />
          )}
          {!isLoading && path === "retail" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "derica" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "paint" && <Grid item>{allProductList}</Grid>}
          {!isLoading && path === "wholesale" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "community" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "deal" && <Grid item>{allProductList}</Grid>}

          <Grid item className={classes.footer}>
            <UpperFooter />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" className={classes.rootMobile}>
          {/* <section className={classes.root}> */}
          <Grid
            container
            alignItems="center"
            //className={classes.backgroundMobile}
            justifyContent={matchesSM ? "center" : "space-between"}
            direction={matchesSM ? "column" : "row"}
            style={{ marginTop: -100, height: "22.5%" }}
          >
            <Grid item>
              {" "}
              {/*..... HERO BLOCK.... */}
              <Grid
                container
                //justifyContent="flex-end"
                //alignItems="center"
                direction="row"
              >
                <ReactPlayer
                  url={matchesSM ? heroVideoMobile : heroVideo}
                  playing
                  loop
                  muted
                  width="100%"
                  height="100%"
                  // width="99rem"
                  // height="49rem"
                  //height="29rem"
                />
                <div className={classes.overlayMobile}>
                  {/* <img
                  src={logo}
                  alt="Udaraa Marketplace"
                  width={180}
                  height={150}
                /> */}
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    //justifyContent="center"
                    //alignItems="center"
                    color="#fff"
                  >
                    <Grid sm item className={classes.heroTextContainer}>
                      <Typography
                        //variant={matchesSM ? "subtitle2" : "h5"}
                        align="left"
                        style={{
                          marginTop: -30,
                          fontWeight: 500,
                          fontSize: 11,
                        }}
                      >
                        <span style={{ marginLeft: matchesSM ? 20 : 5 }}>
                          {" "}
                          We utilize the Power of Numbers and Bulk Purchasing
                        </span>{" "}
                        <br />
                        <span style={{ marginLeft: matchesSM ? 30 : 50 }}>
                          to provide Quality & Affordable Food Items to
                        </span>
                        <br />
                        <span style={{ marginLeft: matchesSM ? 50 : 115 }}>
                          {entityTitle}
                        </span>
                        <br />
                        {extend && (
                          <span style={{ marginLeft: matchesSM ? 70 : 200 }}>
                            {extendTitle}
                          </span>
                        )}
                      </Typography>
                      {matchesMD ? (
                        <Grid
                          container
                          justifyContent="flex-start"
                          direction={matchesSM ? "column" : "row"}
                          className={classes.buttonContainer}
                        >
                          <Grid item>
                            <Button
                              // component={Link}
                              // to="/estimate"
                              className={classes.estimateButton}
                              variant="contained"
                              onClick={(event) => {
                                event.preventDefault();
                                //  history.push(`/orders/completed`);
                                window.open(
                                  "https://partners.eshieldafrica.com/"
                                );
                              }}
                            >
                              See Our Product Categories
                            </Button>
                          </Grid>
                          {/* <Grid item>
                          <Button
                            // component={Link}
                            // to="/revolution"
                            variant="outlined"
                            className={classes.visitPartnerButtonsite}
                            onClick={(event) => {
                              event.preventDefault();
                              //  history.push(`/orders/completed`);
                              window.open(
                                "https://partners.eshieldafrica.com/"
                              );
                            }}
                          >
                            <span
                              style={{
                                marginRight: 10,
                              }}
                            >
                              {matchesSM
                                ? "Courier Partner"
                                : "Become a Courier Partner"}
                            </span>
                            <ButtonArrow
                              width={15}
                              height={15}
                              fill={theme.palette.common.orange}
                            />
                          </Button>
                        </Grid> */}
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Box>
                </div>
                {/* <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid> */}
              </Grid>
            </Grid>
          </Grid>
          {/* </section> */}
          {/* <FreezePriceAdDealPage />
          <TopCoverDeal preference={preference} />
          <DealPropositionPage /> */}
          <EntityTopCover preference={preference} entityName={entityName} />
          <EntityPurchaseSchemes
            updateDealHandler={updateDealHandler}
            updatePreferenceHandler={updatePreferenceHandler}
            dealHandler={dealHandler}
            preference={preference}
          />

          {!isLoading && numberOfDeals === 0 && (
            <Typography style={{ marginLeft: 50, marginTop: 30 }}>
              There Are No Available Products for this Organization/community
              Yet
            </Typography>
          )}
          {isLoading && (
            <CircularProgress
              size={100}
              color="inherit"
              style={{ marginTop: 250, marginLeft: 650 }}
            />
          )}
          {!isLoading && path === "retail" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "derica" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "paint" && <Grid item>{allProductList}</Grid>}
          {!isLoading && path === "wholesale" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "community" && (
            <Grid item>{allProductList}</Grid>
          )}
          {!isLoading && path === "deal" && <Grid item>{allProductList}</Grid>}

          <Grid item className={classes.footer}>
            <UpperFooter />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Entities;
