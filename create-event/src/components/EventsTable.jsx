/* @flow */

import React, { Component } from 'react'
import { eventColumnData } from '../constants/TableColumns'

import Table, {
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table'
import Tooltip from 'material-ui/Tooltip'

type Props = {
  data: Array<mixed>,
}

type State = {
  data: Array<mixed>,
  order: string,
  orderBy: string,
  rowsPerPage: number,
  page: number,
}

class EventsTable extends Component<Props, State> {
  render() {
    const {
      events,
      eventsTable,
      handleChangeTable,
      handleRequestSort,
      handleClickRow,
    } = this.props
    const { order, orderBy, rowsPerPage, page } = eventsTable

    return (
      <Table>
        <TableHead>
          <TableRow>
            {eventColumnData.map((n, i) => (
              <TableCell key={i}>
                <Tooltip
                  title={orderBy !== n.attribute ? 'desc' : order}
                  enterDelay={300}
                  placement="bottom-start"
                >
                  <TableSortLabel
                    active={orderBy === n.attribute}
                    direction={order}
                    onClick={ev => handleRequestSort(ev, n.attribute)}
                  >
                    {n.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {events
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(obj => (
              <TableRow
                key={obj.id}
                hover
                onClick={() => handleClickRow(obj.id)}
              >
                {eventColumnData.map((n, i) => (
                  <TableCell key={i}>{obj.attributes[n.attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={events.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={(ev, page) => handleChangeTable('page', page)}
              onChangeRowsPerPage={ev =>
                handleChangeTable('rowsPerPage', ev.target.value)}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

export default EventsTable
