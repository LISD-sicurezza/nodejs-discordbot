# discordbot
Dependencies discord.js

to install discord.js
open up cmd
cmd CD where your folder for the bot is 
EXAMPLE cd C:\Users\josh\Desktop\js projects\discordbot
then npm install discord.js

to start the bot cd where the start.js is at then do: node start.js

this will then run the bot! it should be logged in to the discord server


=============== MAIN TO DO ==========================

#1 TOP PRIORITY ========== Moderation Commands - STAFF ONLY ==========================================================
When developing these commands make sure to add the permission setting first to prevent accidental use from someone else
[✔] Own moderation.js file for all these commands
[] After creation try to make variables for same code to prevent constant reuse
[] Make sure EVERYTHING in this .js is nice and clean this should be your last step
[] async needs to be caught with .catch due to deprecation 

[✔] Add !kick
  [✔] Add Reason for kick TRACKING
  [✔] Add Staff who kicked Suspect TRACKING
  [✔] Add Suspect Kicked by Staff TRACKING
    [✔] Add a log channel that Staff can see [STAFF THAT KICKED] [WHO THEY KICKED] [Custom reason for kick] [Include Timestamp]
    [?] Send Suspect DM showing [STAFF THAT KICKED] [REASON FOR KICK] if they want to dispute a kick they can contact another Admin
    This is done however the bot kicks the user before it can send the message. It needs to Send Message ---> then Kick

[] Add !ban / !tempban
  [?] Add Reason for ban TRACKING - CODE Created and done with !kick not implemented yet
  [?] Add Staff who banned Suspect TRACKING - CODE Created and done with !kick not implemented yet
  [?] Add Suspect banned by Staff TRACKING - CODE Created and done with !kick not implemented yet
    [?] Add a log channel that Staff can see [STAFF THAT BANNED] [WHO THEY BANNED] [Custom reason for ban] [Include Timestamp]
    [] Send Suspect DM showing [STAFF THAT KICKED] [REASON FOR BAN] if they want to dispute a ban they can contact another Admin

[] Add !mute / !tempmute
  [?] Add Reason for Mute TRACKING - CODE Created and done with !kick not implemented yet
  [?] Add Staff who muted Suspect TRACKING - CODE Created and done with !kick not implemented yet
  [?] Add Suspect muted by Staff TRACKING  - CODE Created and done with !kick not implemented yet
    [?] Add a log channel that Staff can see [STAFF THAT MUTED] [WHO THEY MUTED] [Custom reason for ban] [Include Timestamp] - CODE Created and done with !kick not implemented yet
    [] Send Suspect DM showing [STAFF THAT KICKED] [REASON FOR BAN] if they want to dispute a ban they can contact another Admin

[] Add !delete / !clear
  [] !delete 0 specify how many messages to delete in the channel command is ran
  [] !clear clears all messages in a channel
    [] 

This is for all Moderation Commands!

[] Once command is ran it will say [STAFF NAME] [KICK / BAN / MUTE / etc..] [SUSPECT] [TIME... if any] in the current channel it's ran
  [] Add REACT Confirm Option with ✔️ ❌ reactions. Select ❌  it will cancel the command
    [] After Commands are confirmed and ran or canceled they will auto delete the user who used the !command and the display. (Not in log channel after it went through)

#2 MEDIUM PRIORITY ========== SERVER MODERATION BOT AUTO DOES ==========================================================
this will use moderation commands for itself so do this after #1

[] Add deleting all caps and duplicate messages
  [] Add Message deleting notification [@USER YOUR MESSAGE WAS DELETED FOR TOO MANY CAPS ... etc] then after 5 seconds will delete the notification message it sent
    [] If user continues to spam !tempmute them

Try to develop this one after mod commands so they can be punished if they keep it up
[] Add blacklist words in a json file
  [] If message is blacklisted delete message and tell user to stop being naughty

#3 MEDIUM PRIORITY ======== ANYTHING OTHER COMMANDS WE MIGHT WANT TO ADD ========================

[] add !author tells Josh / Luke created the bot using discord.js and node.js

#4 LAST PRIORITY ========== CLEAN UP RE DO SOME CODE TO WORK BETTER ADD UNNEEDED STUFF  ==========================================================

[] Add the bot to it's own server so it's up 24/7
  [] If the bot crashes it should start again (This will be a server provider setting not our code)

LAST OF LAST PRIORITY
[] Make a mySQL Database that it can connect to for reasons we might want later
  [] Keep track of a currency and possibly warns user has

