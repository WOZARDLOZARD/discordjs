'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');

class PresenceUpdateAction extends Action {
  handle(data) {
    const c = this.client;
    const guild = c.guilds.cache.get(data.guild_id);
    let presence = guild.presences.cache.get(data.user.id);
    let old = null;
    if (presence) {
      old = presence._clone();
    }
    presence = guild.presences.add(Object.assign(data, { guild }), false);
    if (c.listenerCount(Events.PRESENCE_UPDATE)) {
      c.emit(Events.PRESENCE_UPDATE, old, presence);
    }
  }
}

module.exports = PresenceUpdateAction;
