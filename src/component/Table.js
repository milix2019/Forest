import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "#1f375f",
    fontSize: "12px",
    margin: "8px",
    color: "#FFF",
    borderRadius: "6px"
  },
}));

export default function ListDividers(props) {
  const classes = useStyles();
  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders" >
      <ListItem button>
        <div> Date of Birth</div><div style={{ position: "absolute", right: "1em" }}>{props.birthday}</div>
      </ListItem>
      <Divider />
      <ListItem button divider>
        <div> Death Day</div><div style={{ position: "absolute", right: "1em" }}>{props.deathday}</div>
      </ListItem>
      <ListItem button>
        <div>Place Of Birth</div><div style={{ position: "absolute", right: "1em" }}>{props.place_of_birth}</div>
      </ListItem>
      <Divider light />
      <ListItem button>
        <div>Popularity</div><div style={{ position: "absolute", right: "1em" }}>{props.popularity} M</div>
      </ListItem>
    </List>
  );
}
