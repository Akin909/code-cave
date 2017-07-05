import db from './../database/dbConnection.js';
import bcrypt from 'bcryptjs';

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
  },
  Mutation: {
    addCode: (root, { code, id }) =>
      db
        .query(`INSERT INTO codebase (user_id, code) VALUES ($1, $2)`, [
          id,
          code
        ])
        .catch(e => e),
    addUser: async (root, { username, firstname, surname, password }) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const saltedAndHashed = await bcrypt.hash(password, salt);
        db.query(
          `INSERT INTO users (username, firstname, surname, password) VALUES ($1, $2, $3, $4)`,
          [username, firstname, surname, saltedAndHashed]
        );
      } catch (e) {
        return e;
      }
    }
  }
};

export default resolvers;
