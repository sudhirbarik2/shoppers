(
    this.props.pid.map((prod, indx) => (
        <div className={classes.root} style={{ color: "#aee1e1" }}>
            <Paper className={classes.paper1}>
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
                            <Typography varient="body2" gutterBottom>
                                {prod.color ? <p>{bull}Color:<span color="textSecondary">{prod.color}</span></p> : ""}

                                {prod.addressType ? <p>{bull}{prod.addressType} address:{prod.address}</p> : ""}

                                {prod.giftWrap ? <p>{bull}With gift wrap</p> : <p>{bull}Without gift wrap</p>}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography varient="body2" Style={{ cursor: 'pointer' }}>
                                {
                                    this.state.orderStatus ? <BorderColorTwoToneIcon disabled onClick={() => this.get_data(prod.pCategory, prod.pid)} >Modify</BorderColorTwoToneIcon>
                                        :
                                        <BorderColorTwoToneIcon onClick={() => this.get_data(prod.pCategory, prod.pid)} >Modify</BorderColorTwoToneIcon>
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                    {/* <Typography varient="subtitle1" >
                        100$
                    </Typography> */}
                </Grid>
            </Paper>
        </div>
    )
    )
)