import {Box} from "@material-ui/core";
import React from "react";

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function refresh() {
    document.location.reload(false);
}


export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {value === index && children}
                </Box>
            )}
        </div>
    );
}

export const useStyles = theme => ({
    datasetsHeader: {
        alignItems: "top",
        display: 'flex',
        flexDirection: 'row',
    },
    datasetsHeaderCreate: {
        width: 150,
        margin: "8px 8px 8px 0"
    },
    datasetsHeaderSelect: {
        width: 150,
        top: 0,
        margin: "8px 8px 8px 0"
    },
    metadataHeader: {
        alignItems: "top",
        display: 'flex',
        flexDirection: 'row',
    },
    metadataHeaderCreate: {
        width: 150,
        margin: "8px 8px 8px 0"
    },
    metadataHeaderSelect: {
        width: 150,
        top: 0,
        margin: "8px 8px 8px 0"
    },
    selectFullWidth: {
        top: 0,
        margin: "8px 8px 8px 0"
    },
    sampleDatasetHeader: {
        alignItems: "top",
        display: 'flex',
        flexDirection: 'row',
    },
    sampleMetadataHeader: {
        alignItems: "top",
        display: 'flex',
        flexDirection: 'row',
    },
    activeComponent: {
        marginTop: 8
    },
    sampleDatasetPaper: {
        marginTop: 8
    },
    sampleMetadataPaper: {
        marginTop: 8
    },

    experimentHeaderCreate: {
        width: 150,
        margin: "8px 8px 8px 0"
    },
    experimentHeaderCreateUnconstrained: {
        margin: "8px 8px 8px 0"
    },
    experimentHeaderSelect: {
        width: 150,
        top: 0,
        margin: 0,
        marginTop: 5,
        marginRight: 8

    },

    smallTextField: {
        width: 128
    },

    button: {
        height: 36,
        minWidth: 150,
        padding: 6,
        margin: "8px 8px 8px 0"
    },
    select: {
        height: 36,
        minWidth: 200,
        top: 0,
        margin: "8px 8px 8px 0"
    },

    editableTypography: {
        minWidth: 100,
    }
});