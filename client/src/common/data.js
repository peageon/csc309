/**
 * Common data used throught the application
 */

 export const users = [] // Array of users
 export const chats = [] // Array of chats


 export class UserProfile {
 	constructor(username, email, password,
      firstname, lastname, year, pey, skills) {

    this.username = username;
 		this.email = email;
 		this.password = password;
 		this.isAdmin = (username == "admin");
    this.firstname = (firstname ? firstname : "");
    this.lastname = (lastname ? lastname : "");
    this.year = (year ? year : 0);
    this.pey = (pey ? pey : false);
    this.skills = [];
    this.skills = (skills ? skills : []);
 	}

   setAdminFlag(flag) {
     this.isAdmin = flag;
   }
 }

 export class ChatMessage {
 	constructor(from, to, subject, message) {

    this.from = from;
 		this.to = to;
 		this.subject = subject;
 		this.message = message;
 	}
 }

export const verifyUserLogin = (userlist, user, password, emailFlag) => {
  const listLen = userlist.length;
  let found = false;  // true if user is found in userlist
  let match = false;  // true if password is the correct password
  let username = "";

  for (let i = 0; (i < listLen) && (! found); i++) {
    let u = userlist[i];
    if (emailFlag) {
      found = u.email == user;
    } else {
      found = u.username == user;
    };

    if (found) {
      match = u.password == password;
      username = u.username;
    }
  }

  return [username, found, match];
}

 export const addUser = (userList, newUser, newEmail, newPassword) => {
     userList.push(new UserProfile(newUser, newEmail, newPassword));
     console.log("added user", users);
     return userList;
 }

 export const getUserProfile = (user) => {
   let found = false;  // true if user is found in userlist
   let result = null;

   for (let i = 0; (i < users.length) && (! found); i++) {
     let u = users[i];
     found = u.username == user;
     if (found) {
       result = users[i];
     }
   }

   return result;
 }

 export const filterChats = (user) => {
     let result = [];
     const count = chats.length;

     for (let i = 0; (i < count) ; i++) {
       let chat = chats[i];
       if ((chat.from == user) || (chat.to == user)) {
         result.push(i);
       }
     }

     console.log(result);
     return result;
 }

 users.push(new UserProfile("user","user@user.com","user","John","Doe",3,false,["JavaScript"]))
 users.push(new UserProfile("user1","user1@user1.com","user1","James","Doe",2,false,["CSS"]))
 users.push(new UserProfile("admin","admin@admin.com","admin","James", "Smith", 4, false,
    ["React", "Python"]));

 chats.push(new ChatMessage("user", "user1", "3D Chess AI",
                                      "I would like to join your project." ));
 chats.push(new ChatMessage("user1", "user", "3D Chess AI",
                                     "Great !" ));
 chats.push(new ChatMessage("user", "user1", "3D Chess AI",
                                      "When can we start" ));
 chats.push(new ChatMessage("user", "user2", "My Cool Project",
                                     "Would you like to join this project?" ));
