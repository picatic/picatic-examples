import React from 'react'
import moment from 'moment'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

const styles = {
  price: {
    fontWeight: 500,
    fontSize: 20,
    verticalAlign: 'middle',
    strike: {
      color: '#ff4632',
      textDecoration: 'line-through',
      fontStyle: 'italic'
    }
  },
  ticketHeading: {
    borderLeft: '1px solid lightgrey',
  },
  ticketTitle: {
    fontSize: 18,
  },
  ticketDate: {
    color: 'rgba(0,0,0,.54)',
  },
}

const Ticket = ({
  id,
  index,
  name,
  start_date,
  end_date,
  price,
  discount_price,
  quantity,
  quantity_sold,
  status,
  type,
  min_quantity,
  max_quantity,
  value,
  selectTicket,
  disabled,
}) => {
  const availableTickets = quantity - quantity_sold
  const maxTickets = max_quantity === 0 ? availableTickets : max_quantity

  const displayPrice = Number(price) === 0 ? 'Free' : `$${price}`
  const displayDate = getDisplayDate(start_date, end_date)
  const discountPrice = discount_price ? discount_price : ''

  return (
    <tr className="mb-3">
      <th style={styles.price} scope="row">
        <span style={discount_price && styles.price.strike}>
          {displayPrice}
        </span>{' '}
        {discountPrice}
      </th>
      <td style={styles.ticketHeading}>
        <div style={styles.ticketTitle}>{name}</div>
        <div className="text-muted">{displayDate}</div>
      </td>
      <td>
        <TextField
          id={id}
          select
          className="ml-auto"
          value={value}
          margin="dense"
          onChange={ev => selectTicket(ev.target.value, id)}
          disabled={disabled}
          
        >
          {renderMenuItems(maxTickets, min_quantity)}
        </TextField>
      </td>
    </tr>
  )
}

export default Ticket

const getDisplayDate = (start_date, end_date) => {
  if (start_date === end_date) {
    return moment(start_date).format('MMM DD, YYYY')
  } else {
    return `${moment(start_date).format('MMM DD')} - ${moment(end_date).format(
      'MMM DD, YYYY',
    )}`
  }
}

const renderMenuItems = (maxTickets, min_quantity) => {
  let arr = [0]
  for (let i = 0; i < maxTickets; i++) {
    if (min_quantity <= i && 10 > i) {
      arr.push(i + 1)
    }
  }
  return arr.map(i => (
    <MenuItem key={i} value={i} style={{minWidth: 36}}>
      {i}
    </MenuItem>
  ))
}
