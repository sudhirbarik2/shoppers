import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardDetails from './productDetails';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    paper1: {
        padding: theme.spacing(2),
        margin: 'auto',
        width: "100%",
        height: "100%",
        backgroundColor: "#aee1e1",

    },
    image: {
        width: 128,
        height: 128,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    root: {
        width: "30%",
        maxHeight: "20%",
        margin: 10,
        borderRadius: "50%",
    },
    rootSnackbar: {
        flexGrow: 1,
    },
});

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {

            productData: null,
        }
    }
    toProductDetails = (prod) => {
        // console.log(prod);
        this.setState({ productData: prod })
    }

    render() {

        let prod = this.props.prod;
        const { classes } = this.props;
        console.log(this.state.productData);
        if (this.state.productData) {
            return <CardDetails prod={this.state.productData}></CardDetails>
        }
        else {
            return (
                <Box className={classes.root} style={{ color: "aee1e1", cursor: "pointer" }} onClick={() => this.toProductDetails(prod)}>
                    <Paper className={classes.paper1} boxShadow={3}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography varient="body2" gutterBottom>
                                    <h5>{prod.pName}</h5>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom varient="subtitle1" color="textSecondary" component="p">
                                        {prod.pDescription}
                                    </Typography>
                                    <Typography gutterBottom varient="subtitle1" color="textPrimary" component="p">
                                        ₹ {prod.price}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )
        }
    }
}
export default withStyles(styles)(Cards);