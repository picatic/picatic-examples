// @flow

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
import Checkbox from 'material-ui/Checkbox'

const data = [
  { name: 'Name', attribute: 'title' },
  { name: 'Location', attribute: 'venue_name' },
  { name: 'Capacity', attribute: 'venue_capacity' },
  { name: 'Status', attribute: 'status' },
  { name: 'Date', attribute: 'start_date' },
]

class Events extends Component {
  state = {
    selected: [],
    rowsPerPage: 5,
    page: 0,
  }
  componentWillMount() {
    this.props.fetchEvents()
  }

  handleClick = () => {
    console.log('row')
  }

  handleChangePage = (ev, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = ev => {
    this.setState({ rowsPerPage: ev.target.value })
  }

  render() {
    const { page, rowsPerPage } = this.state
    const { events } = this.props
    const noEvents = events.length <= 0
    if (noEvents) {
      return 'Loading...'
    }
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {data.map((n, i) => <TableCell key={i}>{n.name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {events
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(event => (
                <TableRow key={event.id} hover onClick={this.handleClick}>
                  {data.map((n, i) => (
                    <TableCell key={i}>
                      {event.attributes[n.attribute]}
                    </TableCell>
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
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

export default Events
