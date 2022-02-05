# Use Cases
## 1. User posts a Tuit
### Description:
Tuiter as a social network allows its users to share their thoughts with other people by posting a Tuit.
A Tuit contains text (less than 280 characters) and media (image, music, links, etc.) content. A user can
post no more than 2000 Tuits per day. A Tuit can be associated with tags and topics by its owner.

### Preconditions:
* The user is logged in and authenticated
* The user hasn't exceeded the Tuit posting limit (if there is such) per day

### Steps:
1. Actor actions: the user edits the tuit content and submit the request to post it
2. System responses: the system receives the request, then posts the tuit and updates the database, then displays messages 
to tell user the tuit has been successfully posted.

### Post conditions:
The user's homepage will be updated to show the most recent Tuits. The user's followers will be notified about the recent Tuit.

## 2. User likes a Tuit
### Description:
When a user finds a Tuit interesting, he/she can like the Tuit (usually represents as "thumb up" or "heart"). All likes to 
a Tuit will be displayed along with the Tuit. A user can like his/her own Tuits. Users can retract their likes at any time. 

### Preconditions:
* The Tuit exits
* The user hasn't already liked the Tuit
* The user is logged in and authenticated

### Steps:
1. Actor actions: the user gives a like to a Tuit and submits that request to the system
2. System responses: the system receives the request and adds the like to the target Tuit and updates the database, 
then displays the updated likes of the Tuit to the user

### Post conditions:
The Tuit's owner will be notified about the new like. The user's "liked Tuits" collection will include this Tuit.

## 3. User replies a Tuit
### Description:
A user can reply text content to a Tuit. All replies to a Tuit will be displayed along with the Tuit. 
The reply can be deleted by its giver or the Tuit owner. Users can reply to their own Tuits.

### Preconditions:
* The Tuit exits
* The user is logged in and authenticated

### Steps:
1. Actor actions: the user edits the reply content and then submit the reply request to the system
2. System response: the system receives the request and updates the Tuit and the database, then displays 
the updated Tuit with the latest replies to the user.

### Post conditions:
The Tuit's owner will be nofified about the new reply. The user's "replied Tuits" collection will include this Tuit.

## 4. User bookmarks a Tuit
### Description:
A user can bookmark a Tuit so that it can be easily accessed in the future. All bookmarked Tuits will be shown in the user's
bookmark screen. The user can unbookmark a Tuit at any time.

### Preconditions:
* The Tuit exits
* The user hasn't already bookmarked the Tuit
* The user is logged in and authenticated
* The user's Tuit bookmark limit (if there is such) is not exceeded

### Steps:
1. Actor actions: the user bookmarks a Tuit and submits the request to the system
2. System responses: the system receives the request and updates the database, then displays
messages to tell the user that the Tuit has been successfully bookmarked.

### Post conditions:
The user's "bookmarked Tuits" collection will include this Tuit.

## 5. User follows another user
### Description:
A user can follow any other user to get notifications of his/her future Tuits. A user can unfollow any other user at any time. A user can
not follow himself/herself.

### Preconditions:
* The target user exists
* The user hasn't already followed the target user
* The user is logged in and authenticated

### Steps:
1. Actor actions: the user submits the request to follow another user to the system
2. System responses: the system receives the request and updates the database, then displays messages to tell the user that
he/she has successfully followed the target user

### Post conditions:
The target user will be notified about the new follower. The user's "followed users" collection will include the target user.

## 6. User messages another user
### Description:
A user can send a private message to any other user. A private message can contain text (less than 500 characters) and 
media (image, music, etc.) content. A user cannot send a message to himself/herself. A user can send no more than 1000 messages per day.

### Preconditions:
* The target user exists
* The user hasn't exceeded the message sending limit (if there is such) per day
* The user is logged in and authenticated

### Steps:
1. Actor actions: the user selects another user as the target user and edits the message and then submits the request
2. System responses: the system receives the request and sends the message the target user and updates the database, then 
displays the newly sent message in the chat screen so the user knows the message has been sent successfully.

### Post conditions:
The target user will be notified about the newly sent message. Both users' chat history will include this message.
