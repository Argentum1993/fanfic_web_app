import React, {useEffect, useState} from 'react';
import FanficCarousel from "./carousel/FanficCarousel";
import Container from "@material-ui/core/Container";

import ApiService from '../../service/api.service'

const Home = () => {
    const [lastUpdated, setLastUpdated] = useState([])
    const [highlyRated, setHighlyRated] = useState([])

    useEffect(() => {
        ApiService.getLastUpdatedFanfics()
            .then( r => setLastUpdated(r.data) )
            .catch( e => "can't fetch last updated fanfics")

        ApiService.getHighlyRatedFanfics()
            .then( r => setHighlyRated(r.data) )
            .catch( e => "can't fetch Highly Rated fanfics")
    }, [])

    return (
        <Container>
            {lastUpdated.length > 0 &&
            <FanficCarousel items={lastUpdated} title={"Last updated"}/>
            }
            {highlyRated.length > 0 &&
            <FanficCarousel items={highlyRated} title="Rating fanfics"/>
            }
        </Container>
    );
};

export default Home;