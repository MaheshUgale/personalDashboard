import { ref, onMounted } from 'vue';
import axios from 'axios';

// Define your API key as a ref
const apiKey = 'eedffb900cc50f54cca20f1b9833df18'
// Initialize a ref to hold weather data
const data = ref(null);
const url = ref('https://api.openweathermap.org/data/3.0')
const lat = ref('')
const lon = ref('')

export async function getUserLocation() {
    try {
        const response = await axios.get('https://ipapi.co/json/');
        const { latitude, longitude } = response.data;
        lat.value = latitude;
        lon.value = longitude;
    } catch (error) {
        throw new Error('Error getting location: ' + error.message);
    }
}


// Function to fetch weather data
async function getWeatherData() {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=${apiKey}`);
        data.value = response.data;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getUserLocation()
    .then(async () => {
        await getWeatherData();
    })
    .catch(error => {
        console.error(error.message);
    });
export { data };
