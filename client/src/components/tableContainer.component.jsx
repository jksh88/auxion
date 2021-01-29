import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './tableContainer.styles.css';

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: [{ id: 'purchasePrice', desc: true }] },
    },
    useSortBy
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  return (
    // If curious what props I get as a result of calling the getter functions (getTableProps(), getRowProps())
    // Use console.log()  This will help better understand how react table works underhood.
    <table className="table-container" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {generateSortingIndicator(column)}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableContainer;
