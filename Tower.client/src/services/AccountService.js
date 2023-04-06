import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Attendee } from "../models/Attendee.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getMyTickets() {
    const res = await api.get('account/tickets')
    logger.log('Get My tickets raw data', res.data)
    AppState.attendees = res.data.map(e => new Attendee(e))
    logger.log('[get My tickets]', AppState.attendees)
  }
}

export const accountService = new AccountService()
