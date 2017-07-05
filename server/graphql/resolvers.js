import db from './../database/dbConnection.js';

const resolvers = {
  Query: {
    users: () => {
      return db
        .query(
          `SELECT * FROM users, codebase WHERE users.id = codebase.user_id`
        )
        .catch(err => err);
    },
    user: (_, { id }) =>
      db
        .query(`SELECT * FROM users, codebase WHERE users.id = $1`, id)
        .catch(err => err),
    findCode: (_, { id }) =>
      db
        .query(
          `SELECT users.firstname, users.surname, users.username, users.id, codebase.code, codebase.user_id FROM users, codebase WHERE codebase.user_id = $1`,
          id
        )
        .catch(err => err)
  }
};

export default resolvers;
