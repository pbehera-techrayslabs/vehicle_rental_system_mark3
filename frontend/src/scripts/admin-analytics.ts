document.addEventListener("DOMContentLoaded", ()=>{
    const vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const totalvehicles = vehicles.length;
    const totalbooked = bookings.length;

    const remainingvehicles = totalvehicles - totalbooked;
    let totalrevenue =0;

    bookings.forEach((booking:any)=>{
        totalrevenue += booking.price;
    });

    (document.getElementById("totalvehicles") as HTMLElement).innerText= totalvehicles.toString();
    (document.getElementById("totalbooked") as HTMLElement).innerText= totalbooked.toString();
    (document.getElementById("remainingvehicles") as HTMLElement).innerText= remainingvehicles.toString();
    (document.getElementById("totalrevenue") as HTMLElement).innerHTML= `&#8377; ${totalrevenue}`;
})