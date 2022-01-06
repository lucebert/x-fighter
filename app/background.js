var h = 700;
var w = 700;
var nbrCloud = 20;
var backgroundSpeed = 12;
var nbVague = 1;

var $playground = $('#playground');
var background = new $.gameQuery.Animation({ imageURL: "assets/img/background/sky.jpg" });
var cloud1 = new $.gameQuery.Animation({ imageURL: "assets/img/background/nuage1.png" });
var hurt = new $.gameQuery.Animation({ imageURL: "assets/img/background/hurt.jpg" });

function initBackGround() {
	$('#infoVague').text(nbVague);

	$playground.playground({
		height: h,
		width: w
	})
		//groupe arriere plan
		.addGroup('background', { height: h, width: w })
		.end() // on revient à l'objet playground
		//Groupe milieu
		.addGroup('player', { height: h, width: w }) // ajout du groupe "player"
		.end()

		.addGroup('badguy', { height: h, width: w })
		.end()
		//groupe avant plan

		.addGroup('cloud', { height: h, width: w })
		.end();

	$('#background') // on accède au groupe de l'arriere plan
		.addSprite('background1', { // ajout du fond
			animation: background, //ajout de l'image
			height: h * 2, //taille
			width: w,
			posy: -700 //position initiale
		})

		.addSprite('hurt', {
			height: h, //taille
			width: w
		});

	$("#hurt").css("opacity", 0.5); //opacité des nuages

}

function start() {
	$("#startbutton").click(function () {
		$.playground().startGame(function () {
			$("#welcomeScreen").fadeTo(1000, 0, function () { $(this).remove(); });
		});
	})
}

//Fonction qui génére un nombre aléatoire
function aleatoire(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initCloud(nbrCLoud) {
	for (i = 1; i <= nbrCloud; i++) //boucle qui ajoute des nuages à l'aire de jeu 
	{
		$('#cloud') // avant plan
			.addSprite('cloud' + i, { animation: cloud1, width: 500, height: 333, });
		$("#cloud" + i).y(aleatoire(-3000, -500), false);
		$("#cloud" + i).x(aleatoire(-500, 500), false); //corredonnée x et y aléatoire
		$("#cloud" + i).css("opacity", 0.8); //opacité des nuages
	}
}



function moveBackground() {
	$("#background1").y(backgroundSpeed, true); // ajoute 10 a la position du fond

	//Test si cette position est > 0
	if ($("#background1").y() > 0) {
		$("#background1").y(-700, false); //réinitialisation du fond

	}
}
function moveCloud(nbrCLoud) {
	for (i = 1; i <= nbrCloud; i++) //Boucle qui permet d'afficher les nuages aléatoire
	{
		$("#cloud" + i).y(4, true); //ajout de 8 à la position du nuage

		if ($("#cloud" + i).y() > 700) //si le nuage est passé
		{
			$("#cloud" + i).y(aleatoire(-500, -3000), false);
			$("#cloud" + i).x(aleatoire(-500, 500), false); //réinitalisation de x
		}
	}
}