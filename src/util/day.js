import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default {
  fromNow: (timeStamp, flag = true) => {
    return dayjs(timeStamp).fromNow(flag)
  },
  format: (timeStamp, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(timeStamp).format(pattern)
  }
}
