import PropTypes from "prop-types";
import React from "react";
import { texts } from "../../texts";

const descendingComparator =
    (a, b, orderBy) => (b[orderBy] < a[orderBy]) ? -1 : (b[orderBy] > a[orderBy]) ? 1 : 0;

export const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);

export const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return (order !== 0) ? order : a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

export default function SortedTableHeader(props) {
    const { order, orderBy, onRequestSort, columns, operations } = props;
    const createSortHandler = property => event => onRequestSort(event, property);

    return (
        <thead>
            <tr>
                {columns.map(column => {
                    let label = column.label;
                    return (
                        <th className='pointer' key={column.id}>                            
                            <div
                                direction={orderBy === column.id ? order : 'asc'}
                                onClick={createSortHandler(column.id)}>
                                {label}
                                {orderBy === column.id
                                    ? order === 'desc'
                                        ? <i className="tiny material-icons">{texts.icons.arrowDown}</i>
                                        : <i className="tiny material-icons">{texts.icons.arrowUp}</i>
                                    : null}
                            </div>
                        </th>
                    )
                })}
                {operations
                    ? <th
                        key='operations'
                        align='center'
                        className='pointer'>
                        {texts.fields.operations}
                    </th>
                    : null}
            </tr>
        </thead>
    );
};

SortedTableHeader.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    operations: PropTypes.bool,
};
