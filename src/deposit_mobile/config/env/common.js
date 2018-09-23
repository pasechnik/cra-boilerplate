import { str } from '../../utils/string'

export default {
  env: 'production',
  customerId: str.getCookie('customerId'),
}
