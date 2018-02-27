import React from 'react'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import Text from '../jellyfish/Text'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import { getDayOfMonth, getMonth } from '../utils/dateUtils'

const styles = {
  root: {
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    paddingBottom: '16px',
    paddingTop: '16px',
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
      borderBottom: 'none',
    },
  },
  price: {
    verticalAlign: 'middle',
    strike: {
      color: '#ff4632',
      textDecoration: 'line-through',
      fontStyle: 'italic',
    },
  },
}

const Ticket = props => {
  const {
    classes,
    id,
    name,
    start_date,
    end_date,
    price,
    discount_price,
    quantity,
    quantity_sold,
    min_quantity,
    max_quantity,
    value,
    selectTicket,
    disabled,
    description,
  } = props

  const availableTickets = quantity - quantity_sold
  const maxTickets = max_quantity === 0 ? availableTickets : max_quantity

  const displayPrice = Number(price) === 0 ? 'Free' : `$${price}`
  const discountPrice = discount_price ? discount_price : ''

  const month = getMonth(start_date)
  const startDayOfMonth = getDayOfMonth(start_date)
  const endDayOfMonth = getDayOfMonth(end_date)

  const endDayLabel = start_date !== end_date ? `- ${endDayOfMonth}` : ''

  const className = classNames('flex items-center', classes.root)
  return (
    <div className={className}>
      <div className="col pr2">
        <TextField
          id={id}
          select
          className="ml-auto"
          value={value}
          margin="dense"
          onChange={ev => selectTicket(ev.target.value, props)}
          disabled={disabled}
        >
          {renderMenuItems(maxTickets, min_quantity)}
        </TextField>
      </div>
      <div className="col flex-auto">
        <Text type="subheading">{name}</Text>
        <Text color="muted">
          {month} {startDayOfMonth} {endDayLabel} {description}
        </Text>
      </div>
      <div className="col">
        <Text type="subheading">{displayPrice}</Text>
        <Text>{discountPrice}</Text>
      </div>
    </div>
  )
}

export default injectSheet(styles)(Ticket)

const renderMenuItems = (maxTickets, min_quantity) => {
  let arr = [0]
  for (let i = 0; i < maxTickets; i++) {
    if (min_quantity <= i && 10 > i) {
      arr.push(i + 1)
    }
  }
  return arr.map(i => (
    <MenuItem key={i} value={i} style={{ minWidth: 36 }}>
      {i}
    </MenuItem>
  ))
}
