import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {Redirect, useLocation} from "react-router-dom";
import {Pagination} from "@material-ui/lab";

import ApiService from "../../service/api.service"
import FanficCard from "./FanficCard";

const useStyles = makeStyles((theme) => ({
   containerResult: {
       marginTop: theme.spacing(2),
       marginBottom: theme.spacing(2),
   },
    card: {
       width: 200,
       margin: theme.spacing(2)
    },
}));

const FANFICS_PER_PAGE = 5

const SearchResultBody = ({ fandom }) => {
    const classes = useStyles()
    const [fanficCount, setFanficCount] = useState()
    const [fanfics, setFanfics] = useState()
    const [page, setPage] = useState(0)

    useEffect(() => {
        ApiService.getCountFanficsByFandomId(fandom.id).then(r => setFanficCount(Number.parseInt(r.data)))
    }, [fandom])

    useEffect(() => {
        ApiService.getFanficsByFandomId(fandom.id, {pageSize: FANFICS_PER_PAGE, pageNumber: page})
            .then(r => setFanfics(r.data))
    }, [page, fandom])

    return (
        <Container className={classes.containerResult}>
            {fanfics && fanficCount ?
                <Paper>
                    <Box
                        display="flex"
                        width="100%"

                        flexDirection="column"
                    >
                        <Box display="flex" fontSize={30} margin={2} justifyContent="center" flexDirection="column">
                            {fandom && fandom.name}
                            {fanfics &&
                            <Box display="flex" justifyContent="center" margin={2}>
                                {
                                    fanfics.map((fanfic, i) =>
                                        <FanficCard
                                            className={classes.card}
                                            key={fanfics.id + SearchResultBody.name + "p"}
                                            fanfic={fanfic}
                                        />
                                    )
                                }
                            </Box>
                            }
                        </Box>
                        <Grid container justify="center">
                            <Grid item>
                                <Box margin={2}>
                                    <Pagination
                                        onChange={(e, p) => setPage(p - 1)}
                                        count={fanficCount / FANFICS_PER_PAGE} shape="rounded"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                :
                <CircularProgress />
            }
        </Container>
    )
}

const SearchResults = () => {
    const location = useLocation()
    const fandom = location.state ? location.state.fandom : null

    return (
        <>
            {fandom ?
                <SearchResultBody fandom={fandom}/>
                :
                <Redirect to="/" />
            }
        </>
    );
};

export default SearchResults;