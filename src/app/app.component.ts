import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';
import {FormControl} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sharenian PQ - Third Stage';
  
  items = [
    {value: '1', viewValue: 'Medal of Valor', img: '../assets/medal.jpg'},
    {value: '2', viewValue: 'Scroll of Wisdom', img: '../assets/scroll.jpg'},
    {value: '3', viewValue: 'Spoiled Food', img: '../assets/food.jpg'},
    {value: '4', viewValue: 'Jr. Necki Drink', img: '../assets/wine.jpg'}
  ]

  constructor() { }
  is_playing:boolean = false;
  tries = 0;
  max_tries = 7;
  num:number;
  try_submitted:boolean = false

  output_text:String = "";

  item1 = this.items[1][1];
  item2 = this.items[1][1];
  item3 = this.items[1][1];
  item4 = this.items[1][1];

  reset_game(){
    this.is_playing = false;
    this.tries = 0;
    this.item1 = undefined;
    this.item2 = undefined;
    this.item3 = undefined;
    this.item4 = undefined;
  }
  //Function to generate a number with digits 1, 2, 3, 4
  //Since numbers are not easily generated without specific digits like python
  //each digit is randomly generated and combined together
  generate_num() {
    var num = "";
    for (var i=0; i<4; i++){
      var digit = Math.floor(Math.random() * 4) + 1;
      num+=digit;
    }
    return num.toString();
  }

  //Function used to compare the guess to the number
  compare_nums(number, guess){
    console.log(typeof number);
    console.log(typeof guess);
    console.log("my number = " + number)
    console.log("my guess = " + guess);
    var cowbull = [0,0]; //incorrect, correct
    var temp_number = "";
    var temp_guess = "";
    console.log(number.length);
    for (var i=0; i<number.length; i++){
      if (number[i] == guess[i]){
        cowbull[1]+=1;
      }
      else{
        console.log("BLAH BLAH")
        console.log("number[i] = " + number[i]);
        console.log("guess[i] = " + guess[i]);
        temp_number = temp_number + number[i];
        temp_guess = temp_guess + guess[i];
        console.log("tempnumber = " + temp_number)
        console.log("tempguess = " + temp_guess)
      }
    }
    console.log(temp_number);
    //console.log(temp_guess);
    for(var j=0; i<temp_guess.length;i++){
      if (temp_number.includes(temp_guess[j])){
        cowbull[0]+= 1;
        temp_number = temp_number.replace(temp_guess[j], "0");
        console.log("temp_number in j loop = " + temp_number);
        //console.log(temp_guess);
      }
    }
    console.log(cowbull);
    return cowbull;
  }

  toggleplay(){
    this.is_playing = true;
    //this.num = this.generate_num();
    this.num = 2111
    this.try_submitted = false;
    //console.log(this.num);
  }

  check_undefined(){
    console.log("Hello")
    if(typeof this.item1 === "undefined" || typeof this.item2 === "undefined" || typeof this.item3 === "undefined" || typeof this.item4 === "undefined"){
      console.log("Undefined")
      return true
    }
    else{
      return false
    }
  }

  submit(){
    this.output_text = "";
    this.try_submitted = true;
    console.log(this.item1)
    if (this.check_undefined()){
      this.output_text += "You have not put all the offerings. Set the offerings before continuing!"
    }
    else{
      this.tries++;
      this.output_text = "";
      var inc_value = this.item1 + this.item2 + this.item3+ this.item4;
      //console.log(inc_value);
      var cowbullcount = this.compare_nums(this.num.toString(),inc_value)
      if ((cowbullcount[0] + cowbullcount[1]) == 0){
        console.log("No Vassal knows of this offering\n")
        this.output_text += "No Vassal knows of this offering\n"
      }
      else{
        if (cowbullcount[1] != 0){
          console.log(cowbullcount[1].toString() + "  agreed that the offering is correct")
          this.output_text += cowbullcount[1].toString() + " agreed that the offering is correct\n"
        }
        if (cowbullcount[0] != 0){
          console.log(cowbullcount[0].toString() + " have declared the offering incorrect")
          this.output_text += cowbullcount[0].toString() + " have declared the offering incorrect\n"
        }
        if (cowbullcount[0] + cowbullcount[1] != 4){
          console.log(4-cowbullcount[0]-cowbullcount[1] + " have said it's an unknown offering")
          this.output_text += 4-cowbullcount[0]-cowbullcount[1] + " have said it's an unknown offering\n"
        }
      }
      if (cowbullcount[1] == 4){
        this.reset_game();
        this.output_text = "";
        console.log("You won after " + this.tries.toString() + " tries! The number was "+ this.num);
        this.output_text += "You won after " + this.tries.toString() + " tries! The number was "+ this.num + "\n"
      }
      else{
        if (this.tries == this.max_tries){
          this.output_text = "";
          this.reset_game();
          this.output_text += "You have failed! Press play to try again!"
        }
      };
    }
  }

  add_history(){

  }

  ngOnInit(): void {

    
  }
}
