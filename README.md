# Youtube Playlist App 
This is a youtube player app that I've created using: React and Node-JS

## How to run the project
First, you need to install the backend dependencies using `npm install`
Then, you can just type `npm run buildAndRun` and you should be ready to go.
The URL to the frontend will be http://localhost:8080

## Things I've assumed
For the sake of the test, there are things that I've didn't include:
* DB - I've didn't added any integration with DB, I've just managed the data by using a simple object.
If you would ask me which DB I will add, it will be non-relational kind, that's because I think we may have a lot of items inside the playlist, in this scope we don't have a heavy-duty calculation for the DB or relation between tables.
* Client-side - I think that from this test, it's noticeable that my weak side is the client-side(but I'm a fast learner :)),
I didn't invest the time in styling so the UI doesn't look so good.

This leads me to the next section.

# Scale
Regarding scale, To manage a lot of client requests, I was adding a cache mechanism in the server to reduce requests to the DB
another thing that I cant do is to hold cache also on the client-side, and with that, I will be able to reduce also requests to the server.

# Bugs(that I've found)
There are some bugs that I've to find and didn't think that I should invest time in them:
* You can delete the played song - If you delete the played song, the video will be deleted from the list but will continue to play.
* You cant add the same video one after another - If you add the same video one after another, the player will not play the video.
* UserRef with UseState? - well it's more of technical debt, due to my lack of knowledge with react, that seems weird to me that I've added a useRef(for playedVideo prop) just for it to be updated by the useState(playedVideo) changes.

# Conclusion 
This is my solution with the time that I had. \
**I will be really happy to get feedback about my coding.** \
Thank you very much for this test, I've had a lot of fun doing it.
