<template>
  <div class="header-container">
    <h1>Dashboard</h1>
    <h1>Welcome {{ getInitialsProfile() }}</h1>
    <div class="rightHeader">
      <div class="SwitchBtn">
        <label class="switch">
          <input
            type="checkbox"
            v-model="isDarkMode"
            @change="toggleDarkMode()"
          />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="logoutBtn">
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const router = useRouter();
const isDarkMode = ref(false);
const isDark = useDark({
  selector: ".home-cantainer",
  attribute: "theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDarkMode = useToggle(isDark);

function logout() {
  localStorage.clear();
  router.push({ name: "login" });
}

function getInitialsProfile() {
  const user = JSON.parse(localStorage.getItem("user-item"));
  return user ? user.firstName : "";
}
</script>

<style scoped>
.header-container {
  color: var(--text-color);
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.header-container h1 {
  font-size: 25px;
}
.rightHeader {
  display: flex;
  align-items: center;
  gap: 22px;
}
.logoutBtn button {
  background: #fdfdfd;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 16px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.4s ease;
  font-weight: 500;
}
.logoutBtn button:hover {
  background-color: #eca50d;
  color: #fff;
}
.logoutBtn button a {
  text-decoration: none;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
