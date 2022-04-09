import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, set, onValue} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvPSAoWekflE4-M7fA6esq3in3B5_T33U",
    authDomain: "jogodaforcaone.firebaseapp.com",
    databaseURL: "https://jogodaforcaone-default-rtdb.firebaseio.com",
    projectId: "jogodaforcaone",
    storageBucket: "jogodaforcaone.appspot.com",
    messagingSenderId: "180637041412",
    appId: "1:180637041412:web:0e123e524f07fe1ed2c651",
    measurementId: "G-QZ2FKRND5J"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var palavra = document.querySelector('#palavra');
const btnSalvar = document.querySelector('#salvar');
const btnSortear = document.querySelector('#Sortear');
var dicionario = [];

conecta()



//

btnSalvar.addEventListener('click', verifica_se_palavra_existe);
btnSortear.addEventListener('click', DefinePalavra);
console.log(dicionario)

function InserirDado(palava){
    var tamanho = Number(dicionario.length+1);
    set(ref(db,"Palavras/" + tamanho),{
        palavra: palava
    })
    .then(()=>{
        alert('sucesso');
        document.location.reload();
    })
    .catch((error)=>{
        alert('erro: ' + error);
    })
}

function DefinePalavra(){
    var palavraSorteio = JSON.stringify(dicionario[randomizacao()]);
    palavra.value = arrumaPalavra(palavraSorteio);
        
}
   
function randomizacao(){
    var numeroMaximo = Number(dicionario.length-1)
    return Math.round(Math.random()*numeroMaximo);
}

function arrumaPalavra(palavra){
    palavra = palavra.replace('{','').replace('}','').replace('palavra','').replace(':','').replace(/[\\"]/g, '');
    palavra = palavra.toUpperCase();
    return palavra;
}

function verifica_se_palavra_existe(){
    var palavraASalvar = palavra.value;
    var numeroDePalavras = Number(dicionario.length);
    var existe = 0;
    palavraASalvar = palavraASalvar.toUpperCase();
    palavraASalvar = palavraASalvar.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    for(var x=0 ;x<numeroDePalavras;x++){
        var palavraExistente = JSON.stringify(dicionario[x]);
        palavraExistente = arrumaPalavra(palavraExistente);
        if(palavraASalvar == palavraExistente){
            existe++;
        }
    }
    if(existe==0){
        return InserirDado(palavraASalvar);
    }else{
        return alert('Essa palavra ja existe!');
    }

}

function conecta(){
    const startCountRef = ref(db,"Palavras/");
    onValue(startCountRef, (snapshot)=>{
    const sdata = snapshot.val();
        sdata.forEach(function(sdata){
            dicionario.push(sdata);
            return dicionario;
        });
    });
}


/*

            VERY IMPORTANT POW

    Realizei os códigos em fase inicial do projeto,
sendo assim o mesmo não continha uma interface web.

    Fica aqui o aviso para que altere o nome dos componentes,
são eles:
    --var palavra = document.querySelector('#palavra');
    --const btnSalvar = document.querySelector('#salvar');
    --const btnSortear = document.querySelector('#Sortear');

    Os coloquei com id, porem os mesmos devem possuir classe;

*/