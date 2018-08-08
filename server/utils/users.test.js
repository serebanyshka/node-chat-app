const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = Object.create(Users);
    users.init();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    }, {
      id: '2',
      name: 'Jack',
      room: 'React'
    }, {
      id: '3',
      name: 'Ross',
      room: 'Node'
    }];
  });

  describe('addUser', () => {
    it('should add new user', () => {
      const users = Object.create(Users);
      users.init();
      const user = {id: '123', name: 'Jack', room: 'room'};

      const res = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
    });
  });
  describe('getUserList', () => {
    it('should return names for node course', () => {
      const room = 'Node';
      const res = users.getUserList(room);
      expect(res.length).toBe(2);
      expect(res).toEqual(['Mike', 'Ross']);
    });
    it('should return empty array', () => {
      const room = 'test';
      const res = users.getUserList(room);
      expect(res.length).toBe(0);
    });
  });
  describe('getUser', () => {
    it('should find user by id', () => {
      const user = {
        id: '3',
        name: 'Ross',
        room: 'Node'
      };
      const res = users.getUser(user.id);
      expect(res).toEqual(user);
    });
    it('should not find user by id', () => {
      const id = '123456';
      const res = users.getUser(id);
      expect(res).toBeUndefined();
    });
  });
  describe('removeUser', () => {
    it('should remove user by id', () => {
      const user = {
        id: '3',
        name: 'Ross',
        room: 'Node'
      };
      const res = users.removeUser(user.id);
      expect(users.users.length).toBe(2);
      expect(res).toEqual(user);
    });
    it('should not remove user by id', () => {
        const id = '123456';
        const res = users.removeUser();
        expect(users.users.length).toBe(3);
        expect(res).toBeUndefined();
    });
  });

});
