async function query(db, sql, params = []) {
	const data = await db.execute({
		sql: sql,
		args: params,
	});
	console.log(data);
	return data?.rows;
}

async function querySingle(db, sql, params = []) {
	const data = await db.execute({
		sql: sql,
		args: params,
	});
	console.log(data);
	return data?.rows?.[0];
}

async function run(db, sql, params = []) {
	const data = await db.execute({
		sql: sql,
		args: params,
	});
	console.log(data);
	return data?.rows?.[0];
}

export { query, querySingle, run };
