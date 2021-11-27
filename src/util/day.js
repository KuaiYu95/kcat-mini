import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)

export default {
  fromNow: (timeStamp) => {
    return dayjs(timeStamp).fromNow(true)
  },
  format: (timeStamp, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(timeStamp).format(pattern)
  }
}
