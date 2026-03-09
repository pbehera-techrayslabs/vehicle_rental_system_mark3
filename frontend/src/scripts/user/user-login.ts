document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = (document.getElementById("login-email") as HTMLInputElement).value.trim();
        const password = (document.getElementById("password") as HTMLInputElement).value.trim();
        const submit = (document.getElementById("submit") as HTMLButtonElement);


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


        if (!email || !password) {
            showToast("All fields are required", "error");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (!user) {
            showToast("Invalid Credentials", "error");
            return;
        }

        const token = "token_" + Date.now();

        localStorage.setItem("token", token);
        localStorage.setItem("currentUser", JSON.stringify(user));

        showToast("Login Successful", "success");
        
        setTimeout(() => {
            window.location.href = "/frontend/src/pages/user/user-dashboard.html";
        }, 1000);
        
    })
});


