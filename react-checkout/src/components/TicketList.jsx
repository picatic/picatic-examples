import React, { Component } from 'react'
import TicketsContainer from '../containers/TicketsContainer'
import PromoCode from '../components/PromoCode'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = {
  eventCard: {
    background: '#FFF',
    boxShadow: '0 4px 24px 0 rgba(0,0,0,.12)',
  },
}

class TicketList extends Component {
  render() {
    const {
      event,
      widget,
      hasSelectedTickets,
      createCheckout,
      promoCode,
    } = this.props
    const { showTitle, showSummary, cta } = widget

    return (
      <section className="p-5 rounded" style={styles.eventCard}>
        <Typography variant="display3">
          {showTitle ? event.attributes.title : 'Tickets'}
        </Typography>
        {showSummary && <Typography variant="display2">{event.attributes.summary}</Typography>}
        <TicketsContainer />
        <hr />
        <div className="d-flex flex-row">
          <PromoCode {...this.props} error={promoCode.error} />
          <form className="ml-auto">
            <Button
              raised
              color="primary"
              disabled={!hasSelectedTickets}
              onClick={createCheckout}
              className="mt-1"
            >
              {cta}
            </Button>
          </form>
        </div>
      </section>
    )
  }
}

export default TicketList
