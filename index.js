/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container"); // get control of div

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
	// loop over each item in the data
	// create a new div element, which will become the game card
	// add the class game-card to the list
	// set the inner HTML using a template literal to display some info
	// about each game
	// TIP: if your images are not displaying, make sure there is space
	// between the end of the src attribute and the end of the tag ("/>")
	// append the game to the games-container

	for (let game of games) {
		// 建立一個 div 元素作為遊戲卡片
		const gameCard = document.createElement("div");

		// 加上 class 名稱 "game-card"
		gameCard.classList.add("game-card");

		// 用 template literal 設定卡片內容（圖片、名稱、描述、贊助人數）
		gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

		// 加入到主容器中
		gamesContainer.appendChild(gameCard);
	}
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalIndividualContri = GAMES_JSON.reduce(
	(accu, game) => accu + game.backers,
	0
);
console.warn(totalIndividualContri);
contributionsCard.innerText = totalIndividualContri.toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalMoney = GAMES_JSON.reduce((accu, game) => accu + game.pledged, 0);
console.warn(totalMoney);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalMoney.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerText = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// filterUnfundedOnly();
// filterFundedOnly();
// showAllGames();

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have not yet met their goal
	const unfunded_list = GAMES_JSON.filter((game) => game.pledged < game.goal);
	console.warn(unfunded_list.length);
	// use the function we previously created to add the unfunded games to the DOM
	addGamesToPage(unfunded_list);
}

// show only games that are fully funded
function filterFundedOnly() {
	deleteChildElements(gamesContainer);

	// use filter() to get a list of games that have met or exceeded their goal
	const funded_list = GAMES_JSON.filter((game) => game.pledged >= game.goal);
	console.warn(funded_list.length);
	// use the function we previously created to add unfunded games to the DOM
	addGamesToPage(funded_list);
}

// show all games
function showAllGames() {
	deleteChildElements(gamesContainer);
	// add all games from the JSON data to the DOM
	addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded_length = GAMES_JSON.filter(
	(game) => game.pledged < game.goal
).length;
console.warn(unfunded_length);

// create a string that explains the number of unfunded games using the ternary operator
const unfunded_explanation = `A total of $${totalMoney.toLocaleString()} has been raised for ${
	GAMES_JSON.length
} games. Currently, ${unfunded_length} game remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGameDescription = document.createElement("p");
unfundedGameDescription.innerText = unfunded_explanation;
descriptionContainer.append(unfundedGameDescription);

// descriptionContainer.append;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
	return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let [firstGame, secondGame, ...others] = sortedGames;
console.warn(firstGame);
console.warn(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item
