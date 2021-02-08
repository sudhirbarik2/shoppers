import React, { Component } from "react";
// import ProdObj from '../actions/ProdAction';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const styles = theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tabRow:{
        backgroungColor:"red",
    },
});
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            open: "",
        }
    }
    componentWillMount = () => {
        axios.get("http://localhost:2000/orders/getAll")
            .then(response => {
                this.setState({
                    orders: response.data
                })
            })
    }
    redirectToCartApp = (orderId) => {
        let url = "http://localhost:3000/home/" + orderId;
        window.open(url, '_blank');
    }
    setOpen = (id) => {
        if(id===this.state.open){
            this.setState({ open: "" })
        }else{
            this.setState({ open: id })
        }
    }
    renderRows = (row) => {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TableRow className={classes.root} style={{backgroundColor:"#aee1e1"}}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(row.orderId)}>
                            {(this.state.open==row.orderId) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.orderId}</TableCell>
                    <TableCell component="th" scope="row">{row.orders.length}</TableCell>
                    <TableCell component="th" scope="row">{row.totalPrice}</TableCell>
                    <TableCell component="th" scope="row" style={{ cursor: "pointer" }} onClick={()=>this.redirectToCartApp(row.orderId)}><ArrowForwardIcon/></TableCell>
                </TableRow>


                <TableRow>

                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={(this.state.open===row.orderId)} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="left" style={{fontWeight:"bold"}}>Product Name</TableCell>
                                            <TableCell align="left" style={{fontWeight:"bold"}}>Color</TableCell>
                                            <TableCell align="left" style={{fontWeight:"bold"}}>Price</TableCell>
                                            <TableCell align="left" style={{fontWeight:"bold"}}>Gift Wrap</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.orders.map((historyRow) => (
                                            <TableRow key={historyRow.pName}>
                                                <TableCell component="th" scope="row">{historyRow.pName}</TableCell>
                                                <TableCell>{historyRow.color}</TableCell>
                                                <TableCell>{historyRow.price}</TableCell>
                                                <TableCell align="left">{historyRow.giftWrap?"Yes":"No"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>


        )
    }
    render() {
        const { classes } = this.props;

        return (
            <TableContainer component={Paper} style={{width:"98%",marginLeft:"1%",marginRight:"1%",marginTop:"10px"}}>
                <Table aria-label="collapsible table">
                    <TableHead style={{backgroundColor:"#116466",color:"#aee1e1"}}>
                        <TableRow className={classes.tabRow}>
                            <TableCell />
                            <TableCell  style={{color:"white"}}>Order ID</TableCell>
                            <TableCell align="left" style={{color:"white"}}>No. of products</TableCell>
                            <TableCell align="left"  style={{color:"white"}}>Total Amount</TableCell>
                            <TableCell align="left"  style={{color:"white"}}>View in ShopCart</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.orders.map((row) => (
                                this.renderRows(row)
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
export default withStyles(styles)(AdminHome);