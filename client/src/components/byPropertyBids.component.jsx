import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from './tableContainer.component';

//cannot use hooks outside of component. Always put hooks inside the component!

const ByPropertyBids = (props) => {
  const [bids, setBids] = useState([]);
  const { id } = props.match.params;
  useEffect(() => {
    const fetchOptions = {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };
    fetch(`http://localhost:8000/properties/${id}/bids`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA is: ', data);
        setBids(data.bids);
      })
      .catch((err) => console.log(err));
  }, []);

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
  const data = bids.map((bid) => ({
    ...bid,
    closingDate: convertDate(bid.closingDate),
    createdAt: convertDate(bid.createdAt),
  }));

  return <div>{bids && <TableContainer columns={columns} data={data} />}</div>;

  console.log(props);
  return <div>{JSON.stringify(props.history.location.state)}</div>;
};

export default ByPropertyBids;
