'use strict';

import { theme, lightTheme, darkTheme } from './theme';

let cash = 0;
const letter = /[a-z]/gi;
const lightBrn = document.querySelector('.light') as HTMLButtonElement;
const darkBrn = document.querySelector('.dark') as HTMLButtonElement;
const addTransaction = document.querySelector(
	'.add-transaction'
) as HTMLButtonElement;
const removeAllTransactions = document.querySelector(
	'.delete-all'
) as HTMLButtonElement;

const transactionPanel = document.querySelector(
	'.add-transaction-panel'
) as HTMLDivElement;
const inputName = document.querySelector('#name') as HTMLInputElement;
const inputAmount = document.querySelector('#amount') as HTMLInputElement;
const inputCategory = document.querySelector('#category') as HTMLInputElement;
const saveBtn = document.querySelector('.save') as HTMLButtonElement;
const cancelBtn = document.querySelector('.cancel') as HTMLButtonElement;
const errorMsg = document.querySelector('.error-msg') as HTMLDivElement;

const incomes = document.querySelector('.income-area') as HTMLDivElement;
const expenses = document.querySelector('.expenses-area') as HTMLDivElement;
const availableMoney = document.querySelector(
	'.available-money'
) as HTMLSpanElement;
const allTransactions = document.getElementsByClassName('transaction');

if (theme === 'light') lightTheme();

if (theme === 'dark') darkTheme();

const showTransactionPanel = function () {
	transactionPanel.classList.remove('hidden');
};

const hideTransactionPanel = function () {
	transactionPanel.classList.add('fade-out');
	setTimeout(() => {
		transactionPanel.classList.add('hidden');
		transactionPanel.classList.remove('fade-out');
	}, 500);

	clearForm();
};

const checkForm = function () {
	if (
		letter.test(inputName.value) &&
		inputAmount.value !== '' &&
		inputCategory.value !== 'none'
	) {
		updateWalletMoney();
		saveTransaction();
		hideTransactionPanel();
	} else {
		showError();
	}
};

const clearForm = function () {
	inputName.value = inputAmount.value = '';
	inputCategory.value = 'none';
};

const saveTransaction = function () {
	let icon;
	if (inputCategory.value === 'income')
		icon = '<i class="fas fa-money-bill-wave"></i>';
	if (inputCategory.value === 'shopping')
		icon = '<i class="fas fa-cart-arrow-down"></i>';
	if (inputCategory.value === 'food') icon = '<i class="fas fa-hamburger"></i>';
	if (inputCategory.value === 'cinema') icon = '<i class="fas fa-film"></i>';

	const html = `
                <div class="transaction">
                    <p class="transaction-name">${icon}${inputName.value}</p>
                    <p class="transaction-amount">${(+inputAmount.value).toFixed(
											2
										)}zł <button class="delete"><i class="fas fa-times"></i></button></p>
                </div>
    `;

	inputAmount.value.startsWith('-')
		? expenses.insertAdjacentHTML('beforeend', html)
		: incomes.insertAdjacentHTML('beforeend', html);
};

const updateWalletMoney = function () {
	cash += +inputAmount.value;
	availableMoney.textContent = cash.toFixed(2);
};

const showError = function () {
	errorMsg.classList.add('showError');
	setTimeout(() => errorMsg.classList.remove('showError'), 1500);
};

const deleteTransaction = function (e: Event) {
	const target = e.target as HTMLElement;

	if (!target.classList.contains('fa-times')) return;

	const money = parseFloat(target.closest('.transaction-amount').textContent);

	cash -= money;
	availableMoney.textContent = cash.toFixed(2);

	target.closest('.transaction').remove();
};

const deleteAllTransactions = function () {
	[...allTransactions].forEach((el) => el.remove());
	cash = 0;
	availableMoney.textContent = '0';
};

addTransaction.addEventListener('click', showTransactionPanel);
cancelBtn.addEventListener('click', hideTransactionPanel);
saveBtn.addEventListener('click', checkForm);
lightBrn.addEventListener('click', lightTheme);
darkBrn.addEventListener('click', darkTheme);
removeAllTransactions.addEventListener('click', deleteAllTransactions);
incomes.addEventListener('click', deleteTransaction);
expenses.addEventListener('click', deleteTransaction);
