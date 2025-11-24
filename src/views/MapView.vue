<template>
    <div class="map-wrapper">
        <div id="map"></div>

        <div class="info-panel">
            <div v-if="pointA || pointB">
                <div v-if="pointA">
                    <strong>A:</strong> {{ addressA }}<br>
                    <small>{{ pointA.lat.toFixed(6) }}, {{ pointA.lng.toFixed(6) }}</small>
                </div>

                <div v-if="pointB" style="margin-top:10px">
                    <strong>B:</strong> {{ addressB }}<br>
                    <small>{{ pointB.lat.toFixed(6) }}, {{ pointB.lng.toFixed(6) }}</small>
                </div>

                <div v-if="distance">
                    <hr />
                    <strong>Дистанция:</strong> {{ (distance / 1000).toFixed(2) }} км
                </div>
            </div>
            <div class="btn-group">
                <button v-if="pointA || pointB" @click="clearAll" class="clear-btn">Очистить</button>
                <button @click="closeMap" class="close-btn">Закрыть</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = ref(null);

const pointA = ref(null);
const pointB = ref(null);

let markerA = null;
let markerB = null;
let routeLine = null;

const addressA = ref('');
const addressB = ref('');
const distance = ref(null);

// SVG иконки вместо стандартных PNG (исправляет смещение)
const iconA = L.divIcon({
    html: `<div style="background:#d9534f;width:16px;height:16px;border-radius:50%;border:2px solid white;"></div>`,
    className: ''
});
const iconB = L.divIcon({
    html: `<div style="background:#0275d8;width:16px;height:16px;border-radius:50%;border:2px solid white;"></div>`,
    className: ''
});

// ---------------- LOCAL STORAGE ------------------
function savePointsToLS() {
    const data = {
        A: pointA.value ? { lat: pointA.value.lat, lng: pointA.value.lng } : null,
        B: pointB.value ? { lat: pointB.value.lat, lng: pointB.value.lng } : null
    };
    localStorage.setItem("map-points", JSON.stringify(data));
}

function loadPointsFromLS() {
    const stored = localStorage.getItem("map-points");
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

// ---- save distance to calc-trip-form in localStorage ----
function saveDistanceToLocalStorage(km) {
    const stored = localStorage.getItem("calc-trip-form");

    let data = stored
        ? JSON.parse(stored)
        : {
            fuel_price: null,
            input: null,
            fuel_consumption: null,
            fuel_distance: null,
            method: ""
        };

    data.fuel_distance = String(km);

    localStorage.setItem("calc-trip-form", JSON.stringify(data));
}


// ---- reverse geocode ----
async function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.display_name || 'Адрес не найден';
}

// ---- build OSRM route ----
async function buildRoute() {
    if (!pointA.value || !pointB.value) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${pointA.value.lng},${pointA.value.lat};${pointB.value.lng},${pointB.value.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.code !== 'Ok') return;

    const route = data.routes[0];
    distance.value = route.distance;

    // ---- сохраняем в calc-trip-form ----
    const km = (distance.value / 1000).toFixed(2);
    saveDistanceToLocalStorage(km);

    const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);

    if (routeLine) {
        routeLine.setLatLngs(coords);
    } else {
        routeLine = L.polyline(coords, { weight: 5 }).addTo(map.value);
    }
}

// ---- create draggable marker ----
function createDraggableMarker(latlng, label) {
    const marker = L.marker(latlng, {
        draggable: true,
        icon: label === "A" ? iconA : iconB
    });

    async function updatePopup() {
        const address = label === 'A' ? addressA.value : addressB.value;
        marker.bindPopup(`<b>${label}</b><br>${address}`);
    }

    updatePopup();

    marker.on('click', () => marker.openPopup());

    marker.on('dragend', async (e) => {
        const pos = e.target.getLatLng();

        if (label === 'A') {
            pointA.value = pos;
            addressA.value = await reverseGeocode(pos.lat, pos.lng);
        } else {
            pointB.value = pos;
            addressB.value = await reverseGeocode(pos.lat, pos.lng);
        }

        savePointsToLS();
        await updatePopup();
        buildRoute();
        marker.openPopup();
    });

    return marker;
}

// ---- clear ----
function clearAll() {
    pointA.value = null;
    pointB.value = null;
    addressA.value = '';
    addressB.value = '';
    distance.value = null;

    if (markerA) { markerA.remove(); markerA = null; }
    if (markerB) { markerB.remove(); markerB = null; }
    if (routeLine) { routeLine.remove(); routeLine = null; }

    localStorage.removeItem("map-points");
}

const closeMap = () => {
    window.history.back();
};

// ---- onMounted ----
onMounted(async () => {
    map.value = L.map('map');

    navigator.geolocation.getCurrentPosition(
        pos => map.value.setView([pos.coords.latitude, pos.coords.longitude], 14),
        () => map.value.setView([47.01, 28.86], 13)
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map.value);

    // ---- 1) Load saved points ----
    const saved = loadPointsFromLS();
    if (saved?.A) {
        pointA.value = saved.A;
        addressA.value = await reverseGeocode(saved.A.lat, saved.A.lng);
        markerA = createDraggableMarker(saved.A, "A").addTo(map.value);
    }
    if (saved?.B) {
        pointB.value = saved.B;
        addressB.value = await reverseGeocode(saved.B.lat, saved.B.lng);
        markerB = createDraggableMarker(saved.B, "B").addTo(map.value);
    }
    if (saved?.A && saved?.B) {
        buildRoute();
    }

    // ---- 2) Click to set points ----
    map.value.on('click', async (e) => {
        const latlng = e.latlng;

        if (!pointA.value) {
            pointA.value = latlng;
            addressA.value = await reverseGeocode(latlng.lat, latlng.lng);
            markerA = createDraggableMarker(latlng, 'A').addTo(map.value);
            markerA.openPopup();
            savePointsToLS();
            return;
        }

        if (!pointB.value) {
            pointB.value = latlng;
            addressB.value = await reverseGeocode(latlng.lat, latlng.lng);
            markerB = createDraggableMarker(latlng, 'B').addTo(map.value);
            markerB.openPopup();
            savePointsToLS();
            buildRoute();
            return;
        }
    });
});
</script>


<style scoped>
.map-wrapper {
    position: relative;
}

#map {
    width: 100%;
    height: 100vh;
}

.info-panel {
    position: absolute;
    left: 10px;
    bottom: 10px;
    background: white;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    width: 240px;
    font-size: 14px;
    color: #333;
    z-index: 99999;
}

.btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.clear-btn {
    background-color: white;
    border: #333 1px solid;
    margin-top: 10px;
    padding: 6px 8px;
    cursor: pointer;
    z-index: 99;
}

.close-btn {
    background-color: #d9534f;
    color: white;
    border: none;
    margin-top: 10px;
    padding: 6px 8px;
    cursor: pointer;
    z-index: 99;
}
</style>
