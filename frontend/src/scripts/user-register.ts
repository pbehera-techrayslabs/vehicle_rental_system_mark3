document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form") as HTMLFormElement | null;
    const nameInput = document.getElementById("register-name") as HTMLInputElement | null;
    const emailInput = document.getElementById("register-email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("register-password") as HTMLInputElement | null;
    const loginLink = document.querySelector("a[href='']") as HTMLAnchorElement | null;

    // Toast function
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

    // Initialize users storage
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }

    // Update login link
    if (loginLink) loginLink.href = "";

    form?.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        const name = nameInput?.value.trim() || "";
        const email = emailInput?.value.trim() || "";
        const password = passwordInput?.value.trim() || "";

        // Validation
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name)) {
            showToast("Full name should contain only letters and spaces ❌", "error");
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("Please enter a valid email address ❌", "error");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters long ❌", "error");
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            showToast("Password must contain at least one letter and one number ❌", "error");
            return;
        }

        // Load existing users
        const users: {name: string, email: string, password: string}[] = JSON.parse(localStorage.getItem("users") || "[]");

        // Check for duplicate email
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showToast("Email already registered ❌", "error");
            return;
        }

        // Save new user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Registration successful ✅ now login!");

        // Redirect to login after short delay
        setTimeout(() => {
            window.location.href = "/frontend/src/pages/user-login.html";
        }, 1000);

        form.reset();
    });
});