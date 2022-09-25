# Rhodey, the Discord Catbot

## Organization
```
functions/              # autocode-mandated location for all events/triggers/etc
  events/
    autocode/           # contains a "run-when-deployed" script (doesn't work)
    discord/ 
      commands/         # handlers for slash commands
      bot_mentions.js   # handles bot mentions (e.g. @rhodey)
    scheduler/          # cron triggers (e.g. weekly/daily/etc)
actions/                # place where I put event-agnositc behaviors 
```

## TODO
- Set default channel ids in k/v store using slash commands
- Remove need from any server-specific ids from env vars

## Changelog

### 1.3.0
- Remove content from weekly-1.js and use create-sesh.js content. 
- Split weekly into 2, challenges and sesh 

### 1.2.1
- deleting commented code and adding real comments

### 1.2.0
- started following proper semvar
- added vog command handler
- added vog command to actions/update-commands

### 1.1.0
- disabled lost sectors
- updated mods display

### 1.0.10
- fixed &amp; appearing in text

### 1.0.9
- fixed saturday sesh being on friday

### 1.0.7
- rhodey now includes DSC raid challenges in weekly update
- weekly update now runs at 2:15pm ET
- daily update now runs at 2:30pm ET
- sesh event notification now in raid channel

### 1.0.6
- rhodeybot now creates sesh events automatically at noon on mondays
- add bot mention to manually trigger event creation

### 1.0.5
- updated bot mention to refresh commands

### 1.0.4
- added /dsc command
- added autocode.self.deployed command refresher

### 1.0.3 and previous
- /dailythread command
- scheduled dailythread updater
- simple rhodeyface bot mention

