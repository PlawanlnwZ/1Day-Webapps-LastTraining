const scp = document.getElementById("scp")
const confirmdelete = document.getElementById("confirmdelete")
const delcname = document.getElementById("delcname")
const plist = document.getElementById("plist")
const welcomemsg = document.getElementById("welcomemsg")
const missingnameornum = document.getElementById("missingnameornum")
let currentplist = localStorage.getItem("currentplist")
let currentrole = localStorage.getItem("currentrole")
let currentusername = localStorage.getItem("currentusername")
let currentrow;
const setviewpop = document.getElementById("setviewpop")
let viewcname = document.getElementById("viewcname")
let viewtable = document.getElementById("viewtable")

welcomemsg.innerText = `Welcome ${currentrole}`
let currentcname;
let currentcnum;
let currentpos;
let currentcmax;
let thiscnum;
let currentteachlist = localStorage.getItem("currentteachlist")


plist.innerHTML = currentplist //<p>

function logout() {
    localStorage.removeItem("currentrole")
    window.location.href = "login.html"
}

function search() {
    let searchval = document.getElementById("searchval").value
    newval = searchval.toLowerCase()
    console.log(newval)
    let currentchomnum = document.querySelectorAll(".chomnum")

    currentchomnum.forEach(x => x.textContent.toLowerCase().includes(newval) ? x.style.display = "flex" : x.style.display = "none")
}


if (currentrole == "student") {

    document.querySelectorAll(".viewbtn").forEach(x => x.remove())
    document.querySelectorAll(".disbandbtn").forEach(x => x.remove())
    document.querySelectorAll("#createbtn").forEach(x => x.remove())
    document.querySelectorAll(".chomnum").forEach((x) => {
        const thiscname = x.closest("p").textContent.replace("Join", "").trim().split(" ")[0]
        let thiscnum = localStorage.getItem(`thiscnum${thiscname}`) || 0
        let thiscmax = localStorage.getItem(`thiscmax${thiscname}`)

        thiscmax = x.closest("p").textContent.replace("Join", "").trim().split(" ")[3].split("/")[1]
        x.textContent = `${thiscname} | จำนวนคน ${thiscnum}/${thiscmax}`
    })
    document.querySelectorAll(".chomnum").forEach((x, index) => x.innerHTML += `<button class="joinbtn" onclick="join(this,${index})">Join</button>`)

    function join(x, index) {
        const thiscname = x.closest("p").textContent.replace("Join", "").trim().split(" ")[0]
        let thiscnum = Number(x.closest("p").textContent.replace("Join", "").trim().split(" ")[3].split("/")[0])
        const thiscmax = x.closest("p").textContent.replace("Join", "").trim().split(" ")[3].split("/")[1]
        if (thiscnum < thiscmax) {
            thiscnum++
            x.closest("p").textContent = `${thiscname} | จำนวนคน ${thiscnum}/${thiscmax}`
            document.querySelectorAll(".joinbtn").forEach(x => x.remove())
            localStorage.setItem(`thiscnum${thiscname}`, thiscnum)
            localStorage.setItem(`thiscmax${thiscname}`, thiscmax)
            viewtable.innerHTML += `<tr>
                    <td>${currentusername}</td>
                    <td><button onclick="kick(this)">Kick</button></td>
                </tr>`
            localStorage.setItem(`currenttableof${thiscname.trim()}`,viewtable.innerHTML)
        }
        else {
            window.alert("Full member")
        }
    }
}

if (currentrole == "admin") {

    document.querySelectorAll(".chomnum").forEach((x) => {
        const thiscname = x.closest("p").textContent.replace("Join", "").trim().split(" ")[0]
        let thiscnum = localStorage.getItem(`thiscnum${thiscname}`) || 0
        const thiscmax = x.closest("p").textContent.replace("Join", "").trim().split(" ")[3].split("/")[1]
        x.innerHTML = `${thiscname} | จำนวนคน ${thiscnum}/${thiscmax} <button class="viewbtn" onclick="view(this)">VIEW</button> <button class="disbandbtn" onclick="deleting(this)">DISBAND</button></p>`
    })

    function create() {
        scp.style.display = "flex"
    }

    function closescp() {
        scp.style.display = "none"
    }

    function deleting(x) {
        currentrow = x.closest("p")
        confirmdelete.style.display = "flex"
        delcname.textContent = currentrow.closest("p").textContent.replace("VIEW DISBAND", "").trim().split("|")[0]
    }

    function no() {
        confirmdelete.style.display = "none"
    }

    function yes() {
        confirmdelete.style.display = "none"
        currentrow.remove()
        localStorage.setItem("currentplist", plist.innerHTML)
    }   

    function confirm() {
        let cinpname = document.getElementById("cinpname").value
        let cinpnum = document.getElementById("cinpnum").value
        if (cinpname && cinpnum) {
            console.log(cinpname, cinpnum)
            plist.innerHTML += `<p class="chomnum">${cinpname} | จำนวนคน 0/${cinpnum} <button class="viewbtn" onclick="view(this)">VIEW</button> <button class="disbandbtn" onclick="deleting(this)">DISBAND</button></p>`
            localStorage.setItem("currentplist", plist.innerHTML)
        } else {
            missingnameornum.style.display = "flex"
        }

    }

    function view(x) {
        setviewpop.style.display = "flex"
        viewcname.textContent = x.closest("p").textContent.replace("VIEW DISBAND", "").trim().split("|")[0]
    }

    function closeview() {
        setviewpop.style.display = "none"
    }
    function kick(x) {
        x.closest("td").parentElement.remove()
        
    }
}

if (currentrole == "teacher") {
    document.querySelectorAll(".chomnum").forEach((x) => {
        const thiscname = x.closest("p").textContent.replace("Join", "").trim().split(" ")[0]
        secondcnum = Number(localStorage.getItem(`thiscnum${thiscname}`)) || 0
        console.log(secondcnum)
        let thiscmax = localStorage.getItem(`thiscmax${thiscname}`)
        thiscmax = x.closest("p").textContent.replace("Join", "").trim().split(" ")[3].split("/")[1]
        x.innerHTML = `${thiscname} | จำนวนคน ${secondcnum}/${thiscmax} <button class="viewbtn" onclick="view(this)">VIEW</button>`
        
    })
    
    document.querySelectorAll(".disbandbtn").forEach(x => x.remove())
    function view(x) {
        currentpos = x.closest("p")
        currentcname = x.closest("p").textContent.replace("VIEW", "").trim().split("|")[0]
        currentcnum = Number(x.closest("p").textContent.split(" ")[3].split("/")[0])
        currentcmax = Number(x.closest("p").textContent.split(" ")[3].split("/")[1])
        setviewpop.style.display = "flex"
        viewcname.textContent = x.closest("p").textContent.replace("VIEW DISBAND", "").trim().split("|")[0]
        viewtable.innerHTML = localStorage.getItem(`currenttableof${viewcname.textContent.trim()}`)
    }   
    function closeview() {
        setviewpop.style.display = "none"
    }

    function kick(x) {
        
        let thiscname = currentcname.trim();
        let secondcnum = Number(localStorage.getItem(`thiscnum${thiscname}`));
        if (secondcnum > 0) secondcnum--;
        localStorage.setItem(`thiscnum${thiscname}`, secondcnum);
        currentpos.innerHTML = `${thiscname} | จำนวนคน ${secondcnum}/${currentcmax} 
        <button class="viewbtn" onclick="view(this)">VIEW</button>`;
        x.closest("tr").remove();
        localStorage.setItem(`currenttableof${thiscname}`, viewtable.innerHTML);
        localStorage.setItem("currentplist", plist.innerHTML);
    }
    document.querySelectorAll("#createbtn").forEach(x => x.remove())
}