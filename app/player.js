var degatMissile = 2;


var end = 0;
var over = 0;
var collision = false;
var fighter = new $.gameQuery.Animation({ imageURL: "assets/img/fighter/smallfighter2.png" });
var fighterR = new $.gameQuery.Animation({ imageURL: "assets/img/fighter/smallfighter3.png" });
var fighterL = new $.gameQuery.Animation({ imageURL: "assets/img/fighter/smallfighter1.png" });

//player image 
var missile = new $.gameQuery.Animation({ imageURL: "assets/img/fighter/missile.png" }); //image missile
var flame = new $.gameQuery.Animation({
	imageURL: "assets/img/fighter/flame_sprite.png",
	numberOfFrame: 5,
	delta: 102, // each frame is 40px
	rate: 100,
	type: $.gameQuery.ANIMATION_HORIZONTAL
});
var explosion = new $.gameQuery.Animation({
	imageURL: "assets/img/fighter/Explosion.png",
	numberOfFrame: 64,
	delta: 192,
	rate: 30,
	type: $.gameQuery.ANIMATION_HORIZONTAL
});

var left = false;
var right = false;
var mr = []; //for player right missiles 
var ml = []; //left



function initPlayer() {
	$('#player')
		.addSprite('flame', {
			animation: flame, //add flame reactor
			width: 59,
			height: 32,
			posy: 646,
		})
		.addSprite('fighter', {
			animation: fighter, //add plane
			posx: 300, posy: 510, width: 95, height: 151
		})
		.addSprite('explosion', { width: 192, height: 175 });

	for (i = 1; i < 7; i++) //add missiles
	{
		$('#player')
			.addSprite('missileG' + i, {
				animation: missile,
				posy: 520 + 87 * i,
				posx: 306,
				width: 10, height: 10
			})
			.addSprite('missileD' + i, {
				animation: missile,
				posy: 520 + 87 * i,
				posx: 322,
				width: 10, height: 10
			});
		mr[i] = 10000;
		ml[i] = 10000;
	}

}

function moveMissile() {
	for (i = 1; i < 7; i++) {
		if ($("#missileG" + i).y() > 520) {
			$("#missileD" + i).x(-200, false);
			$("#missileG" + i).x(-200, false);
		}

		$("#missileG" + i).y(-15, true);
		$("#missileD" + i).y(-15, true);
		ml[i] = ml[i] - 15;
		mr[i] = mr[i] - 15;

		if ($("#missileG" + i).y() < 0 || ml[i] < 0) {
			ml[i] = 10000;
			$("#missileG" + i).y(520, false);
			$("#missileG" + i).x($("#fighter").x() + 20, false);
		}
		if ($("#missileD" + i).y() < 0 || mr[i] < 0) {
			mr[i] = 10000;
			$("#missileD" + i).y(520, false);
			$("#missileD" + i).x($("#fighter").x() + 38, false);
		}
	}
}


$(document).keydown(function (e) { // Lorsque une touche est appuyé

	switch (e.keyCode) {
		case 68: // touche D
		case 39: // touche gauche

			if ($("#fighter").x() < 625) {
				right = true;
			}
			else right = false;

			break;

		case 81: // touche Q
		case 37: // touche Droite

			if ($("#fighter").x() > -15) {
				left = true;
			}
			else left = false;
			break;

		case 32: // touche ESPACE
			// on saute
			break;

	}
});

$(document).keyup(function (f) { //Lorsque une touche est relaché

	switch (f.keyCode) {
		case 68: // touche D
		case 39: // touche gauche
			$("#fighter").setAnimation(fighter);//change l'image du joueur
			right = false;		//droite = faux
			break;

		case 81: // touche Q
		case 37: // touche droite
			$("#fighter").setAnimation(fighter);
			//change l'image du joueur
			left = false;
			break;
	}

});


function moveFighter() {
	if (right) // Si le joueur tourne a droite
	{
		if ($("#fighter").x() < 625) $("#fighter").x(15, true); // si il est dans l'aire de jeu, on décale sa position
		$("#fighter").setAnimation(fighterR); //Changement de l'image du joueur
	}
	if (left) //si le joueur tourne a droite
	{
		if ($("#fighter").x() > -15) $("#fighter").x(-15, true);
		$("#fighter").setAnimation(fighterL);
	}

	$("#flame").x($("#fighter").x() - 22, false); //affichage de l'animation du réacteur ac les coordonnées de l'avion


}

function collicionFwE() {
	collision = false;
	if (over != 0) {
		gameOver();
	}
	else {
		for (i = 1; i <= nbrEnnemy1; i++) {
			$("#fighter").collision("#badguy,#badguy" + i).each(function () {

				if ($("#fighter").x() - $("#badguy" + i).x() > -45 && $("#fighter").x() - $("#badguy" + i).x() < 80) {
					$("#hurt").setAnimation(hurt);
					end += 1;
					collision = true;
					if (end > 8) {

						$("#explosion").setAnimation(explosion);
						$("#explosion").x($("#fighter").x() - 65, false);
						$("#explosion").y($("#fighter").y() - 40, false);
						$("#fighter").x(-600, false);
						$("#fighter").hide();
						$("#explosion21").setAnimation(explosion2);
						$("#explosion21").x($("#badguy" + i).x() - 75, false);
						$("#explosion21").y($("#badguy" + i).y() - 30, false);
						$("#badguy" + i).hide();
						gameOver();

					}
				}
			});

			$("#fighter").collision("#badguy,#missileEnnemy" + i).each(function () {

				if ($("#fighter").x() - $("#missileEnnemy" + i).x() > 15 && $("#fighter").x() - $("#missileEnnemy" + i).x() < 80) {
					$("#hurt").setAnimation(hurt);
					collision = true
					end += 1;
					if (end > 6) {
						$("#explosion").setAnimation(explosion);
						$("#explosion").x($("#fighter").x() - 65, false);
						$("#explosion").y($("#fighter").y() - 40, false);
						$("#fighter").x(-600, false);
						$("#fighter").hide();
						gameOver();
					}
				}

			});

		}
		if (!collision) {
			end = 0;
			$("#hurt").setAnimation();
		}
	}

}

function gameOver() {
	if (over < 53) {
		over += 1;

	}
	else {

		var newImg = document.createElement("img");
		newImg.style.margin = "5px";
		document.getElementById("playground").appendChild(newImg);
		newImg.height = 700;
		newImg.width = 700;
		newImg.src = "assets/img/background/GameOver.jpg";
		$("#playground").click(function () {
			window.location.reload();
		});


		$("#playground").pauseGame();

	}

}