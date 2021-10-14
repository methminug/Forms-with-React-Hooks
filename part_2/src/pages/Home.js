import {
  Grid,
  Typography,
  Button,
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import React, { useReducer, useState } from "react";

const Home = () => {
  /* PREVIOUSLY USED REDUCER FUNCTION ( BEFORE SHORTENING ) */

  // const reducer = (state, action) => {
  //   switch (action.name) {
  //     case "alertScore":
  //       return { ...state, alertScore: action.value };
  //     case "friendlyScore":
  //       return {  ...state, friendlyScore: action.value };
  //     case "activeScore":
  //       return { ...state, activeScore: action.value };
  //     case "agree":
  //       return { ...state, agree: action.value };
  //     default:
  //       throw new Error();
  //   }
  // };

  /* SHORTENED REDUCER FUNCTION */
  const reducer = (state, action) => {
    return { ...state, [action.name]: action.value };
  };

  const [result, setResult] = useState("");

  const initialFormState = {
    alertScore: 4,
    friendlyScore: 100,
    activeScore: 3,
    agree: false,
  };

  const [state, dispatch] = useReducer(reducer, initialFormState);

  const displayResults = () => {
    setResult("");

    const friendly = parseInt(state.friendlyScore / 25 + 1);

    if (state.activeScore == 1) {
      if (friendly == 1) {
        setResult("Chow Chow");
      } else {
        setResult("Basset Hound");
      }
    } else if (friendly >= 3) {
      if (state.alertScore == 1) {
        setResult("Corgi");
      } else if (state.alertScore == 4) {
        setResult("German Shepherd");
      } else {
        setResult("Boxer");
      }
    } else if (state.alertScore == 4) {
      setResult("Akita");
    } else {
      setResult("Irish Setter");
    }
  };

  const getFriendlyScore = (value) => {
    return value;
  };

  const friendlyScoreMarks = [
    {
      value: 0,
      label: "😶",
    },
    {
      value: 100,
      label: "😃",
    },
  ];

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography textAlign="center" variant="h6">
            Which furry friend vibes the best with you?
          </Typography>
        </Toolbar>
      </AppBar>
      <form
        style={{ margin: "3em 2em 3em 2em" }}
        onSubmit={() => displayResults()}
      >
        <Grid container direction="row" columnSpacing={3}>
          <Grid item md={4} xs={12} container direction="column" rowSpacing={2}>
            <Typography variant="h5" color="gray">
              Around new people ...
            </Typography>
            <RadioGroup
              name="alertScore"
              value={state.alertScore}
              onChange={(e) => dispatch(e.target)}
            >
              <FormControlLabel
                value={4}
                control={<Radio size="small" color="primary" />}
                label="I'm very cautious and protective."
              />
              <FormControlLabel
                value={3}
                control={<Radio size="small" color="primary" />}
                label="I'm cautious."
              />
              <FormControlLabel
                value={2}
                control={<Radio size="small" color="primary" />}
                label="I'm protective but I'll trust them."
              />
              <FormControlLabel
                value={1}
                control={<Radio size="small" color="primary" />}
                label="I'm ok with it or I can't care less"
              />
            </RadioGroup>
          </Grid>
          <Grid item md={4} xs={12} container direction="column" rowSpacing={2}>
            <Typography variant="h5" color="gray">
              My level of friendliness is
            </Typography>
            <Box sx={{ width: 320 }}>
              <Slider
                key={state.friendlyScore}
                defaultValue={state.friendlyScore}
                getAriaValueText={getFriendlyScore}
                step={25}
                onChangeCommitted={(event, value) =>
                  dispatch({
                    name: "friendlyScore",
                    value: value,
                  })
                }
                marks={friendlyScoreMarks}
                valueLabelDisplay="on"
              />
            </Box>
          </Grid>
          <Grid item md={4} xs={12} container rowSpacing={2}>
            <FormControl variant="outlined">
              <InputLabel required id="select-outlined-label">
                On a typical weekend, I'll be
              </InputLabel>
              <Select
                name="activeScore"
                required
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                  },
                }}
                value={state.activeScore}
                onChange={(e) => dispatch(e.target)}
                label="On a typical weekend, I'll be"
                margin="dense"
                labelId="select-outlined-label"
              >
                <MenuItem value={3}>
                  Bungee jumping, if I had the chance
                </MenuItem>
                <MenuItem value={2}>Taking a calm walk</MenuItem>
                <MenuItem value={1}>Taking a well deserved nap</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={12}
            container
            style={{ marginTop: "3em" }}
            direction="column"
          >
            <FormControlLabel
              label={
                "I agree to not be offended by the results as this is just an " +
                "example and not at all an accurate representation of me or the dog 😁"
              }
              control={
                <Checkbox
                  checked={state.agree}
                  onChange={(e) =>
                    dispatch({
                      name: "agree",
                      value: e.target.checked,
                    })
                  }
                  color="primary"
                />
              }
            />
          </Grid>
          <Grid item md={12} container direction="column">
            <Button
              disabled={!state.agree}
              variant="contained"
              color="primary"
              onClick={displayResults}
            >
              Show me the result !
            </Button>
          </Grid>
          <Grid
            item
            md={12}
            container
            direction="column"
            textAlign="center"
            style={{ marginTop: "2em" }}
          >
            <Typography variant="h4">
              {result ? `It's the ${result} 🐶` : ``}
            </Typography>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default Home;
