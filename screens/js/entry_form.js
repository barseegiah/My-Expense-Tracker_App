let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const notification = document.getElementById("notification");

let tempAmount = 0;
let isEditing = false;
let editingElement = null;

// Set Budget Part
totalAmountButton.addEventListener("click", () => {
    tempAmount = parseInt(totalAmount.value);
    // empty or negative input
    if (isNaN(tempAmount) || tempAmount <= 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set Budget
        amount.innerHTML = tempAmount;
        // Set Balance
        balanceValue.innerHTML = tempAmount - expenditureValue.innerText;
        // Clear Input Box
        totalAmount.value = "";

        // Save budget to localStorage
        localStorage.setItem("budget", tempAmount);
        localStorage.setItem("expenditure", expenditureValue.innerText);
        localStorage.setItem("balance", balanceValue.innerText);
    }
});

// Function to disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    })
};

// Function To Modify List Elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = parseInt(balanceValue.innerText);
    let currentExpense = parseInt(expenditureValue.innerText);
    let parentAmount = parseInt(parentDiv.querySelector(".amount").innerText);

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);

        // Set isEditing to true and save the current element being edited
        isEditing = true;
        editingElement = parentDiv;

        // Change the text of the checkout button to "Edit Expense"
        checkAmountButton.innerText = "Edit Expense";
        
    } else {
        balanceValue.innerText = currentBalance + parentAmount;
        expenditureValue.innerText = currentExpense - parentAmount;
        parentDiv.remove();

        // Update localStorage after removing an item
        updateLocalStorage();
    }
};

// Function To Create List
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    sublistContent.innerHTML = `<p class="product">${expenseName}</p> <p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);

    // Update localStorage after creating a new item
    updateLocalStorage();
};

// Function to initialize the budget, expenditure, and list from localStorage
const initializeData = () => {
    tempAmount = localStorage.getItem("budget") ? parseInt(localStorage.getItem("budget")) : 0;
    let expenditure = localStorage.getItem("expenditure") ? parseInt(localStorage.getItem("expenditure")) : 0;

    amount.innerText = tempAmount;
    expenditureValue.innerText = expenditure;
    balanceValue.innerText = tempAmount - expenditure;

    // Retrieve the list from localStorage
    let expenseList = JSON.parse(localStorage.getItem("expenseList"));
    if (expenseList !== null) {
        expenseList.forEach(expense => listCreator(expense.name, expense.value));
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Initialize data on page load
    initializeData();
})

// Function To add Expenses
checkAmountButton.addEventListener("click", () => {
    // Empty checks
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return;
    } else {
        productTitleError.classList.add("hide");
    }

    let expenditure = parseInt(userAmount.value);
    if (isNaN(expenditure) || expenditure <= 0) {  // Check for invalid expense amount
        productTitleError.classList.remove("hide");
        productTitleError.innerText = "Please enter a valid amount.";
        return;
    }

    if (isEditing && editingElement) {
        // Calculate the new total expense
        let oldExpenditure = parseInt(editingElement.querySelector(".amount").innerText);
        let newExpenditure = expenditure;
        let expenditureDifference = newExpenditure - oldExpenditure;
        let sum = parseInt(expenditureValue.innerText) + expenditureDifference;
        expenditureValue.innerText = sum;

        // Total Balance (budget - total expense)
        const totalBalance = tempAmount - sum;
        balanceValue.innerText = totalBalance;

        if (totalBalance < 0) {
            notification.classList.remove("hide");
            notification.innerText = "You have exceeded the budget!";
        } else {
            notification.classList.add("hide");
        }

        // Update the list item
        editingElement.querySelector(".product").innerText = productTitle.value;
        editingElement.querySelector(".amount").innerText = userAmount.value;

        // Reset editing state
        isEditing = false;
        editingElement = null;

        // Change the button text back to "Check Amount"
        checkAmountButton.innerText = "Check Amount";
        
        // Clear input fields
        productTitle.value = "";
        userAmount.value = "";

        // Update localStorage after editing an item
        updateLocalStorage();
    } else {
        // Total expense (existing + new)
        let sum = parseInt(expenditureValue.innerText) + expenditure;
        expenditureValue.innerText = sum;

        // Total Balance (budget - total expense)
        const totalBalance = tempAmount - sum;
        balanceValue.innerText = totalBalance;

        if (totalBalance < 0) {
            notification.classList.remove("hide");
            notification.innerText = "You have exceeded the budget!";
        } else {
            notification.classList.add("hide");
        }

        // Create List
        listCreator(productTitle.value, userAmount.value);

        // Empty inputs
        productTitle.value = "";
        userAmount.value = "";

        // Save updated expenditure and balance to localStorage
        localStorage.setItem("expenditure", expenditureValue.innerText);
        localStorage.setItem("balance", balanceValue.innerText);
    }
});

// Function to update localStorage with the current list of expenses
const updateLocalStorage = () => {
    let expenses = [];
    document.querySelectorAll(".sublist-content").forEach(item => {
        let expenseName = item.querySelector(".product").innerText;
        let expenseValue = item.querySelector(".amount").innerText;
        expenses.push({ name: expenseName, value: expenseValue });
    });
    localStorage.setItem("expenseList", JSON.stringify(expenses));
}
