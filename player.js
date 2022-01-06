var degatMissile = 2;


var end = 0;
var over = 0;
var collision = false;
var fighter =  new $.gameQuery.Animation({imageURL : "fighter/smallfighter2.png"});
var fighterR = new $.gameQuery.Animation({imageURL : "fighter/smallfighter3.png"});
var fighterL = new $.gameQuery.Animation({imageURL : "fighter/smallfighter1.png"});

 //image joueur
var missile = new $.gameQuery.Animation({imageURL : "fighter/missile.png"}); //image missile
var flame = new $.gameQuery.Animation({ 
    imageURL : "fighter/flame_sprite.png",
    numberOfFrame : 5, // nous avons ici 5 frames
    delta : 102, // on définit la largeur d'une frame à 40px
    rate : 100, // 100ms séparent chaque frame
    type : $.gameQuery.ANIMATION_HORIZONTAL 
});    
var explosion = new $.gameQuery.Animation({ 
    imageURL : "fighter/Explosion.png",
    numberOfFrame : 64, // nous avons ici 64 frames
    delta : 192, // on définit la largeur d'une frame à1920px
    rate : 30, // 30ms séparent chaque frame
    type : $.gameQuery.ANIMATION_HORIZONTAL 
});    
	
var gauche = false; //bouléen pour tourner a gauche
var droite = false; //bouléne pour tourner a droite
var Md = []; //tableau pour les missiles
var Mg = []; //tableau pour les missiles
	
    

function initPlayer(){	
	$('#player')//groupe milieu
		.addSprite('flame', {animation: flame, //ajout de l'animation du réacteur de l'avion
		width : 59,
		height : 32, 
		posy: 646,
		})
		.addSprite('fighter',{animation: fighter, //ajout de l'avion du joueur
		posx: 300, posy: 510, width: 95, height: 151
		})	
		.addSprite('explosion',{ width: 192, height: 175});
			
	for (i=1; i<7; i++) //ajoute les missiles
	{
	$('#player')
		.addSprite('missileG'+i,{animation: missile, //ajout des missiles
		posy: 520 + 87 * i ,
		posx: 306,
		width: 10, height: 10
		})
		.addSprite('missileD'+i,{animation: missile, //ajout des missiles
		posy: 520 + 87 * i,
		posx: 322,
		width: 10, height: 10
		});
	Md[i] = 10000;	
	Mg[i] = 10000;
	}
	
}

function moveMissile()
{
		for (i=1; i<7; i++)
		{			
			if ($("#missileG"+i).y()> 520)
			{
				$("#missileD"+i).x(-200,false);
				$("#missileG"+i).x(-200,false);
			}
				
			$("#missileG"+i).y(-15, true);
			$("#missileD"+i).y(-15, true);
			Mg[i] = Mg[i] - 15; 
			Md[i] = Md[i] - 15;
			
			if ($("#missileG"+i).y() < 0 || Mg[i] < 0)
			{
				Mg[i] = 10000;	
				$("#missileG"+i).y(520, false); 
				$("#missileG"+i).x($("#fighter").x() + 20,false); 
			}
			if ($("#missileD"+i).y() < 0  || Md[i] < 0)
			{
				Md[i] = 10000;	
				$("#missileD"+i).y(520, false); 
				$("#missileD"+i).x($("#fighter").x() + 38,false); 
			}
		}
}


$(document).keydown(function(e){ // Lorsque une touche est appuyé

    switch(e.keyCode){
        case 68: // touche D
	    case 39: // touche gauche
				
			if($("#fighter").x()< 625)
			{	
			droite = true;
			}
			else droite = false;
			
        break;
		
        case 81: // touche Q
		case 37: // touche Droite
		
			if ($("#fighter").x()>-15)
			{
			gauche = true;
			}
			else gauche = false;
        break;
        
		case 32: // touche ESPACE
            // on saute
		break;

		}
	});

$(document).keyup(function(f){ //Lorsque une touche est relaché
  
    switch(f.keyCode){
        case 68: // touche D
	    case 39: // touche gauche
	  $("#fighter").setAnimation(fighter);//change l'image du joueur
		droite = false;		//droite = faux
		break;
	
	 case 81: // touche Q
	 case 37: // touche droite
	 $("#fighter").setAnimation(fighter);
		 //change l'image du joueur
		gauche = false;		
	break;
	}

});


function moveFighter()
{
	if (droite) // Si le joueur tourne a droite
	{
		if($("#fighter").x()< 625) $("#fighter").x(15,true); // si il est dans l'aire de jeu, on décale sa position
	$("#fighter").setAnimation(fighterR); //Changement de l'image du joueur
	}
	if (gauche) //si le joueur tourne a droite
	{	
		if ($("#fighter").x()>-15)$("#fighter").x(-15,true);	
     $("#fighter").setAnimation(fighterL);
	}	

	$("#flame").x($("#fighter").x() - 22,false); //affichage de l'animation du réacteur ac les coordonnées de l'avion


}

function collicionFwE()
{
	collision = false;
	if (over != 0)
	{
		gameOver();
	}
	else
	{
	for(i= 1; i<=nbrEnnemy1;i++)
		{	
			$("#fighter").collision("#badguy,#badguy"+i).each(function(){
						
			if ($("#fighter").x() - $("#badguy"+i).x() > -45 && $("#fighter").x() - $("#badguy"+i).x() < 80)
			{
			$("#hurt").setAnimation(hurt);
			end += 1;
			collision = true;
			if (end >8)
			{
				
				$("#explosion").setAnimation(explosion);
				$("#explosion").x($("#fighter").x()-65,false);
				$("#explosion").y($("#fighter").y()-40,false);
				$("#fighter").x(-600,false); 
				$("#fighter").hide();
				$("#explosion21").setAnimation(explosion2);
				$("#explosion21").x($("#badguy"+i).x()-75,false);
				$("#explosion21").y($("#badguy"+i).y()-30,false);	
				$("#badguy"+i).hide();
				gameOver();
				
			}
			}
			});
			
			$("#fighter").collision("#badguy,#missileEnnemy"+i).each(function(){
			
			if ($("#fighter").x() - $("#missileEnnemy"+i).x() > 15 && $("#fighter").x() - $("#missileEnnemy"+i).x() < 80)
			{
				$("#hurt").setAnimation(hurt);
				collision = true
				end += 1;
				if (end >6)
				{
					$("#explosion").setAnimation(explosion);
					$("#explosion").x($("#fighter").x()-65,false);
					$("#explosion").y($("#fighter").y()-40,false);
					$("#fighter").x(-600,false); 
					$("#fighter").hide();
					gameOver();
				}
			}
						
			});

		}
		if (!collision)
		{
			end = 0;
			$("#hurt").setAnimation();
		}
	}
		
}

function gameOver()
{
	if (over < 53)
	{
		over += 1;
	
	}
	else
	{
		
   	var newImg = document.createElement("img");
   	newImg.style.margin = "5px";
   	document.getElementById("playground").appendChild(newImg);
	newImg.height = 700;
	newImg.width = 700;
   	newImg.src = "bg/GameOver.jpg";
	$("#playground").click(function() {
  	window.location.reload();
	});
   
  
	$("#playground").pauseGame(); 
		
	}
	
}