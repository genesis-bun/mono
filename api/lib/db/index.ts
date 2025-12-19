import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema/users";

const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL,
	},
	casing: "snake_case",
});

const schema = {
	users,
};

export { db, schema };
