import { createClient } from "@libsql/client";

export const db = createClient({
	url: "file:resources/tw.db",
});

async function initializeDatabase() {
	await db.batch(
		[
			"CREATE TABLE IF NOT EXISTS users (email TEXT)",
			"INSERT INTO users VALUES ('first@example.com')",
			"INSERT INTO users VALUES ('second@example.com')",
			"INSERT INTO users VALUES ('third@example.com')",
		],
		"write",
	);

	const result = await db.execute("SELECT * FROM users");
	console.log("Users:", result.rows);
}

initializeDatabase();
