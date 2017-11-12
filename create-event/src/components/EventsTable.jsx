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
  componentWillMount() {
    const { events, eventsTable, handleChangeTable } = this.props
    const { initialSort, order, orderBy } = eventsTable
    if (!initialSort) {
      this.sortData(events, order, orderBy)
      handleChangeTable('initialSort', true)
    }
  }

  sortData = (data, order, orderBy) => {
    const sortedData =
      order === 'desc'
        ? data.sort(
            (a, b) => (b.attributes[orderBy] < a.attributes[orderBy] ? -1 : 1),
          )
        : data.sort(
            (a, b) => (a.attributes[orderBy] < b.attributes[orderBy] ? -1 : 1),
          )

    this.props.updateEvents(sortedData)
  }

  handleRequestSort = orderBy => ev => {
    let order = 'desc'
    const { events, eventsTable, handleChangeTable } = this.props

    if (eventsTable.orderBy === orderBy && eventsTable.order === 'desc') {
      order = 'asc'
    }

    this.sortData(events, order, orderBy)
    handleChangeTable('order', order)
    handleChangeTable('orderBy', orderBy)
  }

  render() {
    const {
      events,
      eventsTable,
      handleChangeTable,
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
                    onClick={this.handleRequestSort(n.attribute)}
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
