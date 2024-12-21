import { db } from "./db";
import { query } from "./dbUtil";

// 增加当前类型计数，如果不存在则保存为1
export async function increTypeCount(id) {
	const today = new Date().setHours(0, 0, 0, 0);
	const sql = "UPDATE count_type SET cnt=cnt+1 WHERE dayTimestamp = ?";
	const updateSql = `UPDATE word SET lastTimestamp = ? WHERE id = ?`;

	const transaction = db.transaction(() => {
		run(db, updateSql, [Date.now(), id]);
		const result = run(db, sql, [today]);
		if (result.changes === 0) {
			const saveSql = `INSERT INTO count_type (dayTimestamp, cnt) VALUES (?, 1)`;
			run(db, saveSql, [today]);
		}
	});
	transaction();
}

// 获取当天计数
export async function getTodayCount() {
	const today = new Date().setHours(0, 0, 0, 0);
	const sql = `SELECT cnt FROM count_type WHERE dayTimestamp = ?`;
	const row = await querySingle(db, sql, [today]);
	return row ? row.cnt : 0;
}

// 获取总计数
export async function getTotalCount() {
	const yearTimestamp = 365 * 24 * 60 * 60 * 1000;
	const currentTimestamp = new Date().setHours(0, 0, 0, 0);
	const lastYearTimestamp = currentTimestamp - yearTimestamp;
	const sql = `SELECT cnt FROM count_type WHERE dayTimestamp >= ?`;
	const rows = await query(db, sql, [lastYearTimestamp]);
	return rows.reduce((total, row) => total + row.cnt, 0);
}

// 获取一年内的计数列表
export async function yearCoutnList() {
	const yearTimestamp = 365 * 24 * 60 * 60 * 1000;
	const currentTimestamp = new Date().setHours(0, 0, 0, 0);
	const lastYearTimestamp = currentTimestamp - yearTimestamp;
	const sql = `SELECT dayTimestamp, cnt FROM count_type WHERE dayTimestamp >= ? AND dayTimestamp <= ?`;
	const rows = await query(db, sql, [lastYearTimestamp, currentTimestamp]);
	console.log(rows);
	return rows;
}
