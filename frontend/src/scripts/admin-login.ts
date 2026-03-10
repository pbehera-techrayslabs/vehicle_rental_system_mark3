interface Admin {
  email: string;
  password: string;
}

interface CurrentAdmin {
  email: string;
  role: string;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("admin")) {
    const admin: Admin = {
      email: "admin@admin.com",
      password: "admin123"
    };
    localStorage.setItem("admin", JSON.stringify(admin));
  }

  const form = document.getElementById("admin-login-form") as HTMLFormElement | null;
  const msg = document.getElementById("msg") as HTMLElement | null;

  form?.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const emailInput = document.getElementById("admin-email") as HTMLInputElement | null;
    const passwordInput = document.getElementById("admin-password") as HTMLInputElement | null;

    const email = emailInput?.value.trim() ?? "";
    const password = passwordInput?.value.trim() ?? "";

    const adminStr = localStorage.getItem("admin");
    const admin: Admin = adminStr ? JSON.parse(adminStr) : { email: "", password: "" };

    if (email === admin.email && password === admin.password) {
      const currentAdmin: CurrentAdmin = {
        email: admin.email,
        role: "admin"
      };
      localStorage.setItem("currentAdmin", JSON.stringify(currentAdmin));
      window.location.href = "/frontend/src/pages/admin-dashboard.html";
    } else if (msg) {
      msg.textContent = "Invalid Admin Credentials!";
    }
  });
});