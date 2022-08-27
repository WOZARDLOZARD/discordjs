'use strict';

const Action = require('./Action');
const Events = require('../../util/Events');

class PresenceUpdateAction extends Action {
  handle(data) {
    const c = this.client;
    const guild = c.guilds.cache.get(data.guild_id);

    if (guild) {
      let presence = guild.presences.cache.get(data.user.id);
      let old = null;
      if (presence) {
        old = presence._clone();
      }
      presence = guild.presences._add(Object.assign(data, { guild }), false);
      if (c.listenerCount(Events.PresenceUpdate)) {
        c.emit(Events.PresenceUpdate, old, presence);
      }
    }
  }
}

module.exports = PresenceUpdateAction;