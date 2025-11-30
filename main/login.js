const users = [{username: "admin", password: "1234",role:"admin" }, {username: "teacher", password: "1234",role:"teacher" }, {username: "student", password: "1234",role:"student" }]
const invalid = document.getElementById("invalid")
function login(event) {
    if (event.key == "Enter") {
        let user = document.getElementById("user").value.trim()
        let pass = document.getElementById("pass").value.trim()
        let invalid = document.querySelector(".invalid")

        let founduser = users.find(x => x.username == user && x.password == pass)
        if (founduser) {
            localStorage.setItem("currentrole",founduser.role)
            localStorage.setItem("currentusername",founduser.username)
            window.location.href = "admin.html"
        }
        else {
            invalid.style.display = "flex"
        }
    }
}