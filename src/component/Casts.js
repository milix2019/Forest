import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FormGroup } from '@material-ui/core';
import Table from "./Table";


const useStyles = makeStyles(() => ({
    root: {
        padding: '4em 1em',
        paddingBottom: '1em',
        paddingTop: "5em",
        marginTop: "5em"
    },
    castImg: {
        borderRadius: "6px"
    },
    knownforContainer: {
        float: "right",
        width: "300px"
    },
    personName: {
        paddingLeft: "10px"
    },
    whiteColor: {
        color: "#FFF!important"
    }
}));


const Casts = (props) => {
    const person_id = JSON.parse(props.history.location.state.person_id);

    const classes = useStyles();
    const [height, setHeight] = React.useState((window.outerHeight / 2) + 100);
    const [person, setPerson] = useState([]);
    const [knownfor, setKnownfor] = useState([]);

    useEffect(() => {
        if (person_id)
            getPerson(person_id);

        window.addEventListener('resize', trackResizing);
        return () => {
            window.removeEventListener('resize', trackResizing);
        };
    }, [props]);

    /* 
        // Calling the person 
        // get the name of the person
        // call another api to obtain "Known For" section
    */
    const getPerson = (id) => {
        axios.get(config.BASE_URL + `person/${id}?api_key=${config.API_KEY}`, {
            headers: {
                'content-type': 'application/json ',
            },
        }).then((response) => {
            // handle succes and update the states
            setPerson(response.data);
            if (response.data.name)
                getKnownfor(response.data.name);
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    };

    const getKnownfor = (name) => {
        axios.get(config.BASE_URL + `search/person?api_key=${config.API_KEY}&query=${name}`, {
            headers: {
                'content-type': 'application/json ',
            },
        }).then((response) => {
            // handle succes and update the states
            setKnownfor(response.data.results[0].known_for);
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    };

    const onImageClick = (data) => {
        props.history.push({
            pathname: '/movie',
            state: {
                data: JSON.stringify(data),
            }
        });
    }

    const trackResizing = () => {
        // Here we do image resizing
        let height = (window.outerHeight / 2) + 100;
        setHeight(height);
    }
    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container>
                <Grid className="movie-img" item xs={12} sm={12} md={4} lg={4} style={{ textAlign: "right", paddingLeft: "20px" }}>
                    <img width="300" height="auto" className={classes.castImg} src={`http://image.tmdb.org/t/p/w500/${person.profile_path}`} />
                    <FormGroup row style={{ float: "right", width: "300px", color: "#FFF", padding: "1px 0 9px 1px" }}>
                        {"Known For"}
                    </FormGroup>
                    <FormGroup row className={classes.knownforContainer}>
                        {knownfor && knownfor.map((item, index) => (
                            <Grid item className="knownfor-size" item xs={1} sm={1} md={1} lg={1} key={`${index}Keys`} onClick={() => { onImageClick(item) }}>
                                <img className="img-size-cast" width="auto" height="100px" alt={item.title} src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                <div className="known-for">{item.title}</div>
                            </Grid>
                        ))}
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} className={classes.personName}>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="h3.fontSize" fontWeight="fontWeightBold" m={1}>
                            {person.name}
                        </Box>
                    </FormGroup>
                    <hr />
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1}>
                            <img style={{ padding: "3px" }} width="20px" src="image/facebook.svg" />
                            <img style={{ padding: "3px" }} width="20px" src="image/instagram.svg" />
                            <img style={{ padding: "3px" }} width="20px" src="image/twitter.svg" />
                        </Box>
                    </FormGroup>
                    <FormGroup row className={classes.whiteColor}>
                        <Box fontSize="fontSize" m={1}>{person.biography != "" ? "Biography" : null}</Box>
                        <Box style={{ textAlign: "justify" }} fontSize="fontSize" m={1}>
                            {person.biography != null ? person.biography : null}
                        </Box>
                    </FormGroup>
                    <hr />
                    <Container>
                        <Table {...person} />
                    </Container>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Casts;