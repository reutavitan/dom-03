let expenses = [];
let nextId = 1;
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const formError = document.getElementById("form-error");
const rows = document.getElementById("rows");
const total = document.getElementById("total");
const filter = document.getElementById("filter");
let selectedCategory = "all";
const sortBtn = document.getElementById("sort-btn");
let isSorted = false;
const noRows = document.getElementById("no-rows");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const desc = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    
    if (!desc) {
        formError.textContent = "Please add a description";
        formError.hidden = false;
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        formError.textContent = "The amount must be larger than 0";
        formError.hidden = false;
        return;
    }

    const expense = { id: nextId++, desc, amount, category };
    formError.hidden = true;
    expenses.push(expense);
    render();
    form.reset();
    descInput.focus();
});

function render() {
    rows.innerHTML = "";

    const filteredExpenses = selectedCategory === "all"
        ? expenses
        : expenses.filter(expense => expense.category === selectedCategory);

    const displayedExpenses = isSorted
        ? filteredExpenses.toSorted((a, b) => b.amount - a.amount)
        : filteredExpenses;
    noRows.hidden = filteredExpenses.length > 0;
        displayedExpenses.forEach(expense => {
        const row = document.createElement("tr");
        if (expense.amount > 100) {
            row.classList.add("big");
        }
        row.innerHTML = `

      <td>${expense.desc}</td>
<td><span class="badge">${expense.category}</span></td>
<td>${expense.amount.toFixed(2)}</td>
<td><button class="delete" data-id="${expense.id}">Delete</button></td>
    `;

        rows.appendChild(row);
    });

    updateTotal(filteredExpenses);
}

rows.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const id = parseInt(event.target.dataset.id);
        expenses = expenses.filter(expense => expense.id !== id);
        render();
    }
});

function updateTotal(filteredExpenses) {
    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    total.textContent = totalAmount.toFixed(2);
}

filter.addEventListener("change", () => {
    selectedCategory = filter.value;
    render();
});

sortBtn.addEventListener("click", () => {
    isSorted = !isSorted;
    sortBtn.textContent = isSorted
        ? "Sort by amount: on"
        : "Sort by amount: off";
    render();
});

// Exercise 3 - Expense Tracker
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// One expense in the array looks like this:
// { id: 1, desc: "Pizza", amount: 42.5, category: "food" }

// Step 1: add an expense on submit (unique id, no reload, validation messages, clear desc + amount, focus desc)

// Step 2: render() - rebuild the table rows from the array

// Step 3: delete (one listener on #rows - event delegation, by data-id)

// Step 4: total of the expenses that are shown

// Step 5: filter by category

// Step 6: sort by amount (toSorted - the original array keeps its order)

// Step 7: rows with an amount above 100 get the class "big"
