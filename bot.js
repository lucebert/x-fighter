var ennemyLife1 = 20;
var ennemySpeed1 = 4;
var missileSpeed = 7;
var nbrEnnemy1 = 3;
var ennemyRestant = 0;
var ennemyKilled = 0;
var coeff = 314;
var Score = 0;
var first = 1;

var dead = [];
var a = [];
var anime = []; //gere les animations
var ennemyLife = [];
var explosion2 = new $.gameQuery.Animation({ 
    imageURL : "fighter/Explosion2.png",
    numberOfFrame : 64, // nous avons ici 64 frames
    delta : 256, // on définit la largeur d'une frame à1920px
    rate : 30, // 30ms séparent chaque frame
    type : $.gameQuery.ANIMATION_HORIZONTAL 
	});
	
var missileEnnemy = new $.gameQuery.Animation({ 
    imageURL : "fighter/missileEnnemy2.png",
    numberOfFrame : 6, // nous avons ici 64 frames
    delta : 128, // on définit la largeur d'une frame à1920px
    rate : 30, // 30ms séparent chaque frame
    type : $.gameQuery.ANIMATION_VERTICAL 
	});
	


var badguy = new $.gameQuery.Animation({imageURL : "fighter/ennemy1.png"}); 
var badguyH = new $.gameQuery.Animation({imageURL : "fighter/ennemy1H.png"}); 

function initBot1(nbrEnnemy)
	{	

	ennemyRestant = nbrEnnemy;
	$('#infoEnnemy').text(ennemyRestant);
	$('#infoEnnemy2').text(ennemyKilled);
	$('#infoScore').text(Score); 

		for (i=first;i<=nbrEnnemy;i++) //boucle qui ajoute des ennemis à l'aire de jeu 
			{  
				$('#badguy')
				.addSprite('badguy'+i, {animation: badguy, width: 111, height: 168})
				.addSprite('explosion2'+i,{ width: 256, height: 256})
				.addSprite('missileEnnemy'+i, {animation: missileEnnemy, width: 128, height: 128});
				$("#badguy"+i).y(aleatoire(-2500,-500),false);
				$("#missileEnnemy"+i).x(-400,false);
				$("#badguy"+i).x(aleatoire(-20,500), false);
				ennemyLife[i] = ennemyLife1;
				anime[i] = 0;
				a[i] = false;
				dead[i] = false;
			}			
			
	}
	
function moveEnnemy1(){
	for (i=1; i<=nbrEnnemy1; i++)
	{	if ($("#missileEnnemy"+i).y() < 10)
		{
				$("#missileEnnemy"+i).y($("#badguy"+i).y() + 100,false);
				$("#missileEnnemy"+i).x($("#badguy"+i).x() - 25,false);
				$("#missileEnnemy"+i).css('opacity',0);
		}
		else
		{
			$("#missileEnnemy"+i).css('opacity',1);
		}
		
		if ($("#missileEnnemy"+i).y() < 800)
		{		
		$("#missileEnnemy"+i).y(missileSpeed, true);
		}
		if (dead[i] == false)
		{
			$("#badguy"+i).y(ennemySpeed1, true); // ajoute 10 a la position du fond
			$("#badguy"+i).setAnimation(badguy);//Changement de l'image de l'ennemi
			if ($("#missileEnnemy"+i).y() > 800)
			{
				$("#missileEnnemy"+i).y($("#badguy"+i).y() + 100,false);
				$("#missileEnnemy"+i).x($("#badguy"+i).x() - 25,false);
			}
			if ($("#badguy"+i).y() > 868)
			{
				$("#badguy"+i).y(aleatoire(-1000,-200),false);
				$("#badguy"+i).x(aleatoire(-20,500), false);
				$("#missileEnnemy"+i).y($("#badguy"+i).y() + 100,false);
				$("#missileEnnemy"+i).x($("#badguy"+i).x() - 25,false);
			}
		}
	}
}

function collisionMwE ()
{

	for (i=1; i<=nbrEnnemy1; i++)
	{	
	
		if (dead[i] == false)
		{
				//Collision des missiles avec l'ennemi
			if ($("#badguy"+i).y() >-168)
			{
				for(j= 1; j<7;j++)
				{		
					$("#missileG"+j).collision("#badguy,#badguy"+i).each(function(){
					Mg[j] = $("#missileD"+j).y();  //memoire de la position des missiles
					ennemyLife[i] = ennemyLife[i] - degatMissile; //décrémentation de la vie de l'ennemie
					Score += 5;
					$('#infoScore').text(Score); 
					$("#missileG"+j).x(-200,false); //permet de stoper les missiles
					$("#badguy"+i).setAnimation(badguyH);
					});
					
					$("#missileD"+j).collision("#badguy,#badguy"+i).each(function(){
					Md[j] = $("#missileG"+j).y();
					ennemyLife[i] = ennemyLife[i] - degatMissile;
					Score += 5;
					$('#infoScore').text(Score); 
					$("#missileD"+j).x(-200,false);
					$("#badguy"+i).setAnimation(badguyH); //Changement de l'image de l'ennemi
					});
				}			
			}
		
			if (ennemyLife[i] < 0)
			{
				ennemyIsDead();	
			}
		}
	}
}
			

function ennemyIsDead()			//si la vie de l'ennemie est < 0
{

	if (a[i] == false) //premet de lancer l'annimation de l'explosion q'une fois
	{
		ennemyRestant --;
		ennemyKilled ++;
		Score = Score + coeff;
		$('#infoEnnemy2').text(ennemyKilled);
		$('#infoEnnemy').text(ennemyRestant);
		$('#infoScore').text(Score); 
		$("#explosion2"+i).setAnimation(explosion2);
		$("#explosion2"+i).x($("#badguy"+i).x()-75,false);
		$("#explosion2"+i).y($("#badguy"+i).y()-30,false);				
		a[i] = true;
	}
	$("#badguy"+i).x(-500,false);
	
	if (anime[i] < 47)anime[i]++; //Permet d'afficher l'explosion
	else 
	{
		$("#explosion2"+i).x(-256,false);
		$("#explosion2"+i).setAnimation();	//libere l'annimation de l'explosion
		dead[i] = true;
		
		if(ennemyRestant == 0)
		{
			nbVague += 1;
			$('#infoVague').text(nbVague);
			ennemyLife1 += 2;
			
			for (k = 1; k<=nbrEnnemy1;k++)
			{	
				dead[k] = false;
				ennemyLife[k] = ennemyLife1;
				anime[k] = 0;
				a[k] = false;
				$("#badguy"+k).y(aleatoire(-1000,-500),false);
				$("#badguy"+k).x(aleatoire(-20,500), false);
				
				$("#missileEnnemy"+i).y($("#badguy"+i).y() + 100,false);
				$("#missileEnnemy"+i).x($("#badguy"+i).x() - 25,false);

			}
			
			first = nbrEnnemy1 + 1;
			nbrEnnemy1 += 1;
			initBot1(nbrEnnemy1);	
		}
	}					
					
}
					
	
	
