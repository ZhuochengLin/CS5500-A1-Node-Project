# Designing the Follows RESTful Web Service API
## Use cases:
### 1. User follows another user
* Analysis: When User A follows User B, there will be a new record in the database, so this is a "create" operation (POST). 
User B will be found in User A's following list, and User A will be found in User B's follower list.
* HTTP method: POST
* Path: ```/api/users/:uida/follows/:uidb```
* Request: User A's PK (who sends the request) and User B's PK (who will be followed)
* Response: New follows JSON

### 2. User unfollows another user
* Analysis: When User A unfollows User B, the previous following relationship is no longer
valid, and the previous record will be removed from database, so this is a "delete" operation
  (DELETE).
* HTTP method: DELETE
* Path: ```/api/users/:uida/follows/:uidb```
* Request: User A's PK (who sends the request) and User B's PK (who will be unfollowed)
* Response: Delete status

### 3. User views a list of other users they are following
* Analysis: User retrieves a list of other users he/she is following, which is a 
"read/retrieve" operation (GET). There will be no data change.
* HTTP method: GET
* Path: ```/api/users/:uid/follows```
* Request: User's PK
* Response: User JSON array (all users followed by the request sender)

### 4. User views a list of other users that are following them
* Analysis: User retrieves a list of his/her followers, which is a "read/retrieve"
operation (GET). There will be no data change.
* HTTP method: GET
* Path: ```/api/follows/:uid```
* Request: User's PK
* Response: User JSON array (all users following the request sender)

### 5. (Extra) User removes one of their followers
* Analysis: User A may choose to remove one of his/her followers, User B, which is 
a "delete" operation (DELETE). The previous record will be removed from database.
* HTTP method: DELETE
* Path: ```/api/users/:uidb/follows/:uida```
* Request: User A's PK (the request sender) and User B's PK (the follower to be removed)
* Response: Delete status

### 6. (Extra) Retrieve all following relationships
* Analysis: Retrieve all "User A follows User B" relationships, which would be useful
when debugging or testing. This is a "read/retrieve" operation (GET). There is no data change.
* HTTP method: GET
* Path: ```/api/follows```
* Request: None
* Response: All following relationships in JSON array

# Design the Bookmarks RESTful Web Service API
## Use cases:
### 1. User bookmarks a tuit:
* Analysis: When a user bookmarks a tuit, there will be a new record in database to reflect the 
action. So this would be a "create" operation (POST).
* HTTP method: POST
* Path: ```/api/users/:uid/bookmarks/:tid```
* Request: User's PK and the tuit's PK
* Response: New bookmarks JSON

### 2. User unbookmarks a tuit
* Analysis: When a user unbookmarks a tuit, the previous record should be removed from the
database, which is a "delete" operation (DELETE).
* HTTP method: DELETE
* Path: ```/api/users/:uid/bookmarks/:tid```
* Request: User's PK and the tuit's PK
* Response: Delete status

### 3. User views a list of tuits they have bookmarked
* Analysis: When a user views a list of his/her bookmarked tuits, the data will be retrieved 
from the database, which is a "read/retrieve" operation (GET). No data change.
* HTTP method: GET
* Path: ```/api/users/:uid/bookmarks```
* Request: User's PK
* Response: Bookmarked Tuit JSON array

### 4. (Extra) User views a list of users who bookmarked a certain tuit
* Analysis: Viewing a list of users who bookmarked a tuit will read data from the 
database, which is a "read/retrieve" operation (GET). No data change.
* HTTP method: GET
* Path: ```/api/bookmarks/:tid```
* Request: Tuit's PK
* Response: User JSON array (all users who bookmarked the tuit)

### 5. (Extra) Retrieve all user's bookmarked tuits
* Analysis: Retrieving all bookmarked tuits to show all relationships, which would be
a "read/retrieve" operation (GET). Might be useful when debugging and testing.
* HTTP method: GET
* Path: ```/api/bookmarks```
* Request: None
* Response: A nested JSON array that include all bookmarked tuits of each user.

# Design the Messages RESTful Web Service API
## Use cases:
### 1. User sends a message to another user
* Analysis: When User A sends a message to User B, there will be a new record in the database to
reflect the action, which will be a "create" operation (POST).
* HTTP method: POST
* Path: ```/api/users/:uida/messages/:uidb```
* Request: User A's PK (sender), User B's PK (receiver), and message in the body
* Response: New message JSON with message's PK

### 2. User views a list of messages they have sent
* Analysis: When a user views a list of sent messages, the data will be retrieved from the database,
which is a "read/retrieve" operation (GET). No data change.
* HTTP method: GET
* Path: ```/api/users/:uid/messages```
* Request: User's PK
* Response: Message JSON array (all sent messages, not to a specific user)

### 3. User views a list of messages sent to them
* Analysis: When a user views a list of received messages, the data will be retrieved from the database,
  which is a "read/retrieve" operation (GET). No data change.
* HTTP method: GET
* Path: ```/api/messages/:uid```
* Request: User's PK
* Response: Message JSON array (all messages that are sent to the user)

### 4. User deletes a message
* Analysis: When a user deletes a message, the record should be removed from the database, which is
a "delete" operation (DELETE). Assuming each message is assigned with a unique ID (PK). A user can only delete a
message that is sent to/from him/her.
* HTTP method: DELETE
* Path: ```/api/users/:uid/messages/:mid```
* Request: Message's PK
* Response: Delete status

### 5. (Extra) User A deletes all messages sent from User A to User B
* Analysis: User A can delete all messages that he/she sent to User B, which will remove all related records
from the database. So this is a "delete" operation.
* HTTP method: DELETE
* Path: ```/api/users/:uida/messages/:uidb```
* Request: User A's PK (sender) and User B's PK (receiver)
* Response: Delete status

### 6. (Extra) User A deletes all received messages from User B
* Analysis: User A can delete all messages received from User B, which will remove all related records
  from the database. So this is a "delete" operation.
* HTTP method: DELETE
* Path: ```/api/users/:uidb/messages/:uida```
* Request: User A's PK (receiver) and User B's PK (sender)
* Response: Delete status

