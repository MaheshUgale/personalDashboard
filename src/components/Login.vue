<template>
  <div class="login-container">
    <h1>Login</h1>
    <div class="login-form">
      <input type="text" placeholder="Enter Email" v-model="email" />
      <input type="password" placeholder="Enter Password" v-model="password" />
      <p v-if="validation" class="instruction">Please enter all details.</p>
      <p v-if="loginError" class="error-message">{{ loginError }}</p>
      <button @click="login">Login</button>
      <p class="instruction">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";
import "vue3-toastify/dist/index.css";
import { toast } from "vue3-toastify";
const router = useRouter();
const email = ref("");
const password = ref("");
const validation = ref(false);
const loginError = ref("");
const apiUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

async function login() {
  if (!validateForm()) {
    validation.value = true;
    return;
  }
  try {
    const response = await axios.get(
      `${apiUrl}/users?email=${email.value}&password=${password.value}`
    );
    if (response.status === 200 && response.data.length > 0) {
      localStorage.setItem("user-item", JSON.stringify(response.data[0]));
      router.push({ name: "home" });
    } else {
      loginError.value = "Invalid email or password. Please try again.";
    }
  } catch (error) {
   alert("Error logging in:", error);
  }
}

function validateForm() {
  if (!email.value.trim() || !password.value.trim()) {
   alert("Please fill in all fields.");
    return false;
  }

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailPattern.test(email.value)) {
   alert("Please enter a valid email address.");
    return false;
  }
  return true;
}

onMounted(() => {
  let user = localStorage.getItem("user-item");
  if (user) {
    router.push({ name: "home" });
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #000;
}

.login-form {
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.login-form input {
  width: 93%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #0056b3;
}

.login-form p {
  margin-block: 10px;
  text-align: center;
}

.login-form p a {
  color: #007bff;
  text-decoration: none;
}
.login-container h1 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}
.instruction {
  color: #000;
}
.login-form p a:hover {
  text-decoration: underline;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #3498db, #c0392b);
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 20px;
}
</style>
