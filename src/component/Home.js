import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from "./Slider";
import Body from "./Body";


const useStyles = makeStyles(() => ({
  root: {
    padding: '4em 1em',
    paddingBottom: '1em',
    paddingTop: "5em",
  },
}));

const HomeView = (props) => {
  const classes = useStyles();
  /*
    Calling Ajax to get the popular movies,
    then update the state to re-render the page
  */
  useEffect(() => {
    if (props.getpopular.loading_getpopular == true)
      props.fetch_getpopular_data('popular');

  }, []);

  return (
    <Container maxWidth="lg" className={classes.root} data-test="homeComponent">
      <Slider {...props} />
      <Body {...props} />
    </Container>
  );
};

export default HomeView;
