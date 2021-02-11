import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from './tableContainer.component';
import './byPropertyBids.styles.css';
import { convertAmount } from './convertAmount';

//cannot use hooks outside of component. Always put hooks inside the component!

const ByPropertyBids = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Bid Price',
        accessor: 'purchasePrice',
      },
      {
        Header: 'Deposit',
        accessor: 'deposit',
      },
      {
        Header: 'DD days',
        accessor: 'dueDiligence',
      },
      {
        Header: 'Closing Date',
        accessor: 'closingDate',
      },
      {
        Header: 'Submitted on',
        accessor: 'createdAt',
      },
    ],
    []
  );
  const convertDate = (date) =>
    new Intl.DateTimeFormat('en-US').format(new Date(date));
  // const convertAmount = (amount) =>
  //   new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: 'USD',
  //     maximumSignificantDigits: 6,
  //   }).format(amount);
  console.log('PROPSSS: ', props);
  const data = props.location.state.map((bid) => ({
    ...bid,
    closingDate: convertDate(bid.closingDate),
    createdAt: convertDate(bid.createdAt),
    purchasePrice: convertAmount(bid.purchasePrice),
    deposit: convertAmount(bid.deposit),
  }));

  return (
    <div className="by-property-bids">
      <div className="bids-title">{`< All ${props.location.state.length} Bids You Have Received To Date >`}</div>
      <TableContainer columns={columns} data={data} />
    </div>
  );
};

export default ByPropertyBids;
