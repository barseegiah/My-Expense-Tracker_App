document.addEventListener('DOMContentLoaded', function() {
    const expensesContainer = document.getElementById('expensesContainer');

    // Retrieve expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Function to create expense HTML element
    function createExpenseElement(expense) {
        const expenseDiv = document.createElement('div');
        expenseDiv.className = 'list_list-1';

        expenseDiv.innerHTML = `
            <div class="load-image">
                <img src="${expense.file ? ../Exp_IMG/${expense.file} : '../Exp_IMG/default.png'}" alt="Expense Image" />
            </div>
            <div class="expense-details">
                <h3>${expense.expenseType.charAt(0).toUpperCase() + expense.expenseType.slice(1)}</h3>
                <h6>${new Date(expense.date).toLocaleDateString()}</h6>
                <h3>US$${expense.price}</h3>
            </div>
            <div class="ex-details">
                <button name="favorite">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                </button>
            </div>
        `;
        return expenseDiv;
    }

    // Append all expenses to the container
    expenses.forEach(expense => {
        const expenseElement = createExpenseElement(expense);
        expensesContainer.appendChild(expenseElement);
    });
});