//----------> Styling
const body = document.querySelector("body");
const empty = document.getElementById("empty");
document.querySelector(
	".wrapper"
).style.cssText = `height: 100vh; display: flex; justify-content: center; align-items: center;`;
const game = document.querySelector(".game");
let lis = document.getElementsByClassName("square");
game.style.cssText = `list-style-type: none; height: 700px; width: 700px; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr); border: 2px solid black; `;
let arrayOfSquares;
let index;
const winnerComb = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"empty",
];

for (const li of lis) {
	if (li.id != "empty") {
		li.style.cssText = `border: 1px solid black; display: flex; justify-content: center; align-items: center; font-size: 55px;`;
		li.textContent = `${li.id}`;
	}
}
//----------> Drag and Drop

function drag(e) {
	e.target.style.top = `${e.pageY - e.target.offsetHeight / 2}px`;
	e.target.style.left = `${e.pageX - e.target.offsetWidth / 2}px`;
}

//----------> Random shuffle
function shuffle(lis) {
	const arrForRandom = Array.from(lis);
	for (let i = arrForRandom.length - 1; i > 0; i--) {
		if (arrForRandom[i].id != "empty") {
			let start = arrForRandom[i];
			let random = Math.floor(Math.random() * (i + 1));
			arrForRandom[i] = arrForRandom[random];
			arrForRandom[random] = start;
		}
	}
	return arrForRandom;
}

function winCheck(winnerComb, arrayOfSquares) {
	const arrayOfIds = arrayOfSquares.map((sq) => {
		return sq.id;
	});
	let outcome;
	for (let i = 0; i < arrayOfIds.length; i++) {
		if (arrayOfIds[i] !== winnerComb[i]) {
			return (outcome = 2);
		} else {
			outcome = 1;
		}
	}
	return outcome;
}

function edgeMove(e) {
	if (empty == lis[3] && e.target == empty.nextElementSibling) {
		return true;
	} else if (empty == lis[7] && e.target == empty.nextElementSibling) {
		return true;
	} else if (empty == lis[11] && e.target == empty.nextElementSibling) {
		return true;
	} else if (empty == lis[4] && e.target == empty.previousElementSibling) {
		return true;
	} else if (empty == lis[8] && e.target == empty.previousElementSibling) {
		return true;
	} else if (empty == lis[12] && e.target == empty.previousElementSibling) {
		return true;
	} else {
		return false;
	}
}

//Main code

//---------->Random game start
const random = shuffle(lis);
random.forEach((square, index) => {
	lis[index].after(square);
});

game.addEventListener("mousedown", (e) => {
	if (e.target.tagName == "LI") {
		if (e.target != empty) {
			arrayOfSquares = Array.from(lis);
			index = arrayOfSquares.indexOf(empty);
			if (
				e.target == empty.previousElementSibling ||
				e.target == empty.nextElementSibling ||
				e.target == lis[index + 4] ||
				e.target == lis[index - 4]
			) {
				const edgeCheck = edgeMove(e);
				if (edgeCheck != true) {
					let blank = e.target.cloneNode();
					e.target.after(blank);

					//----------> White space behind moving block

					e.target.style.position = `absolute`;
					body.append(e.target);
					e.target.style.width = `${game.firstElementChild.offsetWidth}px`;
					e.target.style.height = `${game.firstElementChild.offsetHeight}px`;
					e.target.style.top = `${
						e.pageY - e.target.offsetHeight / 2
					}px`;
					e.target.style.left = `${
						e.pageX - e.target.offsetWidth / 2
					}px`;
					e.target.addEventListener("mousemove", drag);
					e.target.addEventListener(
						"mouseup",
						(e) => {
							if (
								e.pageY >= empty.offsetTop &&
								e.pageY <=
									empty.offsetTop + empty.offsetHeight &&
								e.pageX >= empty.offsetLeft &&
								e.pageX <= empty.offsetLeft + empty.offsetWidth
							) {
								empty.after(e.target);
								e.target.style.position = `static`;
								e.target.style.top = `${empty.offsetTop}px`;
								e.target.style.left = `${empty.offsetLeft}px`;
								e.target.removeEventListener("mousemove", drag);
								blank.after(empty);
								blank.remove();
								arrayOfSquares = Array.from(lis);
								let outcome = winCheck(
									winnerComb,
									arrayOfSquares
								);
								if (outcome == 1) {
									alert("Congratulations! You won the game.");
								}
							} else {
								blank.textContent = e.target.textContent;
								e.target.remove();
							}
						},
						{ once: true }
					);
				}
			}
		}
	}
});
