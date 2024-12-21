import { ref } from "vue";

// 滚动居中：-6居中定位
export const scroller = ref(null);
export const scrollToItem = (index) => {
	if (scroller.value) scroller.value.scrollToItem(index - 8);
};

// 一分钟定时器
export function initTime() {
	const now = new Date();
	const curTimestamp = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
	).getTime();
	const storedTimestamp = Number.parseInt(
		localStorage.getItem("timestamp") || 0,
	);

	if (curTimestamp !== storedTimestamp) {
		localStorage.setItem("todayTime", 0);
		localStorage.setItem("todayLearn", 0);
		localStorage.setItem("todayReview", 0);
		localStorage.setItem("timestamp", curTimestamp);
		localStorage.setItem("typeIds", "-1");
		localStorage.setItem("learnIds", "-1");
		localStorage.setItem("reviewIds", "-1");
	}
}

let timeInterval = null;
export function dayTimeInterval() {
	timeInterval = setInterval(() => {
		const todayTime =
			Number.parseInt(localStorage.getItem("todayTime") || 0) + 1;
		localStorage.setItem("todayTime", todayTime);
		const totalTime =
			Number.parseInt(localStorage.getItem("totalTime") || 0) + 1;
		localStorage.setItem("totalTime", totalTime);
	}, 60000);
}

export function clearTimeInterval() {
	if (timeInterval) {
		clearInterval(timeInterval);
	}
}

export function storeCnt(name, cnt) {
	const todayCnt =
		Number.parseInt(localStorage.getItem(`today${name}`) || 0) + cnt;
	const totalCnt =
		Number.parseInt(localStorage.getItem(`total${name}`) || 0) + cnt;
	localStorage.setItem(`today${name}`, todayCnt);
	localStorage.setItem(`total${name}`, totalCnt);
}
