import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Attendee } from "../models/Attendee.js"
import { Ticket } from "../models/Ticket.js"
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
    // debugger
    const res = await api.get('account/tickets')
    logger.log('Get My tickets raw data', res.data)
    // AppState.myAttendees = res.data
    AppState.myAttendees = res.data.map(e => new Ticket(e))
    logger.log('[get My tickets]', AppState.myAttendees)
  }
}

export const accountService = new AccountService()
