declare global {
    interface Window {
        editVehicle: (id: number) => void;
        deleteVehicle: (id: number) => void;
    }
}

interface Vehicle {
    id: number;
    name: string;
    category: string;
    fuel: string;
    seating: number;
    price: number;
    status: string;
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("vehicle-form") as HTMLFormElement;
    const vehicleList = document.getElementById("vehicle-list") as HTMLElement;
    const categorySelect = document.getElementById("vehicle-category") as HTMLSelectElement;
    const seatingInput = document.getElementById("vehicle-seating") as HTMLInputElement;
    const formHeading = document.getElementById("vehicle-form-heading") as HTMLElement;
    const submitButton = form.querySelector("button[type='submit']") as HTMLButtonElement;
    const analytics= document.getElementById("analytics");
    const bookings= document.getElementById("bookings");
    const logoutBtn = document.getElementById("logout-btn");

//    storage
    if (!localStorage.getItem("vehicles")) {
        localStorage.setItem("vehicles", JSON.stringify([]));
    }

    let vehicles: Vehicle[] = JSON.parse(localStorage.getItem("vehicles") || "[]");
    let isEditMode = false;
// toast feature
   
    function showToast(message: string, type: "success" | "error" = "success") {
        const toast = document.createElement("div");

        toast.textContent = message;
        toast.className = `
            fixed top-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white z-50
            ${type === "success" ? "bg-green-600" : "bg-red-600"}
            transition-opacity duration-300
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    // edit
    function setEditMode(editing: boolean) {
        isEditMode = editing;

        if (editing) {
            formHeading.textContent = "Update Vehicle";
            submitButton.textContent = "Update Vehicle";
            submitButton.classList.remove("bg-blue-600");
            submitButton.classList.add("bg-yellow-600");
        } else {
            formHeading.textContent = "Add Vehicle";
            submitButton.textContent = "Save Vehicle";
            submitButton.classList.remove("bg-yellow-600");
            submitButton.classList.add("bg-blue-600");
        }
    }

    // catagory select
    categorySelect.addEventListener("change", () => {
        const category = categorySelect.value;

        if (category === "Bike" || category === "Scooty") {
            seatingInput.value = "2";
            seatingInput.readOnly = true;
        } else {
            seatingInput.value = "";
            seatingInput.readOnly = false;
            seatingInput.max = "16";
            seatingInput.min = "1";
        }
    });

//  render
    function renderVehicles(): void {
        vehicleList.innerHTML = "";

        vehicles.forEach((v: Vehicle) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="border p-2">${v.name}</td>
                <td class="border p-2">${v.category}</td>
                <td class="border p-2">${v.fuel}</td>
                <td class="border p-2">${v.seating}</td>
                <td class="border p-2">₹ ${v.price}</td>
                <td class="border p-2">${v.status}</td>
                <td class="border p-2 space-x-2">
                    <button onclick="editVehicle(${v.id})"
                        class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">
                        Edit
                    </button>
                    <button onclick="deleteVehicle(${v.id})"
                        class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                        Delete
                    </button>
                </td>
            `;

            vehicleList.appendChild(row);
        });
    }

    renderVehicles();

    // submit
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        const id = (document.getElementById("vehicle-id") as HTMLInputElement).value;
        const name = (document.getElementById("vehicle-name") as HTMLInputElement).value;
        const fuel = (document.getElementById("vehicle-fuel") as HTMLSelectElement).value;
        const category = categorySelect.value;
        const seating = Number(seatingInput.value);
        const price = Number((document.getElementById("vehicle-price") as HTMLInputElement).value);

        // Validation
        if (category === "Car" && seating > 16) {
            showToast("Car cannot have more than 16 seats ❌", "error");
            return;
        }

        if ((category === "Bike" || category === "Scooty") && seating !== 2) {
            showToast("Bike and Scooty must have 2 seats ❌", "error");
            return;
        }

        const wasEditing = !!id;

        if (id) {
            vehicles = vehicles.map(v =>
                v.id === Number(id)
                    ? { ...v, name, category, fuel, seating, price }
                    : v
            );
        } else {
            vehicles.push({
                id: Date.now(),
                name,
                category,
                fuel,
                seating,
                price,
                status: "Available"
            });
        }

        localStorage.setItem("vehicles", JSON.stringify(vehicles));

        form.reset();
        (document.getElementById("vehicle-id") as HTMLInputElement).value = "";
        setEditMode(false);
        renderVehicles();

        showToast(
            wasEditing
                ? "Vehicle updated successfully ✅"
                : "Vehicle added successfully ✅"
        );
    });


  //edit logic
    window.editVehicle = function (id: number): void {
        const vehicle = vehicles.find(v => v.id === id);
        if (!vehicle) return;

        (document.getElementById("vehicle-id") as HTMLInputElement).value = vehicle.id.toString();
        (document.getElementById("vehicle-name") as HTMLInputElement).value = vehicle.name;
        categorySelect.value = vehicle.category;
        (document.getElementById("vehicle-fuel") as HTMLSelectElement).value = vehicle.fuel;
        seatingInput.value = vehicle.seating.toString();
        (document.getElementById("vehicle-price") as HTMLInputElement).value = vehicle.price.toString();

        setEditMode(true);
        showToast("Edit mode enabled ✏️");
    };

    // delete
    window.deleteVehicle = function (id: number): void {
        const confirmDelete = confirm("Are you sure you want to delete this vehicle?");
        if (!confirmDelete) return;

        vehicles = vehicles.filter(v => v.id !== id);
        localStorage.setItem("vehicles", JSON.stringify(vehicles));

        renderVehicles();
        showToast("Vehicle deleted successfully 🗑️");
    };

    analytics?.addEventListener("click", ()=>{
        window.location.href = "/frontend/src/pages/admin-analytics.html"
    });

    bookings?.addEventListener("click", () =>{
        window.location.href="/frontend/src/pages/admin-bookings.html"
    })


    // logout
    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("adminLoggedIn");
        window.location.href = "/frontend/index.html";
    });

});