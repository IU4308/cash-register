const cash = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const priceText = document.querySelector(".price p")
const changeDue = document.getElementById("change-due")
const changeInDrawer = document.querySelector(".change")
const totalCIDSpan = document.getElementById("total-cid")


let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

price = 3.26;
cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const renderCID = (arr) => {
    changeInDrawer.innerHTML = arr.map(el => `<p>${el[0].toLowerCase()}: $${el[1].toFixed(2)}</p>`).join("")
}
renderCID(cid)

priceText.innerText = `Total: $${price}`
// let change;
const sumArr = (arr) => {
    return arr.reduce((acc, item) => parseFloat((acc + item[1]).toFixed(2)), 0)
}

let totalCID = sumArr(cid)

const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]

// totalCIDSpan.innerText = `$${totalCID}`

const updateCID = (arr, arr_copy) => {

}

const func = (change, name, amount, value, output) => {
    let x = Math.floor(change / value)
    let y = Math.floor(change / amount)
    if (amount < change) {
        change = parseFloat((change - amount).toFixed(2))
        output.push([name, amount])
        amount = 0
    } else {
        change = parseFloat((change - value * x).toFixed(2))
        output.push([name, value * x])
        amount -= value * x
    }
    console.log(change)
    // console.log(name, amount)
    return [change, amount]
}


const mainFunc = (cash) => {
    let change = parseFloat((cash - price).toFixed(2))
    console.log(change)

    if (change < 0) {
        alert("Customer does not have enough money to purchase the item")
        return
    }

    if (change === 0) {
        changeDue.innerHTML = "<p>No change due - customer paid with exact cash</p>"
        return
    }

    console.log(change)

    let outputArr = []
    let cid_copy = [...cid]

    let i = cid_copy.length - 1
    while (sumArr(cid_copy.slice(0, i + 1)) >= change && i >= 0) {
        if (cid_copy[i][1] > 0 && denominations[i] <= change) {
            [change, cid_copy[i][1]] = func(change, cid_copy[i][0], cid_copy[i][1], denominations[i], outputArr)
        }
        i--
    }
    if (change !== 0 && cid_copy.some(el => el[1] !== 0)) {
        changeDue.innerHTML = "<p class='closed'>Status: insufficent funds</p>"
        return
    } else {
        cid = cid_copy
        console.log(cid)
        if (cid.every(el => el[1] === 0)) {
            console.log("Status: Closed")
            renderCID(cid)
            changeDue.innerHTML = `<p class="closed">Satus: CLOSED</p>` + outputArr.map(el => `<p>${el[0]}: $${el[1].toFixed(2)}</p>`).join(" ")
        } else {
            console.log("Satatus: Open")
            renderCID(cid)
            changeDue.innerHTML = `<p class="open">Satus: OPEN</p>` + outputArr.map(el => `<p>${el[0]}: $${el[1].toFixed(2)}</p>`).join(" ")
        }
    }

}

purchaseBtn.addEventListener("click", () => {
    mainFunc(cash.value)
})