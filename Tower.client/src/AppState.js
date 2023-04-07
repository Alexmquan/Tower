import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],
  /** @type {import('./models/TowerEvent.js').MyEvent[]} */
  myEvents: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent} */
  activeTowerEvent: null,

  /** @type {import('./models/Attendee.js').Attendee[]} People attending a specific event*/
  attendees: [],
  /** @type {import('./models/Ticket.js').Ticket[]} Events that I am attending*/
  myAttendees: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],

})
