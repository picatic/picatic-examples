// @flow

import React, { Component } from 'react'

import Table, {
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
  TableSortLabel
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const data = [
  { name: 'Name', attribute: 'title' },
  { name: 'Date', attribute: 'start_date' },
  { name: 'Location', attribute: 'venue_name' },
  { name: 'Capacity', attribute: 'venue_capacity' },
  { name: 'Status', attribute: 'status' }
]

class Events extends Component {
  state = {
    selected: []
  }
  componentWillMount() {
    this.props.fetchEvents()
  }
  handleSelectAll = (event, checkout) => {}
  render() {
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
              <TableCell>
                <Checkbox />
              </TableCell>
              {data.map((n, i) => <TableCell key={i}>{n.name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(event => {
              const { attributes, id } = event
              const {
                title,
                venue_name,
                venue_capacity,
                start_date,
                status
              } = attributes
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  {data.map((n, i) => (
                    <TableCell key={i}>{n.attribute}</TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Events
