const session = JSON.parse(sessionStorage.getItem("session") || "{}");

if (!session || session.role !== "admin") {

alert("Access denied");

window.location.href = "/frontend/index.html";

}

/* GET DATA */

function getVehicles(){
return JSON.parse(localStorage.getItem("vehicles") || "[]");
}

function getUsers(){
return JSON.parse(localStorage.getItem("users") || "[]");
}

function getBookings(){
return JSON.parse(localStorage.getItem("bookings") || "[]");
}

/* DASHBOARD STATS */

function loadStats(){

const vehicles = getVehicles();
const users = getUsers();
const bookings = getBookings();

const today = new Date().toISOString().split("T")[0];

const todayBookings = bookings.filter((b:any)=>b.date === today);

(document.getElementById("totalVehicles") as HTMLElement).textContent = vehicles.length;

(document.getElementById("totalUsers") as HTMLElement).textContent = users.length;

(document.getElementById("totalBookings") as HTMLElement).textContent = bookings.length;

(document.getElementById("todayBookings") as HTMLElement).textContent = todayBookings.length;

}

/* LOGOUT */

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click",()=>{

sessionStorage.clear();
document.cookie="auth=false";

window.location.href="/frontend/src/pages/login.html";

});

loadStats();