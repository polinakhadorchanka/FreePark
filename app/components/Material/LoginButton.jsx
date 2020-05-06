import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField/TextField";

const useStyles = makeStyles({
    default: {
        width: '100%',
        height: '37px',
        backgroundColor: '#164349',
        color: '#e1e1e1 !important',
        fontSize: '11px',
        lineHeight: '14px',
        padding: '8px 15px 7px',
        '&:hover': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
        '&:active': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
        '&:focus': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
    },
    autoForm: {
        width: '250px',
        height: '37px',
        backgroundColor: '#164349',
        color: '#e1e1e1 !important',
        fontSize: '11px',
        lineHeight: '14px',
        padding: '8px 15px 7px',
        '&:hover': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
        '&:active': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
        '&:focus': {
            color: '#ffffff !important',
            backgroundColor: '#164349',
        },
    },
});

export default function LoginButton(props) {
    const classes = useStyles();

    return <Button  className={props.cl === 'autoForm' ? classes.autoForm : classes.default}
                    href={props.href} type={props.type} >
        {props.label}
    </Button>;
}