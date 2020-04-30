import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sharenian PQ - Third Stage';
  

  constructor() { }
  is_playing:boolean = false;
  showFiller = false;
  tries = 0;
  max_tries = 7;


  //Function to generate a number with digits 1, 2, 3, 4
  //Since numbers are not easily generated without specific digits like python
  //each digit is randomly generated and combined together
  generate_num() {
    var num = "";
    for (var i=0; i<4; i++){
      var digit = Math.floor(Math.random() * 4) + 1;
      num+=digit;
    }
    return num;
  }

  //Function used to compare the guess to the number
  compare_nums(number, guess){
    var cowbull = [0,0]; //incorrect, correct
    var temp_number = "";
    var temp_guess;
    for (var i=0; i<number.length(); i++){
      if (number[i] == guess[i]){
        cowbull[1]+=1;
      }
      else{
        temp_number = temp_number + number[i];
        temp_guess = temp_guess + guess[i];
      }
    }
    console.log(temp_number);
    console.log(temp_guess);
    for(var j=0; i<temp_guess.length();i++){
      if (temp_number.includes(temp_guess[j])){
        cowbull[0]+= 1;
        temp_number = temp_number.replace(temp_guess[j], "0");
        console.log(temp_number);
        console.log(temp_guess);
      }
    }
  }

  toggleplay(){
    this.is_playing = true;
  }

  submit(){
    this.tries++;
    if (this.tries == this.max_tries){
    }
  }
  ngOnInit(): void {
    const num = this.generate_num();
    console.log(num);
  }
}
