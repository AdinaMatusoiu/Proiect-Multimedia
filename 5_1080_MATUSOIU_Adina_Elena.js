$(document).ready(function () {

	var canvas = document.getElementById("CanvasPuzzle");
	var context = canvas.getContext("2d");
	var arrayDePiese = new Array();
	var latimeaPiesei,inaltimeaPiesei,primaPiesa,adouaPiesa,imagineVariable,vechiulArray;
    var linii = 3,coloane=3;
	
    $(document)
	.on('dragover', function (e) {
		e.preventDefault();
	})
	.on('drop', function (e) {
		e.preventDefault();

		var files = e.originalEvent.dataTransfer.files;

		if (files.length > 0) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$("<img/>")
				.load(function () {
					deseneazaImaginePtPuzzle(this);
				})
				.attr({
					src: e.target.result,
					id: "puzzleimagine"
				});

			};
			reader.readAsDataURL(files[0]);

		}
	});
	
    //creare dreptunghi
	    function dreptunghi(left, top, right, bottom) {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;

		this.width = right - left;
		this.height = bottom - top;
	}

	//desenare puzzle
		function deseneazaPuzzle() {
		var i,j;
		for (i = 0; i < coloane; i++) {
			for (j = 0; j < linii; j++) {
				var r = arrayDePiese[i * linii + j];
				context.drawImage(imagineVariable, r.left, r.top, r.width, r.height, i * latimeaPiesei, j * inaltimeaPiesei, latimeaPiesei, inaltimeaPiesei);
			}
		}
	}

	function deseneazaImaginePtPuzzle(imagine) {
		var cW = imagine.width,
		cH = imagine.height;

		$("#CanvasPuzzle")
		.attr({
			width: cW,
			height: cH
		});
		imagineVariable = imagine;
		
		//creeazaPuzzle
		
		latimeaPiesei = imagineVariable.width / coloane;
		inaltimeaPiesei = imagineVariable.height / linii;

		var i, j;
		for (i = 0; i < coloane; i++) {
			for (j = 0; j < linii; j++) {
				//creeaza un nou dreptunghi si aseaza-l in array
				r = new dreptunghi(i * latimeaPiesei, j * inaltimeaPiesei, i * latimeaPiesei + latimeaPiesei, j * inaltimeaPiesei + inaltimeaPiesei);
				arrayDePiese.push(r);
			}
		}

		vechiulArray = arrayDePiese.slice();
		amesteca(arrayDePiese, 50);
		
		//deseneaza puzzle
		deseneazaPuzzle();
		//creeazaPuzzle();
		$("#CanvasPuzzle").bind("click", eventHandler);
	}



	function amesteca(ar, nr) {
		var k = 0;
		do {
			var idx1 = Math.floor(Math.random() * arrayDePiese.length);
			var idx2 = Math.floor(Math.random() * arrayDePiese.length);

			// schimba obiectele dreptunghiului la indici random
			var aux;
			aux = arrayDePiese[idx1];
			arrayDePiese[idx1] = arrayDePiese[idx2];
			arrayDePiese[idx2] = aux;

			k++;
		}while (k < nr)
	}


      var eventHandler = function (event) {

		var coordonataX,coordonataY,x,y,ind,triunghiulSelectat;
	    
		coordonataX=event.offsetX;
		coordonataY=event.offsetY;
		x = Math.floor(coordonataX / latimeaPiesei);
		y=Math.floor(coordonataY / inaltimeaPiesei);
		ind = x * coloane + y;
		triunghiulSelectat = arrayDePiese[ind];
		
		//ambele piese au fost selectate
		if (primaPiesa != undefined && adouaPiesa != undefined) {
			primaPiesa = adouaPiesa = undefined;
		}
		
		// nicio piesa nu a fost selectata
		if(primaPiesa==undefined){
			context.globalAlpha=0.2;
			context.fillRect(x*latimeaPiesei,y*inaltimeaPiesei,latimeaPiesei,inaltimeaPiesei);
			primaPiesa=triunghiulSelectat;
		}
		
		//prima piesa a fost selectata , a doua nu
         else {
		adouaPiesa = triunghiulSelectat;
		
		//schimbarePiese
	
		var aux = primaPiesa;
	    var idx1 = arrayDePiese.indexOf(primaPiesa);
		var idx2 = arrayDePiese.indexOf(adouaPiesa);

		arrayDePiese[idx1] = adouaPiesa;
		arrayDePiese[idx2] = aux;
			
		context.globalAlpha = 1;
		}

		deseneazaPuzzle();

	}
	
	$("#btnRezolvare").click(function () {
		arrayDePiese=vechiulArray.slice();
		deseneazaPuzzle();
		$("#CanvasPuzzle").unbind(click,eventHandler);
	});
	
	
})
