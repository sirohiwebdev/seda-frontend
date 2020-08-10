import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTH = styled.th`
  text-align: left;
`;

const StyledTD = styled.td`
  cursor: pointer;
`;

const List = ({ columnOrder, invisibleColumns, items, onItemClick, primaryKeyColumn, className }) => {
  if (!items.length) {
    return null;
  }

  const filterVisibleColumns = colHeader => invisibleColumns.includes(colHeader) === false;

  const colHeaders = (columnOrder.length && columnOrder) || Object.keys(items[0]).filter(filterVisibleColumns);

  const CategoryLabel = ['Category Level 1', 'Category Level 2', 'Category Level 3', 'Category Level 4'];

  return (
    <table cellPadding="0" cellSpacing="0" width="100%" className={className}>
      <thead>
        <tr>
          {colHeaders.map(colHeader => (
            <StyledTH key={colHeader}>{colHeader}</StyledTH>
          ))}
        </tr>
      </thead>

      <tbody>
        {items.map((row, rowIndex) => (
          <tr
            key={JSON.stringify(items[rowIndex])}
            data-item-id={primaryKeyColumn && items[rowIndex][primaryKeyColumn]}
            onClick={onItemClick}
          >
            <StyledTD key={JSON.stringify(row['Naam'])}>{row['Naam']}</StyledTD>
            {CategoryLabel.map((values, level) => (
              <>
                <StyledTD key={values.replace(' ', '-')}>
                  {row['categories'].map((sub, index) => (
                    <>
                      <span>{sub[level] || 'Null'}</span>
                      <br />
                    </>
                  ))}
                </StyledTD>
              </>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

List.defaultProps = {
  columnOrder: [],
  invisibleColumns: [],
  onItemClick: null,
  primaryKeyColumn: undefined,
};

List.propTypes = {
  className: PropTypes.string,
  /** List of column names in the order of which they should be displayed */
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  /** List of column names that should not be displayed */
  invisibleColumns: PropTypes.arrayOf(PropTypes.string),
  /** List of key/value pairs */
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /** Row click callback handler */
  onItemClick: PropTypes.func,
  /** Name of the column that contains the value that is used to build the URL to navigate to on item click */
  primaryKeyColumn: PropTypes.string,
};

export default List;
