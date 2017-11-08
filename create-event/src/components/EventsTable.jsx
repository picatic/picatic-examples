/* @flow */

import React, { Component } from 'react'

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
  state = {
    data: [],
    order: 'desc',
    orderBy: 'start_date',
    rowsPerPage: 5,
    page: 0,
  }
  componentWillMount() {
    const { order, orderBy } = this.state
    const data = this.sortData(this.props.data, order, orderBy)
    this.setState({ data })
  }

  componentWillReceiveProps({ data }) {
    this.setState({ data })
  }

  sortData(data, order, orderBy) {
    const sortedData =
      order === 'desc'
        ? data.sort(
            (a, b) => (b.attributes[orderBy] < a.attributes[orderBy] ? -1 : 1),
          )
        : data.sort(
            (a, b) => (a.attributes[orderBy] < b.attributes[orderBy] ? -1 : 1),
          )

    return sortedData
  }

  handleChangePage = (ev, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = ev => {
    this.setState({ rowsPerPage: ev.target.value })
  }

  handleRequestSort = orderBy => ev => {
    let order = 'desc'

    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc'
    }

    const data = this.sortData(this.state.data, order, orderBy)

    this.setState({ data, order, orderBy })
  }

  render() {
    const { data, order, orderBy, page, rowsPerPage } = this.state
    const { columnData, handleRowClick } = this.props

    return (
      <Table>
        <TableHead>
          <TableRow>
            {columnData.map((n, i) => (
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
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(obj => (
              <TableRow key={obj.id} hover onClick={handleRowClick(obj.id)}>
                {columnData.map((n, i) => (
                  <TableCell key={i}>{obj.attributes[n.attribute]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

export default EventsTable
