import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import api from "./../../../apis/local";
import { EDIT_STATE } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 150,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderStateNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Enter State/Entity Name"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderStateCodeField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Enter State/Entity Code"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

const renderStateDescriptionField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Provide a description of this state/entity"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      multiline={true}
      minRows={5}
      onChange={input.onChange}
    />
  );
};

const renderEntityDealCodeField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  helperText,
  defaultValue,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      defaultValue={defaultValue}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}
    />
  );
};

function StateEditForm(props) {
  const { params, token, userId } = props;
  const classes = useStyles();

  const [country, setCountry] = useState(params[0].country);
  const [countryId, setCountryId] = useState(params[0].countryId);
  const [region, setRegion] = useState(params[0].region);
  const [entityType, setEntityType] = useState(params[0].entityType);
  const [countryList, setCountryList] = useState([]);
  const [allowCreditDeal, setAllowCreditDeal] = useState(
    params[0].allowCreditDeal
  );
  const [allowPaymentOnDelivery, setAllowPaymentOnDelivery] = useState(
    params[0].allowPaymentOnDelivery
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCountryChange = (event) => {
    setCountryId(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleEntityTypeChange = (event) => {
    setEntityType(event.target.value);
  };

  const handleAllowCreditDealChange = (event) => {
    setAllowCreditDeal(event.target.value);
  };

  const handleAllowPaymentOnDeliveryChange = (event) => {
    setAllowPaymentOnDelivery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({
          id: country._id,
          name: country.name,
        });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const renderCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="country"
            id="country"
            value={countryId}
            onChange={handleCountryChange}
            label="Country"
            style={{ width: 300, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Select Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountryRegionsField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="region"
            id="region"
            value={region.toLowerCase()}
            onChange={handleRegionChange}
            label="Country Region"
            style={{ width: 190, height: 38 }}
          >
            <MenuItem value={"west"}>West</MenuItem>
            <MenuItem value={"east"}>East</MenuItem>
            <MenuItem value={"north"}>North</MenuItem>
            <MenuItem value={"south"}>South</MenuItem>
            <MenuItem value={"central"}>Central</MenuItem>
            <MenuItem value={"south-east"}>South East</MenuItem>
            <MenuItem value={"south-west"}>South West</MenuItem>
            <MenuItem value={"south-central"}>South Central</MenuItem>
            <MenuItem value={"south-south"}>South South</MenuItem>
            <MenuItem value={"north-east"}>North East</MenuItem>
            <MenuItem value={"north-west"}>North West</MenuItem>
            <MenuItem value={"north-central"}>North Central</MenuItem>
            <MenuItem value={"north-north"}>North North</MenuItem>
          </Select>
          <FormHelperText>Select Country Region</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderEntityTypeField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="entityType"
            id="entityType"
            value={entityType}
            onChange={handleEntityTypeChange}
            //label="Country Region"
            style={{ width: 500, height: 38, marginTop: 20 }}
          >
            <MenuItem value={"conventional"}>Conventional</MenuItem>
            <MenuItem value={"organizational"}>Organizational</MenuItem>
          </Select>
          <FormHelperText>Select State/Entity Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowCreditDealField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="allowCreditDeal"
            id="allowCreditDeal"
            value={allowCreditDeal}
            onChange={handleAllowCreditDealChange}
            //label="Allow Credit Deal"
            style={{ width: 500, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Credit Deals</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowPaymentOnDeliveryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="allowPaymentOnDelivery"
            id="allowPaymentOnDelivery"
            value={allowPaymentOnDelivery}
            onChange={handleAllowPaymentOnDeliveryChange}
            //label="Allow Credit Deal"
            style={{ width: 500, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Payment On Delivery</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Update State/Entity</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const data = {
      name: formValues.name ? formValues.name : params[0].name,
      region: region ? region : params[0].region,
      entityType: entityType ? entityType : params[0].entityType,
      entityDealCode: formValues.entityDealCode
        ? formValues.entityDealCode
        : params[0].entityDealCode,
      description: formValues.description
        ? formValues.description
        : params[0].description,
      country: countryId ? countryId : params[0].countryId,
      code: formValues.code ? formValues.code : params[0].code,
      createdBy: userId,
      allowCreditDeal: allowCreditDeal
        ? allowCreditDeal
        : params[0].allowCreditDeal,
      allowPaymentOnDelivery: allowPaymentOnDelivery
        ? allowPaymentOnDelivery
        : params[0].allowPaymentOnDelivery,
    };

    if (data) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/states/${params[0].id}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_STATE,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} State is updated successfully!!!`
          );
          props.handleEditDialogOpenStatus();
          props.renderStateEdittedUpdateCounter();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      editForm().catch((err) => {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  return (
    <>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 460,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleEditDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          <Typography variant="h5">Enter State/Entity Details</Typography>
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="stateEditForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "65%" }}>
            <Field
              label=""
              id="name"
              name="name"
              defaultValue={params[0].name}
              type="text"
              component={renderStateNameField}
            />
          </Grid>
          <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              defaultValue={params[0].code}
              type="text"
              component={renderStateCodeField}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "60%" }}>
            <Field
              label=""
              id="country"
              name="country"
              type="text"
              component={renderCountryField}
            />
          </Grid>
          <Grid item style={{ width: "37%", marginLeft: 10 }}>
            <Field
              label=""
              id="region"
              name="region"
              type="text"
              component={renderCountryRegionsField}
            />
          </Grid>
        </Grid>
        <Field
          label=""
          id="entityType"
          name="entityType"
          type="text"
          component={renderEntityTypeField}
        />
        <Field
          label=""
          id="entityDealCode"
          name="entityDealCode"
          defaultValue={params[0].entityDealCode}
          type="text"
          component={renderEntityDealCodeField}
          helperText="Enter Entity Deal Code"
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="description"
          name="description"
          defaultValue={params[0].description}
          type="text"
          component={renderStateDescriptionField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="allowCreditDeal"
          name="allowCreditDeal"
          type="text"
          component={renderAllowCreditDealField}
        />
        <Field
          label=""
          id="allowPaymentOnDelivery"
          name="allowPaymentOnDelivery"
          type="text"
          component={renderAllowPaymentOnDeliveryField}
        />

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>
      </Box>
      {/* </form> */}
    </>
  );
}

export default reduxForm({
  form: "stateEditForm",
})(StateEditForm);
