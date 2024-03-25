<template>
  <div>
    <div class="home-cantainer">
      <Header></Header>
      <main class="container">
        <section class="Notes-section">
          <h1 class="section-title">Notes</h1>
          <Notes></Notes>
        </section>

        <section class="weather-section">
          <h2 class="section-title">Weather Forecast</h2>
          <suspense>
            <ShowWeather></ShowWeather>
            <template #fallback class="fallback"> Loading... </template>
          </suspense>
        </section>
      </main>
      <section class="tasks-section">
        <h1 class="section-title">Tasks Management</h1>
        <Tasks></Tasks>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
import Header from "./Header.vue";
import Notes from "./Notes.vue";
import Tasks from "./TaskManager/Tasks.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const ShowWeather = defineAsyncComponent(() =>
  import("./WeatherDashboard/ShowWeather.vue")
);
onMounted(() => {
  let user = localStorage.getItem("user-item");
  if (!user) {
    router.push({ name: "signup" });
  }
});
</script>

<style scoped>
.tasks-section {
  background-image: var(--task-card-color);
  margin-top: 18px;
  border-radius: 8px;
  padding: 30px;
}
.task-container {
  display: flex;
  gap: 34px;
  width: 100%;
  border-radius: 8px;
}
.container {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: none;
}

.section-title {
  font-size: 40px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

/* Home section styles */
.Notes-section {
  background-color: var(--list-card-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 60%;
}

/* Weather section styles */
.weather-section {
  background-color: var(--weather-card-color);
  border-radius: 8px;
  padding: 20px;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 40%;
}
.home-cantainer {
  margin: 65px 100px;
  background: var(--background-color);
  padding: 25px;
  border-radius: 18px;
  height: auto;
  min-width: 1000px;
}
.fallback {
  font-size: 30px;
}
@media (max-width: 768px) {
  body {
    background: gainsboro;
  }
  .home-cantainer {
    margin: 0;
    font-size: 16px;
    border-radius: 0px;
  }
  .container {
    flex-direction: column;
  }
  .Notes-section,
  .weather-section {
    width: auto;
  }
}
</style>
