import db from './../database/dbConnection.js';

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await db.query(`SELECT * FROM users`);
        return users.map(async user => {
          const code = await db.query(
            `SELECT * FROM codebase WHERE $1 = codebase.user_id`,
            user.id
          );
          return {
            ...user,
            code
          };
        });
      } catch (e) {
        return e;
      }
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
