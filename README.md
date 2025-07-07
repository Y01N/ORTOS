# 🅱️ortos

ORTOS (Open Roundnet Tournament Organization Software) - Eoin O’Gara and Kolton Knight

Mission Statement:
Create a community driven open source hub for roundnet tournament management.

Details:
This hub will excel at connecting the community to local tournaments and clubs. The site plans to offer a more flexible approach to tournaments by supporting leagues, squad formats, etc. Emancipating tournament organization software from the grasp of Spikeball Inc. is crucial for the development of roundnet as a sport and will open doors for new features that Spikeball Inc. has resisted implementing to Fwango as well as opportunities for better growth of local roundnet communities.

Already existing similar solutions: https://fwango.io , https://playerzone.roundnetgermany.de/ , https://aslsquads.com/

# Requirements:
- NPM: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


# How to run frontend locally:

- cd frontend
- "npm update"
- run "npx expo start" from root of frontend folder
- or run "npm run web" from root of frontend folder



# MVP Features:
Ability to be configured for many formats
Presets for asl - like squad format
League format
List and map of roundnet hubs

# Semester Goals:


Kolton - Frontend focused
Familiarize myself with react by 9/27.
Have a decent home page by mid-late october.
Have a decent bracket page by thanksgiving.
Eoin - Backend focused
Become familiar with Supabase. Make sure I can host supabase project by October 3
Authentication and simple database operations working by October 24
Mock tournaments being run on site by Thanksgiving Break

Tech Stack:
Supabase w/postgresql for backend and db. Possibly Node.js (not sure if necessary)
React.js for frontend. At the moment mainly needed for clean and dynamic bracket ui
Languages: SQL, Javascript, HTML, CSS

Project reach goals:
Seamless integration with rankings
Easy seeding + other TD tools (I don't know much about the needs of a TD in fwango)
Perfect mobile compatibility
Payments
Statistics and videos linked to games / sets
Ability to clip from these videos
Field maps
Assign games to nets
Assign observers to nets
Feature nets
Membership management system
Certifications such as observing too
Light mode/Dark Mode


Supplement file for video replays - ability to store clips and stats
Storing when point begins / ends
Who got point

Streaming Redzone 
Plugin for obs?
Team name, image, score, possession, series info
Stats bar


- decide colors
- variables in figma for colors
- mess around with the header in code + navigation / sidebar
- scroll view
- host website and github actions

# RESOURCES:
Other open source bracket(fastapi): https://github.com/evroon/bracket
Database models of above link: https://github.com/evroon/bracket/blob/master/backend/bracket/models/db/

Expo setup: https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated

Expo/supabase integration tutorial: https://docs.expo.dev/guides/using-supabase/

https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?queryGroups=auth-store&auth-store=async-storage



Chatgpt for frontend
V0.dev

Router Docs:
https://docs.expo.dev/router/introduction/ 

Rnr:
https://rnr-docs.vercel.app/getting-started/introduction/
Run command from website
Show up in components
Add import statement
Copy usage



Page hierarchy
/



# RGC:
Team 1 - team name and p1 p2 names
Recordables
Time of every hit and who hit.
If is error
Time of net hit? Why? - record possession length (maybe have it toggle-able)
End point and type of ended point
Ace
Fault
Put away
Bad hit (rim, miss, nhz, touch net, OOB) **toggle-able in-depth bad hits
Ui:
Buttons
Each player
Undo
Win point
Lose point
End game
Temp display
Point display
Serve number displayed
Possession displayed if using time net is hit
Clip everything? - sort by - aces, errors, etc?
Stats outputted:
Live stats:
Head to head breaks broken
Game
Rally length
Per Player
Breaks / broken 
Fault percentage
Aces
Put away percent
Graphics
Two lines with score of each team
Pie chart of how points ended
Pie chart of break
