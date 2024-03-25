<template>
  <div class="weather-container" v-if="data">
    <div class="location">{{ data.name }}, {{ data.sys.country }}</div>
    <div :class="weatherClass" class="weather-image" alt="Weather Image"></div>

    <div class="subBox">
      <div class="date">{{ date }}</div>
      <div class="weather-info">
        <div class="temperature">
          {{ Math.round(data.main.temp - 273.15) }}°C
        </div>
        <!-- <p class="description">{{ data.weather[0].description }}</p> -->
      </div>
      <div class="windAndHum">
        <p class="wind">Wind</p>
        <p>|</p>
        <p>{{ data.wind.speed }} km/h</p>
      </div>
      <div class="windAndHum">
        <p class="hum">Hum</p>
        <p>|</p>
        <p>{{ data.main.humidity }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { data } from "../../ApiComm/weatheApi";
const weatherDescription = ref("");
const date = computed(() => {
  const currentTimeMillis = Date.now();
  const currentDate = new Date(currentTimeMillis);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return formattedDate;
});

watch(
  () => data.weather,
  (newValue, oldValue) => {
    if (newValue[0] && newValue[0].description) {
      weatherDescription.value = newValue[0].description;
    }
  }
);

const weatherClass = computed(() => {
  const isSunny = weatherDescription.value.toLowerCase().includes("clear sky");
  const isCloudy = !weatherDescription.value.toLowerCase().includes("sunny");

  return {
    "sunny-background": isSunny,
    "cloudy-background": isCloudy,
    "default-background": !isSunny && !isCloudy,
  };
});
</script>

<style scoped>
.weather-container {
  color: #fff;
}
.imgs {
  display: flex;
  align-items: center;
  justify-content: center;
}
.subBox {
  padding: 31px 17px;
  background: var(--weather-subcard-color);
  display: flex;
  width: 317px;
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  margin: auto;
}

.location {
  position: relative;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 15px;
}

/* Styles for the date */
.date {
  font-size: 20px;
  margin-bottom: 20px;
  text-shadow: 3px 3px 3px rgb(59, 100, 99);
  font-weight: bold;
}
.windAndHum {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-block: 5px;
  gap: 14px;
  font-size: 18px;
  position: relative;
}
/* Styles for the temperature */
.temperature {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 12px;
  text-shadow: 2px 2px 3px rgba(255, 254, 254, 0.5),
    2px 5px 3px rgba(0, 0, 0, 0.6);
}

/* Styles for the weather description */
.description {
  font-size: 30px;
  margin-bottom: 15px;
}
.location::before {
  content: "";
  background: url("../../assets/LocationIcon.svg");
  height: 36px;
  width: 24px;
  position: absolute;
  background-repeat: no-repeat;
  left: -6px;
  top: 2px;
}
.wind {
  position: relative;
}
.wind::before {
  content: "";
  background: url("../../assets/windy.svg");
  height: 36px;
  width: 24px;
  position: absolute;
  background-repeat: no-repeat;
  left: -21px;
  top: 0px;
}
.hum {
  position: relative;
}
.hum::before {
  content: "";
  background: url("../../assets/hum.svg");
  height: 36px;
  width: 24px;
  position: absolute;
  background-repeat: no-repeat;
  left: -21px;
  top: 0px;
}
/* Styles for the weather image */
.weather-image {
  width: 270px;
  height: 171px;
  background-size: 100%;
  margin: auto;
}
.sunny-background {
  background-image: url("../../assets/sunnyIcon.svg");
  background-repeat: no-repeat;
}

.cloudy-background {
  background-image: url("../../assets/cloudly.svg");
  background-repeat: no-repeat;
}
.default-background {
  background-image: url("../../assets/cloudany.jpg");
  background-repeat: no-repeat;
}
</style>
