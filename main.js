const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}



//Type Method
TypeWriter.prototype.type = function() {
    /*console.log('Hello');*/
    //Current Index of word
    const current = this.wordIndex % this.words.length;
   //get full text of current word
   const fullTxt = this.words[current];

    //console.log(fullTxt);
    //Check if deleting
    if (this.isDeleting) {
        //Remove a character
        this.txt = fullTxt.substring(0, this.txt.length -1);
    }else{
        //add character
        this.txt = fullTxt.substring(0, this.txt.length +1);
    }

    //Output every half a second insert txt into element -- type the first word
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;//Template literal

    //Type speed -- when its deleting its going to be faster its going to be dynamic so we used let
    let typeSpeed = 300;
    
    if(this.isDeleting){
        typeSpeed /= 2 //is like typesped = typespeed /2

    }
    //if words is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait; // this is going to pause at end
        //Set isDeleting to true
        this.isDeleting = true;

    } //this is going to set to the next word
    else if(this.isDeleting && this.txt === '')  {
        this.isDeleting = false;
        //move to the next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500; // will give typing fast deleting then typing faster
    }


    setTimeout(() => this.type(), typeSpeed)
}

//Init on DOM load

document.addEventListener('DOMContentLoaded', init);

//Init App

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait= txtElement.getAttribute('data-wait');
    //Init typewriter
    new TypeWriter(txtElement, words, wait);
}




//ES6 Class
// instead of using prototype we need to create a
//constructor is a method that runs when it is instantiated from the class
//Learned how to apply this coding through Traversy media :) 