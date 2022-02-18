# Implement the Follows RESTful Web Service
## Implementation Options
### 1. Add a "follower" field to the User class
* Pros: 
  * Easy to retrieve, add, or delete a user's followers
  * No need to keep track of multiple instances to maintain consistency 
  (when User A unfollows User B, simply remove User A from User B's follower array)
  * Doable in MongoDB
* Cons:
  * Hard to retrieve the users followed by User A, which requires a full scan on the 
  database records to find all the users whose "follower" field has User A.
  * Impossible in relational database

### 2. Add "follower" and "following" fields to the User class
* Pros:
  * Easy to retrieve each user's followers and followings data
  * Doable in MongoDB
* Cons:
  * Need to make multiple requests to maintain consistency. For example, when User A
  follows User B, we need to 1) add User A to User B's follower array, then 2) add User B
  to User A's following array. Unfollow action will have similar trouble.
  * Impossible in relational database

### 3. Have a mapping table to keep track of following relationships
* Pros:
  * Easy to maintain consistency since every relationship has only one record.
  * Doable in both relational database and MongoDB
* Cons:
  * Cannot retrieve followings and followers data without join operation

## Decision
I would go with **option 3**, since this option is much easier to maintain consistency: only 1 request is needed
for creating/deleting a following relationship. Although it needs a bit of effort to retrieve followings or followers
data, MongoDB's index technique can help speed up the process.

# Implement Bookmarks RESTful Web Service API
## Implementation Options
### 1. Add "bookmarkedTuit" field to the User class
* Pros:
  * Easy to maintain consistency
  * Easy to retrieve, add, and delete bookmarked tuit
  * Doable in MongoDB
* Cons:
  * Hard to retrieve all the users that bookmarked a certain tuit
  * Impossible in relational database

### 2. Add "bookmarkedTuit" field to the User class and "bookmarkedBy" field to the Tuit class
* Pros:
  * Easy to retrieve a user's bookmarked tuits and also the users who bookmarked a certain
  tuit
  * Doable in MongoDB
* Cons:
  * Hard to maintain consistency. When a user bookmarks a tuit, we need to add the tuit to the user's
  bookmarkedTuit array and also add the user to the tuit's bookmarkedBy array.
  * Impossible in relational database

### 3. Have a mapping table to keep track of bookmarking relationships
* Pros:
  * Easy to maintain consistency
  * Easy to read, add, and delete bookmarking relationships
  * Doable in both relational database and MongoDB
* Cons:
  * Need effort to retrieve filtered results: a user's bookmarked tuits, or all
  users that like a certain tuit

## Decision
I would go with **option 3** since that's the easiest way to maintain consistency. There is only one
record in the database that is involved with one bookmarking relationship. No need to update data in multiple places.
MongoDB's index technique can help retrieve filtered results.

# Implement the Messages RESTful Web Service API
## Implementation Options
### 1. Add "sentMessages" field to the user class
* Pros:
  * Easy to maintain consistency
  * Easy to read, add, and delete sent messages
  * Doable in MongoDB
* Cons:
  * Hard to retrieve "received messages" since it needs a full scan on the database records
  * Impossible in relational database

### 2. Add "sentMessages" and "receivedMessages" fields to the user class
* Pros:
  * Easy to read "sentMessages" and "receivedMessages"
  * Doable in MongoDB
* Cons:
  * Hard to maintain consistency. Sending a new message from User A to User B will require data
  update in both User A's "sentMessages" field and User B's "receivedMessages" fields.
  * Impossible in relational database

### 3. Have a mapping table to keep track of message sending and receiving
* Pros:
  * Easy to maintain consistency
  * Doable in both relational database and MongoDB
* Cons:
  * Need effort to retrieve filtered results: all messages sent to User A, or all messages sent from
  User A

## Decision
I would go with **option 3** since it's the easiest way to maintain consistency. There is only one database record
that is involved with each sent message, so no need to update data in multiple places per request. MongonDB's index 
technique can help retrieve the filtered results.
