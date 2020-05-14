import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    default: {
        width: '100%',
        marginBottom: '15px',
        '& input': {
            fontSize: '14px'
        },
        '& label': {
            fontSize: '14px'
        },
        '& label.Mui-focused': {
            color: '#1e1e1e',
            '& legend': {
                fontSize: '10px'
            },
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e1e1e',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1px solid CF3F3B',
            },
            '&.Mui-focused fieldset': {
                border: '1px solid #1e1e1e',
            }, '& legend': {
                fontSize: '10px'
            },
        }
    }
});

export default function DateTime(props) {
    const classes = useStyles();

    return <TextField className={classes.default}
        id={props.id}
        label={props.label}
        type={props.type}
        InputLabelProps={{
            shrink: true,
        }}
    />
}