<TableRow>

    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                    Order Details
                                                    </Typography>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>color</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Gift Wrap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.orders.map((historyRow) => (
                            <TableRow key={historyRow.pname}>
                                <TableCell component="th" scope="row">
                                    {historyRow.color}
                                </TableCell>
                                <TableCell>{historyRow.price}</TableCell>
                                <TableCell align="right">{historyRow.giftWrap}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </Box>
        </Collapse>
    </TableCell>
</TableRow>