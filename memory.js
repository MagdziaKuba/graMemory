function a(){
    document.getElementById("wcisniety").disabled = true;
    const tabImg= [
        'p1.png',
        'p2.png',
        'p3.png',
        'p4.png',
        'p5.png',
        'p6.png',
        'p7.png',
        'p8.png',
        'p9.png',
        'p10.png'
    ];
    var canKlik=true;
    var tabZaznaczonych= [];
    var tabPar=[];
    var tabPar2=[];
    iloscKafelkow=20;
    var iloscRuchow=0;
    //wyswietlanie
    var score=document.getElementById("scor");
    score.innerHTML="Ilość ruchów: ";
    //tworzymy tablice z numerami par
    for(var j=0; j< this.iloscKafelkow; j++){
        tabPar[j]=Math.floor(j/2);
    }
    //mieszanie tablicy
    for(var j=0; j<tabPar.length; j++){
        var robocza=Math.floor(Math.random()*j);
        var robocza2=tabPar[j];
        tabPar[j]=tabPar[robocza];
        tabPar[robocza]=robocza2;
    }
    //tworzymy kafelki
    for(var i=0; i<iloscKafelkow ;i++){
        const para = document.createElement("DIV");
        para.classList.add("kafelek", "k");
        if(i==5 || i==10 ||i==15 || i==20){
           para.classList.add("kk");
        }
        //dodac klase stylow uniemozliwiajacych przesuwanie kafelkow DOK
        //napisac aby nie mozna bylo nacisnac start drugi raz jesli nie zniknely kafelki wszystkie dok
        //offsetWidth   offsetHeight nie działą
        para.style.left = 5+(100 +10)*(i%5) + 'px'
        para.style.top = 5+(100 +10)*(Math.floor(i/5)) + 'px';
        console.log("offsetH"+ para.offsetWidth);
        console.log("offsetW"+para.offsetHeight);
        var element = document.getElementById("div1");
        element.appendChild(para); 
        para.dataset.cardType=tabPar[i];
        para.dataset.index=i;
        para.addEventListener("click", function(e){
            if(canKlik){
                iloscRuchow=iloscRuchow+1;
                if(tabZaznaczonych.length==0 || tabZaznaczonych.length==1){
                    if(tabZaznaczonych.length==0){
                        tabZaznaczonych[0]=e.target;
                    }else if(tabZaznaczonych.length==1){
                        tabZaznaczonych[1]=e.target;
                    }
                    e.target.style.backgroundImage ='url('+ tabImg[e.target.dataset.cardType]+')';
                }
                if(tabZaznaczonych.length===2){
                    canKlik=false;
                }
                if ((tabZaznaczonych[0].dataset.cardType== tabZaznaczonych[1].dataset.cardType)&&(tabZaznaczonych[0].dataset.index!=tabZaznaczonych[1].dataset.index)){
                                                      
                           setTimeout(function(){
                            //bez remove zostają ale nie działą warunek do przycisku
                                tabZaznaczonych[0].remove();
                                tabZaznaczonych[1].remove();
                                canKlik=true;
                                tabZaznaczonych=[];
                                iloscKafelkow=iloscKafelkow-2;
                                if(iloscKafelkow==0){
                                    score.innerHTML="Ilość ruchów: "+iloscRuchow+ "GAME OWER";
                                    document.getElementById("wcisniety").disabled = false;
                                }
                            }, 500);
                } else {
                           setTimeout(function(){
                                tabZaznaczonych[0].style.backgroundImage = 'url(obr.png)';
                                tabZaznaczonych[1].style.backgroundImage = 'url(obr.png)';
                                tabZaznaczonych = [];
                                canKlik = true;
                           }, 500);
                }
                //aby nie liczylo przy nacisnieciu dwa razy na ten sam kafelek DOK
                score.innerHTML="Ilość ruchów: "+(iloscRuchow/2);
                
            }
        });
    }
}
