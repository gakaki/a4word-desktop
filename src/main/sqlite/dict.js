import { db } from "./db";
import { query, querySingle, run } from "./dbUtil";

export async function getDictById(params) {
	const sql = "SELECT id, name, wordCnt, intro FROM dict WHERE id = ?";
	return await querySingle(db, sql, [params]);
}
//
export async function listClass() {
	const sql = "SELECT id, dictId, name FROM dict_class";

	return await query(db, sql);
}
//
export async function listByClassId(params) {
	const classSql = "SELECT id, dictId, name FROM dict_class WHERE id = ?";
	const row = await querySingle(db, classSql, [params]);
	if (!row || !row.dictId) return [];

	const ids = row.dictId.split(";");
	const placeholders = ids.map(() => "?").join(", ");
	const dictSql = `SELECT * FROM dict WHERE id IN (${placeholders})`;
	return await query(db, dictSql, ids);
}

export async function saveDict(params) {
	let { ids, fileName, intro, dictIds, classId } = params;
	ids = JSON.parse(ids);
	const timestamp = Date.now();

	dictIds = dictIds + timestamp;
	const classSql = "UPDATE dict_class SET dictId=? WHERE id=?";
	run(db, classSql, [dictIds, classId]);
	// 插入dict
	const dictSql =
		"INSERT INTO dict (id, name, wordCnt, intro) VALUES(?, ?, ?, ?)";
	run(db, dictSql, [timestamp, fileName, ids.length, intro]);
	// 建表
	const tableName = `dict_map_${timestamp}`;
	db.exec(`CREATE TABLE ${tableName} (id INTEGER)`);
	// 批量插入dict_map_dictId
	const placeholders = ids.map(() => "(?)").join(",");
	const mapSql = `INSERT INTO ${tableName} (id) VALUES ${placeholders}`;
	run(db, mapSql, ids);

	return true;
}

export async function removeDictById(params) {
	console.log(params);
	const removeDictSql = "DELETE FROM dict WHERE id=?";
	// run()
	run(db, removeDictSql, params);
	const dropSql = `DROP TABLE IF EXISTS dict_map_${params}`;
	run(db, dropSql);
}
