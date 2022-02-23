# @wozardlozard/discord.js

## Useful links
* [Main discord.js package](https://www.npmjs.com/package/discord.js)
* [discord.js site](https://discord.js.org)

## About

This package is a custom branch of the Discord.js library, with better support for user presences and receiving the `presenceUpdate` event.

## Usage

**Important: The `GUILD_PRESENCES` privileged intent is required to receive presence-related data and events! Please ensure that it is enabled before using this package.**

##### Importing the package:
```js
const Discord = require('@wozardlozard/discord.js');
```

##### Populating presences on startup:
(The discord.js library does not cache offline member presences on bot startup. As such, the `oldPresence` parameter upon receiving the `presenceUpdate` event for offline members will be `null`. If you would like to receive data for the `oldPresence` parameter for offline members, implement the following code in your bot's `ready` event.)
```js
<Client>.on('ready', () => {
  <Client>.guilds.cache.forEach(guild => {
    guild.members.fetch({ withPresences: true }).then(members => {
      members.forEach(m => {
        if (!guild.presences.cache.map(x => x.userId).includes(m.id)) {
          guild.presences._add(Object.assign({
            user: { id: m.id },
            status: "offline",
            activities: [],
            client_status: {},
          }, { guild }), true);
        }
      });
    });
  });
});
```

##### Updating presence cache on PresenceUpdate
(By default, this library does NOT cache a user's presence upon receiving the `PresenceUpdate` event. As such if you would like to keep track of a user's presence, manually cache the user's presence upon receiving the `PresenceUpdate` event.)
```js
<Client>.on('presenceUpdate', (oldPresence, newPresence) => {
  newPresence.guild.presences._add(newPresence, true);
});
```
