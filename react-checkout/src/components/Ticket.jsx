import React from 'react'

// Material UI Components
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'

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
  waitlist_enabled,
}) => {
  const availableTickets = quantity - quantity_sold
  const maxTickets = max_quantity === 0 ? availableTickets : max_quantity

  const menuItems = () => {
    let arr = [0]
    for (let i = 0; i < maxTickets; i++) {
      if (min_quantity <= i && 10 > i) {
        arr.push(i + 1)
      }
    }
    return arr.map(i => (
      <MenuItem key={i} value={i} className="test-height">
        {i}
      </MenuItem>
    ))
  }

  const displayPrice = Number(price) === 0 ? 'Free' : `$${price}`
  const discountPrice = discount_price ? discount_price : ''

  return (
    <div className="d-flex align-items-center">
      <div>
        {name} |{' '}
        <span className={discount_price ? 'strike-price' : ''}>
          {displayPrice}
        </span>{' '}
        {discountPrice}
        <br />
        <div className="text-muted">{start_date} - {end_date}</div>
      </div>
      <TextField
        id={id}
        select
        className="ml-auto"
        value={value}
        margin="dense"
        onChange={ev => selectTicket(ev.target.value, id)}
      >
        {menuItems()}
      </TextField>
    </div>
  )
}

export default Ticket
