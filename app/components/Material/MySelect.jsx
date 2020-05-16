import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    default: {
        width: '100%',
        marginBottom: '15px',
        '& input': {
            fontSize: '12px'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '1px solid #1e1e1e',
            backgroundColor: 'white'
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function NativeSelects(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        item: '',
    });

    const handleChange = (event) => {
        setState({
            ...state,
            item: event.target.value,
        });
    };

    return (
        <div>
            <FormControl className={classes.default} size="small">
                <Select
                    native
                    value={state.item}
                    onChange={handleChange}
                    inputProps={{
                        name: 'item',
                        id: props.id,
                    }}
                >
                    {props.values.map(function (val) {
                        return <option value={val.mark + ' ' + val.model + ' ' + val.number} key={val}>{val.mark + ' ' + val.model + ' ' + val.number}</option>;
                    })}
                </Select>
            </FormControl>
        </div>
    );
}