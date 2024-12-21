<template>
  <article>
    <div>
      <div class="title">今日学习</div>
      <div class="count">{{ todayLearn }} <span>词</span></div>
    </div>
    <div>
      <div class="title">今日复习</div>
      <div class="count">{{ todayReview }} <span>词</span></div>
    </div>
    <div>
      <div class="title">今日练习</div>
      <div class="count">{{ todayCount }} <span>次</span></div>
    </div>
    <div>
      <div class="title">今日时长</div>
      <div class="count">{{ todayTime }} <span>分</span></div>
    </div>
    <div>
      <div class="title">总学习</div>
      <div class="count">{{ totalLearn }} <span>词</span></div>
    </div>
    <div>
      <div class="title">总复习</div>
      <div class="count">{{ totalReview }} <span>词</span></div>
    </div>
    <div>
      <div class="title">总练习</div>
      <div class="count">{{ totalCount }} <span>次</span></div>
    </div>
    <div>
      <div class="title">总时长</div>
      <div class="count">{{ totalTime }} <span>分</span></div>
    </div>
  </article>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const todayTime = ref(Number.parseInt(localStorage.getItem("todayTime") || 0));
const totalTime = ref(Number.parseInt(localStorage.getItem("totalTime") || 0));

const todayLearn = ref(
	Number.parseInt(localStorage.getItem("todayLearn") || 0),
);
const totalLearn = ref(
	Number.parseInt(localStorage.getItem("totalLearn") || 0),
);

const todayReview = ref(
	Number.parseInt(localStorage.getItem("todayReview") || 0),
);
const totalReview = ref(
	Number.parseInt(localStorage.getItem("totalReview") || 0),
);

const todayCount = ref(0);
const totalCount = ref(0);

onMounted(() => {
	window.count.getTodayCount().then((data) => {
		todayCount.value = data;
	});
	window.count.getTotalCount().then((data) => {
		totalCount.value = data;
	});
});
</script>

<style scoped>
article {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
}
article > div {
  width: 8.5rem;
}
.title,
span {
  font-size: 0.8rem;
  color: var(--pico-h6-color);
}
.count {
  font-size: 1.6rem;
  font-weight: bold;
}
</style>