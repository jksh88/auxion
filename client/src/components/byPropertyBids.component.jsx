import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from './tableContainer.component';

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
  const data = props.location.state.map((bid) => ({
    ...bid,
    closingDate: convertDate(bid.closingDate),
    createdAt: convertDate(bid.createdAt),
  }));

  return (
    <div>
      <TableContainer columns={columns} data={data} />
    </div>
  );
};

export default ByPropertyBids;
