import React from 'react';
import {Rating} from "@material-ui/lab";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    icon: {
       height:2
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon/>,
        label: 'Very Satisfied',
    },
};



function IconContainer(props) {
    const { value, ...other } = props;

    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

const FanficRating = ({rating, ...args} ) => {

    return (
        <Rating
            name="customized-icons"
            value={rating}
            getLabelText={(value) => value > 0 ? customIcons[value].label : "" }
            IconContainerComponent={IconContainer}
            {...args}
            readOnly
        />
    );
};

export default FanficRating;