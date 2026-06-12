const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            alert("Email already registered.");
            return;
        }

        const newUser = {
            name,
            email,
            password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration successful!");

        window.location.href = "index.html";
    });

}
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u =>
                u.email === email &&
                u.password === password
        );

        if (!user) {
            alert("Invalid email or password");
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login successful!");

        window.location.href = "dashboard.html";
    });

}