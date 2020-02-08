import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FormGroup } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

const Body = (props) => {
    const { getpopular } = props;
    const [underline, setUnderline] = useState('popular');
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [page, setPage] = React.useState(0);
    const [length, setLength] = React.useState(500);

    // on img click will redirect you to movie page
    const onImageClick = (data) => {
        props.history.push({
            pathname: '/movie',
            state: {
                data: JSON.stringify(data),
            }
        });
    }
    const onSuggestionClick = (e) => {
        switch (e.target.id) {
            case "popular":
                setUnderline('popular');
                props.fetch_getpopular_data('popular');
                //assign back the pagination number when click back 
                setPage(0);
                setLength(500);
                break;
            case "week":
                setUnderline('week');
                props.fetch_getpopular_data('week');
                setPage(0);
                setLength(0);
                break;
            case "month":
                setUnderline('month');
                props.fetch_getpopular_data('month');
                setPage(0);
                setLength(0);
                break;
            default:
                break;
        }
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        props.fetch_getpopular_data('popular', newPage + 1);
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <FormGroup row className="color-formgrp" onClick={(event) => { onSuggestionClick(event) }}>
                        <Box className="text-suggestion" fontSize="fontSize" m={1}>
                            SUGGESTIONS
                        </Box>
                        <Box id="popular" fontSize="fontSize" m={1} style={{ textDecoration: underline == "popular" ? "underline" : "none" }}>
                            Popular
                        </Box>
                        <Box id="week" fontSize="fontSize" m={1} style={{ textDecoration: underline == "week" ? "underline" : "none" }}>
                            Today Trending
                        </Box>
                        <Box id="month" fontSize="fontSize" m={1} style={{ textDecoration: underline == "month" ? "underline" : "none" }}>
                            This week Trending
                        </Box>
                        <TablePagination

                            style={{ margin: "0 auto", marginRight: "0", color: "#FFF" }}
                            rowsPerPageOptions={[]}
                            component="div"
                            count={length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </FormGroup>
                </Grid>
                {getpopular.getpopular.results && getpopular.getpopular.results.map((item, index) => (
                    <Grid item className="grid-size" xs={6} sm={3} md={4} lg={2} key={`${index}Keys`} onClick={() => { onImageClick(item) }}>
                        <div className="quality">HD</div>
                        <img width="auto" height="200px" className="img-size" alt={item.title} src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                        <div className="movie-title">{item.title}</div>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Body;