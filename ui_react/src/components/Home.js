import React, { Component } from "react";
import ProdObj from '../actions/ProdAction';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import axios from 'axios';
import prodObj from '../actions/ProdAction';
import Cards from './Cards';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardMedia from '@material-ui/core/CardMedia';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    root: {
        width: "95%",
        margin: 10,
        backgroundColor: "#aee1e1",
        borderRadius: "50%",
    }
});
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
            DataProduct: null,
            renderReview: false,
            successMessage: "",
            orderStatus: false,
            orderMessage: "",
            fieldDisablityStatus: false,
            editColor: "FFCB9A",
            cartProduct: {
                pid: "",
                color: "",
                address: "",
                addressType: "",
                giftWrap: false,
                price: 0
            },
            pData:null,
        }
        // console.log(this.props.match.params.orderId);
        this.activeStatus = "";
        this.total=0;
    }
    pDetails=()=>{
        
    }
    componentWillMount = () => {
        if (this.props.match.params.orderId) {
            this.setState({ renderReview: true, orderStatus: true, orderMessage: "Products in the order " + this.props.match.params.orderId, fieldDisablityStatus: true });
            axios.get("http://localhost:2000/orders/getById/" + this.props.match.params.orderId)
                .then((orders) => {
                    console.log(orders.data[0].orders);
                    orders.data[0].orders.map((prd) => {
                        let action = prodObj.setForm(prd);
                        this.props.dispatch(action)
                    })
                })

        }
    }
    chk_cart = (data) => {
        const { pid } = this.props;
        var res = pid.filter(products => products.pid === data)
        return res;
    }
    renderButton = (prod, index) => {

        let res = this.chk_cart(prod.pid)
        const { giftWrap } = this.state.cartProduct;
        
            return (<Cards prod={prod} res={res} index={index} ></Cards>)
        
    }
    
    get_orders = (cartId) => {
        axios.get("http://localhost:2000/products/getAll")
            .then(response => {
                response.data.filter(item => {
                    return (item.pid.indexOf(cartId) !== -1)
                })
            })
    }
    get_data = (category, prodId) => {
        this.activeStatus = category;
        let mData;
        if (prodId) {
            mData = this.chk_cart(prodId);
        }
        axios.get("http://localhost:2000/" + category)
            .then(response => {
                this.setState({ renderReview: false, successMessage: "", productData: [], editColor: "#116466" })
                let Pdata = response.data;
                this.setState({ productData: [...Pdata] })
            })
    }
    set_render_cart = () => {
        this.setState({ renderReview: true, successMessage: "" })
        this.activeStatus = "Review"
    }
    place_order = () => {
        axios.post("http://localhost:2000/addOrder/"+this.total, this.props.pid)
            .then(response => {
                this.setState({ orderStatus: true, orderMessage: "Order Placed Successfully !" })
            }).catch((err) => {
                console.log(err);
            })
    }
    getTotal=()=>{
        this.props.pid.map((prod)=>{
            this.total+=prod.price;
        })
    }
    render_cart = () => {
        this.getTotal();
        let Pdata = [];
        this.props.pid.map((cartId) => {
            Pdata = Pdata.concat(this.get_orders(cartId.pid))
        })
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (

            <div className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead className="reviewTableHeader">
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Color</TableCell>
                                <TableCell align="left">Address Type</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">GiftWrap</TableCell>
                                <TableCell align="left">Edit</TableCell>
                                <TableCell align="left">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pid.map((prod, indx) => (
                                <TableRow key={indx}>

                                    <TableCell align="left">{prod.pName}</TableCell>
                                    <TableCell align="left">{prod.color}</TableCell>
                                    <TableCell align="left">{prod.addressType}</TableCell>
                                    <TableCell align="left">{prod.address}</TableCell>
                                    <TableCell align="left">
                                        {
                                            prod.giftWrap ? "Yes" : "No"
                                        }
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            this.state.orderStatus ? <BorderColorTwoToneIcon style={{ cursor: "pointer" }} disabled onClick={() => this.get_data(prod.pCategory, prod.pid)} />
                                                :
                                                <BorderColorTwoToneIcon style={{ cursor: "pointer" }} onClick={() => this.get_data(prod.pCategory, prod.pid)} />
                                        }
                                    </TableCell>
                                    <TableCell align="left">₹ {prod.price}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="orderTableBottom">
                                <TableCell colSpan={5} />
                                <TableCell colSpan={1}>Subtotal</TableCell>
                                <TableCell align="left">₹ {this.total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        )
    }
    render() {
        const { classes } = this.props;
        // console.log(this.props);
        return (
            <div className="row" style={{ minHeight: "100vh" }}>
                <div className="col-md-2 col-sm-2 col-lg-2 sidebarStyle position-static">
                    <ul className="list-group sideBlock">
                        <h5 className="text-center category">Categories</h5>
                        <li className={
                            (this.activeStatus == "Electronics") ? "list-group-item list-group-item-action active" : "sideMenu list-group-item list-group-item-action sideMenu"
                        }
                            onClick={() => this.get_data("Electronics")}>Electronics</li>
                        <li className={
                            (this.activeStatus == "Home") ? "list-group-item list-group-item-action active" : "sideMenu list-group-item list-group-item-action sideMenu"
                        } onClick={() => this.get_data("Home")}>Home Appliances</li>
                        <li className={
                            (this.activeStatus == "Shoes") ? "list-group-item list-group-item-action active" : "sideMenu list-group-item list-group-item-action sideMenu"
                        } onClick={() => this.get_data("Shoes")}>Shoes</li>
                        <li className={
                            (this.activeStatus == "Clothing") ? "list-group-item list-group-item-action active" : "sideMenu list-group-item list-group-item-action sideMenu"
                        } onClick={() => this.get_data("Clothing")}>Clothing</li>
                        <li className={
                            (this.activeStatus == "Review") ? "list-group-item list-group-item-action active" : " sideMenu list-group-item list-group-item-action sideMenu"
                        } onClick={() => this.set_render_cart()}>Review</li>
                    </ul>
                </div>
                <div className="col-md-10 col-sm-10 contentStyle">
                    {/* <span className="text-success text-center">{this.state.successMessage}</span> */}
                    {
                        this.state.renderReview ? (
                            <div>
                                <div className="row">
                                    {this.render_cart()}
                                </div>
                                {
                                    this.state.orderStatus ? <span className="text-success">{this.state.orderMessage}</span>
                                        :
                                        (this.props.pid.length !== 0) ? <a onClick={() => this.place_order()} className="btn btn-primary">Place Order</a> : ""
                                }
                            </div>
                        ) : (
                                <div className="row">
                                    {
                                        this.state.productData.map((prod, indx) => (
                                            this.renderButton(prod, indx)
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        pid: state.pid
    }
}
export default connect(mapStateToProps)(withStyles(styles)(Home));