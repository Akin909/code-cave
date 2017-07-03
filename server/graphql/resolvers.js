import db from './../../database/dbConnection.js';

const resolvers = {
  Query: {
    users: () => db.query(`SELECT * FROM users`).catch(err => err),
    user: (_, { id }) =>
      db
        .query(
          `SELECT * FROM users, codebase WHERE users.id = codebase.user_id`
        )
        .catch(err => err),
    findCode(root, { id }) {
      db
        .query(
          `SELECT * FROM users, codebase WHERE users.id = codebase.user_id`
        )
        .catch(err => err);
    }
  }
};

export default resolvers;
