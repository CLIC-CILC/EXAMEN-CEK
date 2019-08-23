/*API MARVEL*/
/*codigo del script para obtener la informacion, primero creo unas constantes de la llave publica y privada que nos da la api*/

const privatekey = '4d4481fc30049621410dd376cf14b695afca72ac',
      publickey = 'aaeba9d2a324255ca0dacef3805beb06',

/*contenedor donde se va a pintar las imagenes de marvel*/
      content = document.getElementById('content');
/*creando el metodo que nos haga la conección y nos traiga los elementos*/
var idPersonaje;
var URL2;

const getConnection = () => {
/*constante ts*/
const ts = Date.now(),
/*java script no tiene un metodo md5, por lo que se puede descargar el algoritmo que lo genere y este archivo lo llamo primero que el js*/
hash = MD5(ts + privatekey + publickey),    
/*la url donde vamos hacer la peticion de los personajes de la api de marvel*/
URL= `https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters?name=Captain%20America&ts=${ts}&apikey=${publickey}&hash=${hash}`;    
/*verificar la petición y que la promesa sea correcta*/
    fetch(URL)  
    /*con json es un metodo del objeto response que me va a traer la data y la va a formatear en json */
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero1(e);  
                idPersonaje = `${e.id}`;
                alert('--'+idPersonaje);                
                // URL2= "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters/"+idPersonaje+"/?ts="+ts+"&apikey="+publickey+"&hash="+hash+";";               
                // alert('1--'+ URL2); 
                getConnection1 (idPersonaje);      
        });      
        });           
              
};

const getConnection1 = (idPersonaje) => {
     alert('2---'+idPersonaje); 
    // /*constante ts*/
      const ts = Date.now(),

    //  /*java script no tiene un metodo md5, por lo que se puede descargar el algoritmo que lo genere y este archivo lo llamo primero que el js*/
      hash = MD5(ts + privatekey + publickey),    
    //  /*la url donde vamos hacer la peticion de los personajes de la api de marvel*/
    URL2="https://gateway.marvel.com:443/v1/public/characters/"+idPersonaje+"/comics?ts="+ts+"&apikey=d807331cdbf39818935beaaf61d8ebe9&hash="+hash;
    //  /*verificar la petición y que la promesa sea correcta*/
          fetch(URL2)
    //      /*con json es un metodo del objeto response que me va a traer la data y la va a formatear en json */
              .then(response => response.json())
              .then(response => {
                  response.data.results.forEach(c => {
                  drawHero2(c);  
              });      
              });           
      alert('url2   ---'+URL2);            
    };
    
         

   
    

// const drawHero__ = e => {
//     const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`
// /*obtenemos la data conforme a la documentación de marvel*/
//     const hero = `
//     <div class="hero ed-ite l-1-3">
//     <h3>${e.name}---88888</h3>
//       <div class="hero-img">
//         <p >${URL}</p> 
//         <img class= "thumbnail" src="${image}">
//         <p >NOMBRE :  ${e.name}</p>
//         <p >DESCRIPCION :  ${e.description}</p>
//         <p >MODIFICACION: ${e.modified}</p>        
//         <p > ${e.resourceURI}</p>    
//       </div>
//     </div>
//      `;
//     content.insertAdjacentHTML('beforeEnd',hero);
// };


const drawHero1 = e => {    
/*obtenemos la data conforme a la documentación de marvel*/
    const hero = `
    <div class="hero1 ed-ite l-1-3">
    <h3>NOMBRE : ${e.name}</h3>
      <div class="hero-img">
        <p >ID     :  ${e.id}</p>
        <p >MODIFICACION: ${e.modified}</p>        
        <p >DESCRIPCIÓN : ${e.description}</p>    
        <p >-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*</p>  
      </div>
    </div>
     `;
    content.insertAdjacentHTML('beforeEnd',hero);
};

const drawHero2 = c => {    
/*obtenemos la data conforme a la documentación de marvel*/  
    const image = `${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`  
    const hero2 = `
    <div class="hero2 ed-ite l-1-3">    
      <div class="hero2-img">     
      <img class= "thumbnail" src="${image}">
        <p >title : ${c.title}</p>        
        <p >modified: ${c.modified}</p>        
        <p >format: ${c.format}</p>    
      </div>
    </div>
     `;
    content.insertAdjacentHTML('beforeEnd',hero2);
};



getConnection();
