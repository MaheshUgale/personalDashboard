<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <div class="register-form">
      <input type="text" placeholder="Enter Firstname" v-model="firstName" />
      <input type="text" placeholder="Enter Lastname" v-model="lastName" />
      <input
        type="text"
        placeholder="Enter Email (test@gmail.com)"
        v-model="email"
      />
      <input type="password" placeholder="Enter Password" v-model="password" />
      <p v-if="validation">Please enter all details.</p>
      <button @click.prevent="signUp">Sign Up</button>
      <p class="instruction">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

const router = useRouter();
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const validation = ref(false);
const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function signUp() {
  if (!validateForm()) {
    validation.value = true;
    return;
  }
  try {
    const response = await axios.post(`${apiUrl}/users`, {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });
    if (response.status === 201) {
      localStorage.setItem("user-item", JSON.stringify(response.data));
      router.push({ name: "home" });
    }
  } catch (error) {
    alert("Error signing up: " + error.toString());
  }
}
function validateForm() {
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !email.value.trim() ||
    !password.value.trim()
  ) {
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

<style>
.signup-container h1 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}
.signup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #3498db, #c0392b);
  background-size: cover;
  background-position: center;
  color: hsl(0, 0%, 0%);
  text-align: center;
  padding: 20px;
}
.instruction {
  color: #000;
}
.register-form {
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.register-form input {
  width: 93%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-form button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.register-form button:hover {
  background-color: #0056b3;
}

.register-form p {
  margin-block: 10px;
  text-align: center;
}

.register-form p a {
  color: #007bff;
  text-decoration: none;
}

.register-form p a:hover {
  text-decoration: underline;
}
</style>
