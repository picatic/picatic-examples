import React from 'react'
import Text from '../jellyfish/Text'
import Select from '../jellyfish/Select'
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
    allDates,
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
        <Select
          id={id}
          className="ml-auto"
          value={value}
          onChange={ev => selectTicket(ev.target.value, props)}
          disabled={disabled}
          style={{ width: 64 }}
        >
          {renderMenuItems(maxTickets, min_quantity)}
        </Select>
      </div>
      <div className="col flex-auto">
        <Text variant="body3">{name}</Text>
        <Text color="muted">
          {allDates ? (
            'All Dates'
          ) : (
            <span>
              {month} {startDayOfMonth} {endDayLabel}
            </span>
          )}{' '}
          {description}
        </Text>
      </div>
      <div className="col">
        {isNaN(discount_price) ? (
          <Text variant="body3">{displayPrice}</Text>
        ) : (
          <div className="right-align">
            <Text color="primary" variant="body3">
              ${discountPrice}
            </Text>
            <Text color="primary">Save ${price - discount_price}</Text>
          </div>
        )}
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
    <option key={i} value={i}>
      {i}
    </option>
  ))
}
