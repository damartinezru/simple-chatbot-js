

alert("Chat Bot ");
alert("Entrena tu chatbot");
window.addEventListener('load', function(){

var chat = document.getElementById("chatButton");
var no = document.getElementById("noButton");
var yes = document.getElementById("yesButton");
var txt = document.getElementById("textBox");
var confirm = document.getElementById("confirmation");
var help = document.getElementById("helpBox");
var helpBtn = document.getElementById("helpButton");
var trainingArea = document.getElementById("trainArea");
var botTalk = ["Hola, espero que estes teniendo buen dia", "Me encuentro bien, gracias", "No tengo nombre pero mis creadores se llaman Daniela, Mateo y Daniel", "42", "Fui creado en 2020","No soy humano, soy un robot"];
var divArr=[];
var delayVar=0;

function newDiv(COLOR, TEXT){
var newdiv = document.createElement("div");

newdiv.style.width = "90%";
newdiv.style.height = "10%";
newdiv.style.background = COLOR;
if(COLOR=="green"){
	newdiv.style.left="53%";
}
else{
	newdiv.style.left="47%";
}
newdiv.style.bottom="15%";
newdiv.style.position="fixed";
newdiv.style.borderRadius="10px";
newdiv.style.transform="translate(-50%,0)";
newdiv.style.paddingLeft ="10px";
newdiv.style.paddingTop ="5px";
newdiv.style.fontFamily="	Verdana, Times, serif";
newdiv.innerHTML = TEXT;
newdiv.style.border = "1px solid black";
newdiv.style.color="white";
document.body.appendChild(newdiv);

divArr.push(newdiv);

for (y=0;y<divArr.length-1;y++){
	if (divArr[y].style.bottom=="15%"){
	divArr[y].style.bottom="28%";
}
else if (divArr[y].style.bottom=="28%"){
	divArr[y].style.bottom="41%";
}
else if (divArr[y].style.bottom=="41%"){
	divArr[y].style.bottom="54%";
}
else if (divArr[y].style.bottom=="54%"){
	divArr[y].style.bottom="67%";
}
else if (divArr[y].style.bottom=="67%"){
	divArr[y].style.bottom="80%";
}
else if (divArr[y].style.bottom=="80%"){
	divArr[y].style.bottom="93%";
}
else if (divArr[y].style.bottom=="93%"){
	divArr[y].style.bottom="106%";
}
else if(divArr[y].style.bottom=="106%"){
	divArr[y].style.display="none";
}
}


}

//***********Machine learning**************
var net = new brain.NeuralNetwork();
var trainData = [];
var maxLength = 0;
var remainingLength = 0;
var newInput;
var commands = 7;

//Saludos
trainData.push({ input: [1,0,0,0,1,1,1,1,0,0,1,0,0,0], output: {[1]: 1} }); //Hola
trainData.push({ input: [1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0], output: {[1]: 1} }); //HEY
trainData.push({ input: [1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,0,1,1,1,0], output: {[1]: 1} }); //Hola
trainData.push({ input: [1,0,1,1,0,0,0,1,0,0,1,1,1,0], output: {[1]: 1} }); //Yo 
																													 
//Como estas
trainData.push({ input: [1,0,0,0,1,1,1,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1], output: {[2]: 1} }); //¿Como estas?

trainData.push({ input: [1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1,1,1,1,1,1,1], output: {[2]: 1} }); //¿Estas bien?

//Cual es tu nombre
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Cual es tu nombre?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Como es tu nombre?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Cual es tu nombre?
trainData.push({ input: [1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Tu nombre?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,1,1,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Quien eres?
trainData.push({ input: [1,0,0,1,1,0,1,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[3]: 1} }); //¿Nombre?
																																																								   
//Significado de la vida
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[4]: 1} }); //¿Cual es el siginificado de la vida?
trainData.push({ input: [1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1,1,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[4]: 1} }); //¿Significado de la vida?

//Cuantos anos tienes
trainData.push({ input: [1,0,0,0,1,1,1,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1], output: {[5]: 1} }); //¿Cuantos anos tienes?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[5]: 1} }); //¿Cual es tu edad?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[5]: 1} }); //¿Cual es tu edad?
trainData.push({ input: [1,0,1,0,1,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,0,0,1,0,0,1,1,1,1,1,1,1], output: {[5]: 1} }); //¿Tu edad?
																																																									 
//¿eres humano?
trainData.push({ input: [1,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,0,1,1,1,1,0,1,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1,1], output: {[6]: 1} }); //¿Eres humano?
trainData.push({ input: [1,0,0,0,1,1,1,1,0,1,0,1,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1,1], output: {[6]: 1} }); //¿Humano?

//Comandos para llenar los arrays con ceros. Todos los arrays deben tener la misma longitud
for (j=0;j<trainData.length;j++){
	if (trainData[j].input.length > maxLength){
		maxLength = trainData[j].input.length;
	}
}
for (q=0;q<trainData.length;q++){
	if (trainData[q].input.length < maxLength){
		remainingLength = maxLength - trainData[q].input.length;
		zeroArray = Array(remainingLength).fill(0);
		trainData[q].input = trainData[q].input.concat(zeroArray);
	}
}

//Entrenamiento
net.train(trainData, {
	log: false,
	logPeriod: 10,
	errorThresh: 0.0005,
}); //Usando toda la data para entrenar el chatbot


//Chat button
chat.addEventListener("click",function(){

if (txt.value != ""){

newDiv("green",txt.value);

var data = textToBinary(txt.value);

	var result = brain.likely(data, net);

	for (k=1;k<=botTalk.length;k++){

	if (result == k){
		delayVar=k;
		setTimeout(function(){
newDiv("orange",botTalk[delayVar-1]);

trainingArea.style.display="inline";
	
},800);
	}

	}

   help.style.display = "none";
	helpBtn.style.display = "none";
}
});

yes.addEventListener("click", function(){
	alert("Excelente!");
   	txt.value="";
   help.style.display = "none";
	helpBtn.style.display = "none";
	trainingArea.style.display="none";
})

no.addEventListener("click", function(){
	alert("Lo siento, ¿Cual podria ser una buena respuesta para tu pregunta? Por favor ponla en el campo de texto");
divArr[divArr.length-1].style.backgroundColor="#ff6666"
help.style.display = "inline";
helpBtn.style.display = "inline";
})

helpBtn.addEventListener("click", function(){
trainingArea.style.display="none";
	botTalk.push(help.value);

	newInput = textToBinary(txt.value);

trainData.push({ input: newInput, output: {[commands]: 1} }); //data de entrenamiento del usuario

commands = commands+1;

net = new brain.NeuralNetwork();

//Entrenando el chat
net.train(trainData, {
	log: false,
	logPeriod: 10,
	errorThresh: 0.0005,
});

alert("Vale! Muchas gracias por enriquecer mi conocimiento!");

	txt.value="";
	help.value="";
   help.style.display = "none";
	helpBtn.style.display = "none";
})

function textToBinary(text){
	//Almacenar todas las letras como numeros binarios para el entrnamiento del chat
text = text.toUpperCase();
	var data = [];
	
	for (i=0;i<text.length;i++){
		
		if ( text[i]=="A"){
			data = data.concat([1,0,0,0,0,0,0]);
		}
		else if (text[i]=="B"){
			data = data.concat([1,0,0,0,0,0,1]);
		}
		else if (text[i]=="C"){
			data = data.concat([1,0,0,0,0,1,0]);
		}
		else if (text[i]=="D"){
			data = data.concat([1,0,0,0,0,1,1]);
		}
		else if (text[i]=="E"){
			data = data.concat([1,0,0,0,1,0,0]);
		}
		else if (text[i]=="F"){
			data = data.concat([1,0,0,0,1,0,1]);
		}
		else if (text[i]=="G"){
			data = data.concat([1,0,0,0,1,1,0]);
		}
		else if (text[i]=="H"){
			data = data.concat([1,0,0,0,1,1,1]);
		}
		else if (text[i]=="I"){
			data = data.concat([1,0,0,1,0,0,0]);
		}
		else if (text[i]=="J"){
			data = data.concat([1,0,0,1,0,0,1]);
		}
		else if (text[i]=="K"){
			data = data.concat([1,0,0,1,0,1,0]);
		}
		else if (text[i]=="L"){
			data = data.concat([1,0,0,1,0,1,1]);
		}
		else if (text[i]=="M"){
			data = data.concat([1,0,0,1,1,0,0]);
		}
		else if (text[i]=="N"){
			data = data.concat([1,0,0,1,1,0,1]);
		}
		else if (text[i]=="O"){
			data = data.concat([1,0,0,1,1,1,0]);
		}
		else if (text[i]=="P"){
			data = data.concat([1,0,0,1,1,1,1]);
		}
		else if (text[i]=="Q"){
			data = data.concat([1,0,1,0,0,0,0]);
		}
		else if (text[i]=="R"){
			data = data.concat([1,0,1,0,0,0,1]);
		}
		else if (text[i]=="S"){
			data = data.concat([1,0,1,0,0,1,0]);
		}
		else if (text[i]=="T"){
			data = data.concat([1,0,1,0,0,1,1]);
		}
		else if (text[i]=="U"){
			data = data.concat([1,0,1,0,1,0,0]);
		}
		else if (text[i]=="V"){
			data = data.concat([1,0,1,0,1,0,1]);
		}
		else if (text[i]=="W"){
			data = data.concat([1,0,1,0,1,1,0]);
		}
		else if (text[i]=="X"){
			data = data.concat([1,0,1,0,1,1,1]);
		}
		else if (text[i]=="Y"){
			data = data.concat([1,0,1,1,0,0,0]);
		}
		else if (text[i]=="Z"){
			data = data.concat([1,0,1,1,0,0,1]);
		}
		else if (text[i]=="?"){
			data = data.concat([1,1,1,1,1,1,1]);
		}
	}
	//console.log(data.toString());

	//Llenar el array input del usuario con ceros para tener la longitud correcta
	if (data.length < maxLength){
		remainingLength = maxLength - data.length;
		zeroArray = Array(remainingLength).fill(0);
		data = data.concat(zeroArray);
	}
	return data;
}
});