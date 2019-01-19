# DiscordBot/dsg
This Discord Chat Bot was created using Node.js.
Nav TO-DO

# Dependencies: 
discord.js

# Installation
Navigate to your './DiscordBot' folder
Open up CMD Prompt then cd into './DiscordBot'
EXAMPLE 'cd C:\Users\josh\Desktop\DiscordBot'
Now you want to npm install all dependencies or it will not work.
EXAMPLE npm install discord.js
(You need to do this for each dependency listed above)

if done right you will now have a node-modules folder like './DiscordBot/node-modules'

# Running the bot
To run the bot simply navigate cd back to './DiscordBot' (You might be here if on installation step)
then type 'node start.js' this will have Node.js start the start.js

# TO DO
Updated 1/18/19
- [x] Add Permissions.js to find if they have role needed for command usage

- [x] Add config.json
- [x] Read config.json
- [ ] Write to config.json

- [x] Add !kick command - Kicks user from server - uses permission.js to check for perms
- [x] Add reason for kick - required
- [x] Show staff who kicked
- [x] Show suspect kicked
- [x] Send DM to suspect saying who they were kicked by and why
- [x] !kick logs to channel - also channel it's used in shows a 10 second notification after use
- [ ] Have bot kick AFTER DM is sent (Right now kick is ran after 2 seconds this is a work around not done)
- [ ] Command has a react to confirm option runs command only after AUTHOR WHO RAN COMMAND CONFIRMS IT
- [ ] Command react confirm will auto delete the message after say 20 seconds
- [ ] FINAL !kick - Review all code make sure all bugs are squashed

- [x] Add !ban command - bans user from server - uses permission.js to check for perms
- [x] Add reason for ban - required
- [x] Show staff who banned
- [x] Show suspect banned
- [x] Send DM to suspect saying who they were banned by and why
- [x] !ban logs to channel - also channel it's used in shows a 10 second notification after use
- [ ] Have bot ban AFTER DM is sent (Right now ban is ran after 2 seconds this is a work around not done)
- [ ] Command has a react to confirm option runs command only after AUTHOR WHO RAN COMMAND CONFIRMS IT
- [ ] Command react confirm will auto delete the message after say 20 seconds
- [ ] FINAL !ban - Review all code make sure all bugs are squashed

- [x] Add !unban command - [x] unbans user from server - uses permission.js to check for perms
- [x] Add reason for unban - required
- [x] Show staff who unbanned
- [x] Show suspect unbanned
- [ ] Send DM to suspect saying they were unbanned (DiscordAPI doesn't allow DMs to people not in guild I think)
- [x] !unban logs to channel - also channel it's used in shows a 10 second notification after use
- [ ] Command has a react to confirm option runs command only after AUTHOR WHO RAN COMMAND CONFIRMS IT
- [ ] Command react confirm will auto delete the message after say 20 seconds
- [ ] FINAL !unban - Review all code make sure all bugs are squashed

