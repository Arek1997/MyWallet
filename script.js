"use strict";

let theme = localStorage.getItem("theme");
let cash = 0;
const root = document.documentElement;

const letter = /[a-z]/gi;
const lightBrn = document.querySelector(".light");
const darkBrn = document.querySelector(".dark");
const addTransaction = document.querySelector(".add-transaction");
const removeAllTransactions = document.querySelector(".delete-all");

const transactionPanel = document.querySelector(".add-transaction-panel");
const inputName = document.querySelector("#name");
const inputAmount = document.querySelector("#amount");
const inputCategory = document.querySelector("#category");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const errorMsg = document.querySelector(".error-msg");

const incomes = document.querySelector(".income-area");
const expenses = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const allTransactions = document.getElementsByClassName("transaction");

const lightTheme = function () {
  theme = "light";
  localStorage.setItem("theme", theme);
  root.style.setProperty("--first-color", "#F9F9F9");
  root.style.setProperty("--second-color", "#14161F");
  root.style.setProperty("--border-color", "rgba(0, 0, 0, .2)");
};

if (theme === "light") lightTheme();

const darkTheme = function () {
  theme = "dark";
  localStorage.setItem("theme", theme);
  root.style.setProperty("--first-color", "#14161F");
  root.style.setProperty("--second-color", "#F9F9F9");
  root.style.setProperty("--border-color", "rgba(255, 255, 255, .2)");
};

if (theme === "dark") darkTheme();

const showTransactionPanel = function () {
  transactionPanel.classList.add("fade-in");
};

const hideTransactionPanel = function () {
  transactionPanel.classList.add("fade-out");
  setTimeout(() => {
    transactionPanel.classList.remove("fade-in");
    transactionPanel.classList.remove("fade-out");
  }, 500);

  clearForm();
};

const checkForm = function () {
  if (
    !letter.test(inputName.value) ||
    inputAmount.value === "" ||
    inputCategory.value === "none"
  ) {
    showError();
  } else {
    updateWalletMoney();
    saveTransaction();
    hideTransactionPanel();
  }
};

const clearForm = function () {
  inputName.value = inputAmount.value = "";
  inputCategory.value = "none";
};

const saveTransaction = function () {
  let icon;
  if (inputCategory.value === "income")
    icon = '<i class="fas fa-money-bill-wave"></i>';
  if (inputCategory.value === "shopping")
    icon = '<i class="fas fa-cart-arrow-down"></i>';
  if (inputCategory.value === "food") icon = '<i class="fas fa-hamburger"></i>';
  if (inputCategory.value === "cinema") icon = '<i class="fas fa-film"></i>';

  const html = `
                <div class="transaction">
                    <p class="transaction-name">${icon}${inputName.value}</p>
                    <p class="transaction-amount">${inputAmount.value}zł <button class="delete"><i class="fas fa-times"></i></button></p>
                </div>
    `;

  inputAmount.value.startsWith("-")
    ? expenses.insertAdjacentHTML("beforeend", html)
    : incomes.insertAdjacentHTML("beforeend", html);
};

const updateWalletMoney = function () {
  cash += +inputAmount.value;
  availableMoney.textContent = cash;
};

const showError = function () {
  errorMsg.classList.add("showError");
  setTimeout(() => errorMsg.classList.remove("showError"), 1500);
};

const deleteTransaction = function (e) {
  if (!e.target.classList.contains("fa-times")) return;

  const money = e.target
    .closest(".transaction-amount")
    .textContent.slice(
      0,
      e.target.closest(".transaction-amount").textContent.indexOf("z")
    );

  cash -= +money;
  availableMoney.textContent = cash;
  e.target.closest(".transaction").remove();
};

const deleteAllTransactions = function () {
  [...allTransactions].forEach((el) => el.remove());
  cash = 0;
  availableMoney.textContent = 0;
};

addTransaction.addEventListener("click", showTransactionPanel);
cancelBtn.addEventListener("click", hideTransactionPanel);
saveBtn.addEventListener("click", checkForm);
lightBrn.addEventListener("click", lightTheme);
darkBrn.addEventListener("click", darkTheme);
removeAllTransactions.addEventListener("click", deleteAllTransactions);
incomes.addEventListener("click", deleteTransaction);
expenses.addEventListener("click", deleteTransaction);
