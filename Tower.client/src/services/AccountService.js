import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
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
    AppState.towerEvents = res.data.map(e => new TowerEvent(e))
    logger.log('[get My tickets]', AppState.towerEvents)
  }
}

export const accountService = new AccountService()
