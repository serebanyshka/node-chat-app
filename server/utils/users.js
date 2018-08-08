const Users = {
  init: function() {
    this.users = [];
  },
  addUser: function(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  },
  removeUser: function(id) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1) {
      return;
    }
    return this.users.splice(index, 1)[0];
  },
  getUser: function(id) {
    return this.users.find(user => user.id === id);
  },
  getUserList: function(room) {
    return this.users
      .filter(user => user.room === room)
      .map(user => user.name); //return name of users in room
  }

}

module.exports = { Users };
