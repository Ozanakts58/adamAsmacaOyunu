var language;
var category;
var word;
var imageCounter = 1;
var enteredLetters = [];

$(document).ready(function()
	{
		startDiv=document.getElementById('start');
		prepareDiv=document.getElementById('prepare');
		//var startDiv=$('#start'), prepareDiv=$('#prepare');
		prepareDiv.style.display= 'none';
		gameDiv=document.getElementById('gameArea');
		gameDiv.style.display= 'none';
		
		$("#image1")
		.css("right","0")
		for (var i = 2; i <= 7 ; i++) {
			$("#image"+i)
			.css({
				"display":"none",
				"right":"0"
			})
		}

		$("#start button")
		.hover(function(){
			$(this)
			.animate({width: "25%", height:"33%"}, 300)
		},function(){
			$(this)
			.animate({width: "23%", height:"30%"}, 300)
		})

		$("#but1")
		.click(function(){
			language = "tr";
			startDiv.style.display="none";
			prepareDiv.style.display= 'block';

			$("body")
			.css("background-color","66FFCC")

		})

		$("#but2")
		.click(function(){
			language ="eng";
			startDiv.style.display="none";
			prepareDiv.style.display= 'block';

			$("body")
			.css("background-color","66FFCC")

			$("#select")
			.html("Please select a category")

			$("#newGame")
			.html("New Game")
			selects = ["Animal", "City", "Goods", "Country", "Plant"]
			for (var i = 1; i < 6; i++) {
				$("#b"+i)
				.html(selects[i-1])			
			};		
		})

		$("#prepare button")
		.hover(function(){
			$(this)
			.animate({width: "11%", height:"9%"}, 100)
		},function(){
			$(this)
			.animate({width: "10%", height:"7%"}, 100)
		})
		.click(function(){
			category = $(this).html();
			if (category=="Hayvan") {
				word = animal();
			}else if (category=="Şehir") {
				word = city();
			}else if (category=="Eşya") {
				word = goods();
			}else if (category=="Ülke") {
				word = country();
			}else if (category=="Bitki") {
				word = plant();
			}
			for (var i = 1; i <= word.length; i++) {
				$("#h"+i)
				.css({ 'background-color': "blue",
		            "color": "yellow",
					"width": "80px",
					"height": "80px",
					"font-size": "40px",
					"font-weight": "bold",
					"text-align": "center",
					"padding-top": "30px",
					"display": "block"
			     })
		}
			prepareDiv.style.display= 'none';
			inputObject=document.getElementById('letter');
			if (language=="tr") {
				inputObject.placeholder = "Harf giriniz.";
				$("#gameText")
				.html("Bir " + category)
				$("#entered")
				.html("Girilen harfler: ")
			}
			gameArea.style.display = "block";	
		})

		$("#footer img")
		.hover(function(){
			$(this)
			.animate({width: "40px", height:"40px"}, 150)
		},function(){
			$(this)
			.animate({width: "30px", height:"30px"}, 150)
		})
		
		$("#newGame")
		.click(function(){
			gameDiv.style.display= 'none';
			prepareDiv.style.display="block";
		})

		$("#letter")
		.keyup(function(){
			letter = $(this).val();
			document.getElementById('letter').value=""; 
			evaluate(letter);
		})
		function isEntered(l){
			if (language=="tr") {	//türkçede ı-i toUpperCase ile sıkıntı oluyor.
				for (var i =0; i < enteredLetters.length-1; i++) {
					if (l=="ı" || l=="I") {		
						if (enteredLetters[i]=="ı" || enteredLetters[i]=="I") 
							return true;
					}	
					else if (l=="i" || l=="İ"){ 
						if (enteredLetters[i]=="i" || enteredLetters[i]=="İ") 
							return true;
					}
					else if (enteredLetters[i].toLowerCase() == l.toLowerCase()) 
						return true;
				}
			}else{
				for (var i =0; i < enteredLetters.length-1; i++) {
					if (enteredLetters[i].toLowerCase() == l.toLowerCase()) 
						return true;
				}
				return false;
			}
		}
	
		function evaluate(l){
			enteredLetters.push(l);
			flag = false;
			if (!isLetter(l)) {
				if (language=="tr") 
					swal("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
				else
					swal("Please enter a letter");
			}
			else if (l.length>1) {
				if (language=="tr") 
					swal("Lütfen sadece harf giriniz. Ve boş girmeyiniz")
			}
			else if(l==""){
				//Hiç bir şey yapma
			}
			else if(isEntered(l)){
				if (language=="tr") 
					swal("Lütfen girdiğiniz harfi tekrar girmeyiniz")
				else
					swal("Please don't enter the letters you have entered");
			}
			else{
				if (language=="tr") {	// Türkçede ı-i toUpperCase ile sıkıntı çıkartıyor.
					for (var i = 1; i <= word.length; i++) {
						if (l=="ı" || l=="I") {		
							if (word[i-1]=="ı" || word[i-1]=="I") {
								$("#h"+i)
								.html("ı");
								flag=true;
							};	
						}
						else if (l=="i" || l=="İ") {
							if (word[i-1]=="i" || word[i-1]=="İ") {
								$("#h"+i)
								.html("i");
								flag=true;
							};	
						}
						else if (word[i-1].toUpperCase() == l.toUpperCase()) {
							$("#h"+i)
							.html(l.toLowerCase());
							flag=true;
						}
					}
				}
				else{
					for (var i = 1; i <= word.length; i++) {
						if (word[i-1].toUpperCase() == l.toUpperCase()) {
							$("#h"+i)
							.html(l);
							flag=true;
						}
					}
				}		
				if (!flag) { //harf yoksa
					var textP = document.getElementById('entered');
					if (l=="I" || l == "ı")
						textP.innerHTML = textP.innerHTML + "  ı";
					else if (l=="İ" || l == "i")
						textP.innerHTML = textP.innerHTML + "  i";
					else
						textP.innerHTML = textP.innerHTML + "  " +l.toLowerCase();
					$("#image"+imageCounter)
					.css("display","none")
					imageCounter++;
					$("#images")
					.css("text-align","right")
					$("#image"+imageCounter)
					.css("display","inline-block")
					if (imageCounter==7) {
						gameover();
					};
				}else { //harf varsa
					var end = true;
					for (var i = 1; i <= word.length; i++) {
						var divLetter = document.getElementById('h'+i).innerHTML;
						if (divLetter.length==0) 
							end = false;
					}
					if (end) 
						won();
				}
			}
		}
		function won(){
			if (language=="tr") 
				swal("İyi iş!", "Tebrikler", "success")
			resetGame();
		}
		function gameover(){
			if (language=="tr") 
				sweetAlert("Oyun Bitti", "Kelime: "+ word, "error");
			resetGame();
		}
		function resetGame(){
			imageCounter = 1;
			$("#entered")
			.html("")
			$("#image1")
				.css("display","block")
			for (var i = 2; i <= 7 ; i++) {
				$("#image"+i)
				.css("display","none")
			}
			for (var i = 1; i <= 10; i++) {
				$("#h"+i)
				.html("")
				.css("display","none");
			}
			enteredLetters = [];
			gameDiv.style.display= 'none';
			prepareDiv.style.display="block";
		}
		function isLetter(char){	//harf girip girmediğini kontrol eden fonksiyon
			if(char=="") return true;
			var letter_pattern = /^[a-züöçğşıİÜĞÇŞÖ\s]+$/i;
			var ok = letter_pattern.test(char); 
		    if (ok)
		        return true;
		    else 
		        return false;
		}
	})
	
function city(){
	if (language=="tr") {
		array = ["İstanbul", "Eskişehir", "Ankara", "Kayseri", "Trabzon", "Bursa", "Çankırı",
		"Sinop", "Antalya", "Mersin", "İzmir", "Muğla", "Aydın", "Hakkari", "Rize", "Balıkesir", 
		"Çanakkale", "Yalova", "Samsun", "Erzincan", "Erzurum", "Karabük", "Bartın", "Denizli",
		"Diyarbakır", "Adana", "Adıyaman", "Afyon", "Malatya", "Manisa"];	
	}
	return array[Math.floor(Math.random() * 30)];
}

function animal(){
	if (language=="tr") {
		array = ["penguen", "panda", "kırlangıç", "bukalemun", "zürafa", "papağan", "zebra",
		"ördek", "kartal", "salyangoz", "maymun", "balina", "panter", "kaplan", "geyik", "kanarya", 
		"kertenkele", "karınca", "köpek", "sinek", "pire", "şahin", "eşek", "domuz", "keçi", 
		"akbaba", "koyun", "tilki", "ceylan", "çakal"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function goods(){
	if (language=="tr") {
		array = ["masa", "sandalye", "kanepe", "askı", "vazo" , "bavul", "süpürge", "pantolon",
		"bilgisayar", "halı", "lamba", "şemsiye", "sehpa", "koltuk", "minder", "avize", "tencere"
		, "ranza", "sürahi", "çaydanlık" , "bardak" , "peçete" , "havlu" , "bornoz" ,"perde"
		, "kaşık", "çatal", "bıçak", "kumanda", "fırın"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function country(){
	if (language=="tr") {
		array = ["Türkiye", "Amerika", "İngiltere", "İspanya", "Fransa", "Almanya", "İsveç", "Arjantin",
			"Brezilya", "Rusya", "Litvanya", "Yunanistan", "Şili", "Portekiz", "Danimarka", "Macaristan", 
			"Belçika", "Avusturya", "Venezuela", "Irak", "Gana", "Gürcistan", "Paraguay", 
			"Japonya", "Hollanda", "Azerbeycan", "Pakistan", "Suriye", "Romanya", "Moldova"];
	}
	return array[Math.floor(Math.random() * 30)];
}

function plant(){
	if (language=="tr") {
		array = ["nane", "kekik", "papatya", "roka", "maydanoz", "marul", "lale", "kardelen", 
			"dereotu", "fesleğen", "ıspanak", "pırasa", "lahana", "karnıbahar", "brokoli", 
			"domates", "biber", "patlıcan", "avokado", "ananas", "armut", "portakal", "greyfurt",
			 "kestane", "kivi", "kiraz", "karpuz", "şalgam", "haşhaş", "kereviz"];
	}
	return array[Math.floor(Math.random() * 30)];
}
	