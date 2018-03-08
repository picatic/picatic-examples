import moment from 'moment'

export const getDayOfMonth = date => moment(date).format('D')
export const getDayOfWeek = date => moment(date).format('DDD')
export const getMonth = date => moment(date).format('MMM')
