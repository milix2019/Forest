import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FormGroup } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(() => ({
    root: {
        padding: '4em 1em',
        paddingBottom: '1em',
        paddingTop: "5em",
        marginTop: "5em"
    },
    whiteColor: {
        color: "#FFF!important"
    },
    iconContainer:{
        color: "#FFF",
        marginTop: "6.5em"
    }
}));
const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const Movie = (props) => {
    const { id, popularity, poster_path, vote_average, title, views, release_date, overview, original_language } = JSON.parse(props.history.location.state.data);

    const classes = useStyles();
    const [height, setHeight] = React.useState((window.outerHeight / 2) + 100);
    const [state, setState] = React.useState({
        checkedC: true,
    });
    const [createCast, setCreateCast] = useState([]);

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };


    useEffect(() => {
        // Calling API to get the cast and other info
        if(id)
            getCast(id);
        window.addEventListener('resize', trackResizing);
        return () => {
            window.removeEventListener('resize', trackResizing);
        };
    }, [props]);


    const getCast = (id) => {
      axios.get(config.BASE_URL + `movie/${id}?api_key=${config.API_KEY}&append_to_response=credits`, {
        headers: {
          'content-type': 'application/json ',
        },
      }).then((response) => {
        // handle succes and update the states
        setCreateCast(response.data.credits);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
    };

    const trackResizing = () => {
        // Here we do image resizing
        let height = (window.outerHeight / 2) + 100;
        setHeight(height);
    }

    // redirect to cast page
    const onCastClick = (id) => {
        props.history.push({
            pathname: '/cast',
            state: {
                data: props.history.location.state.data,
                person_id: id
            }
        });
    }
    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container>
                <Grid className="movie-img" item xs={12} sm={12} md={4} lg={4} style={{ textAlign: "right", paddingLeft: "20px" }}>
                    <img width="auto" height={height}  style={{borderRadius: "6px"}} src={`http://image.tmdb.org/t/p/w500/${poster_path}`} />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} style={{ paddingLeft: "10px" }}>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="h3.fontSize" fontWeight="fontWeightBold" m={1}>
                            {title}
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1}>{release_date}</Box>
                        <Box fontSize="fontSize" m={1} title={`${vote_average} out of 10`} >
                            <img style={{ marginTop: "-9px" }} width="35" height="auto" src={"http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/IMDb-icon.png"} />
                            <Rating style={{ top: "-9px" }} size="small" name="read-only" value={vote_average/2} readOnly />
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1} style={{textAlign:'justify'}}>
                            {overview}
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1}>
                            {`Language: ${original_language}`}
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1}>
                            {popularity != undefined ? `Views: ${popularity}` : null}
                        </Box>
                    </FormGroup>
                    <FormGroup row style={{ color: "#FFF", marginLeft: "5px" }}>
                        <Box fontSize="fontSize" m={1} style={{display: "contents"}}>
                            <Box fontSize="fontSize" m={1} style={{ display: "contents" }}>
                                <div className="cast-pref">Cast:</div>
                                {createCast.length != 0 ? createCast.cast.map((d, i) => {
                                    let comma = i == createCast.cast.length - 1 ? "" : ",";
                                    return (
                                        <div className="cast" key={`${i}Keys`} onClick={() => { onCastClick(d.id) }}>
                                            {`${d.name} ${comma} `}
                                        </div>
                                    )
                                }) : ""}
                            </Box>
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.iconContainer}>
                        <Box fontSize="fontSize" m={1}>
                            <label htmlFor="icon-button-file">
                                <IconButton className={classes.whiteColor} aria-label="upload picture" component="span">
                                    <FavoriteIcon />
                                </IconButton>
                            </label>
                            <label style={{ marginLeft: "-7px" }} htmlFor="icon-button-file">
                                Add to bookmarks
                            </label>
                        </Box>
                        <Box fontSize="fontSize" m={1}>
                            <label htmlFor="icon-button-file">
                                <IconButton className={classes.whiteColor} aria-label="upload picture" component="span">
                                    <VisibilityOffIcon />
                                </IconButton>
                            </label>
                            <label style={{ marginLeft: "-7px" }} htmlFor="icon-button-file">
                                Not Seen
                            </label>
                        </Box>
                    </FormGroup>
                    <FormGroup row>
                        <Button href="https://www.youtube.com/" target="_blank" style={{ margin: "0 10px 0 8px", backgroundColor: "#1f375f", color: "#FFF" }} variant="contained">
                            Watch Now
                        </Button>
                        <Button href="https://www.youtube.com/" target="_blank" style={{ backgroundColor: "#1f375f", color: "#FFF" }} variant="contained">
                            Watch Trailer
                        </Button>
                        <Typography component="div" style={{ fontSize: "11px", marginLeft: "3em" }}>
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item className={classes.whiteColor}>720p</Grid>
                                <Grid item>
                                    <AntSwitch
                                        checked={state.checkedC}
                                        onChange={handleChange('checkedC')}
                                        value="checkedC"
                                    />
                                </Grid>
                                <Grid item className={classes.whiteColor}>1080p</Grid>
                            </Grid>
                        </Typography>
                    </FormGroup>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Movie;