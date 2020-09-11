import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';
import { generate } from 'rxjs';
import {FormControl} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { OverlayService } from './services/overlay.service';
import { OverlayReference } from './services/overlayreference';
import { DomSanitizer } from '@angular/platform-browser';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { HistoryComponent } from './components/history/history.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Sharenian PQ - Third Stage';

  @ViewChild('historycontainer', {read: ViewContainerRef}) entry: ViewContainerRef;
  
  items = [
    {value: '1', viewValue: 'Medal of Valor', img: 'assets/medal.jpg'},
    {value: '2', viewValue: 'Scroll of Wisdom', img: 'assets/scroll.jpg'},
    {value: '3', viewValue: 'Spoiled Food', img: 'assets/food.jpg'},
    {value: '4', viewValue: 'Jr. Necki Drink', img: 'assets/wine.jpg'}
  ]

  constructor(private previewDialog: OverlayService, private sanitizer: DomSanitizer, private resolver: ComponentFactoryResolver) { }
  is_playing:boolean = false;
  tries = 0;
  max_tries = 7;
  num:string;
  try_submitted:boolean = false
  history = "";
  componentList: any[] =[];

  output_text:String = "";

  item1 = this.items[1][1];
  item2 = this.items[1][1];
  item3 = this.items[1][1];
  item4 = this.items[1][1];

  //Resets game and destroys all components dynamically loaded.
  private reset_game(){
    this.is_playing = false;
    this.tries = 0;
    this.item1 = undefined;
    this.item2 = undefined;
    this.item3 = undefined;
    this.item4 = undefined;
    this.componentList.forEach((comp) => comp.destroy());
    //console.log(this.componentList.length);
    this.entry.clear();
  }
  //Function to generate a number with digits 1, 2, 3, 4
  //Since numbers are not easily generated without specific digits like python
  //each digit is randomly generated and combined together
  private generate_num() {
    var num = "";
    for (var i=0; i<4; i++){
      var digit = Math.floor(Math.random() * 4) + 1;
      num+=digit;
    }
    return num.toString();
  }

  //Function used to compare the guess to the number
  private compare_nums(number, guess){
    //console.log(typeof number);
    //console.log(typeof guess);
    //console.log("my number = " + number)
    //console.log("my guess = " + guess);
    var cowbull = [0,0]; //incorrect, correct
    var temp_number = "";
    var temp_guess = "";
    //console.log(number.length);
    for (var i=0; i<number.length; i++){
      if (number[i] == guess[i]){
        cowbull[1]+=1;
      }
      else{
       // console.log("BLAH BLAH")
        //console.log("number[i] = " + number[i]);
        //console.log("guess[i] = " + guess[i]);
        temp_number = temp_number + number[i];
        temp_guess = temp_guess + guess[i];
        //console.log("tempnumber = " + temp_number)
        //console.log("tempguess = " + temp_guess)
      }
    }
    //console.log("Outside loop tempnumber = " +temp_number);
    //console.log("outside loop tempnumber = " +temp_guess);
    for(var j=0; j<temp_guess.length;j++){
      //console.log("For loop temp_guess at j:" + temp_guess[j])
      if (temp_number.includes(temp_guess[j])){
        cowbull[0]+= 1;
        temp_number = temp_number.replace(temp_guess[j], "0");
        //console.log("temp_number in j loop = " + temp_number);
        //console.log(temp_guess);
      }
    }
    //console.log(cowbull);
    return cowbull;
  }

  //Toggles the Play button.
   toggleplay(){
    this.is_playing = true;
    this.num = this.generate_num();
    //this.num = "2232"
    //this.num = "1134"
    this.try_submitted = false;
    //console.log(this.num);
  }

  //function to check if no value was selected in the drop down.
  private check_undefined(){
    //console.log("Hello")
    if(typeof this.item1 === "undefined" || typeof this.item2 === "undefined" || typeof this.item3 === "undefined" || typeof this.item4 === "undefined"){
      //console.log("Undefined")
      return true
    }
    else{
      return false
    }
  }

  submit(){
    this.output_text = "";
    this.try_submitted = true;
    //console.log(this.item1)
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
        //console.log("No Vassal Knows Of This Offering\n")
        this.output_text += "No Vassal Knows Of This Offering"
        this.add_history()
      }
      else{
        if (cowbullcount[1] != 0){
          //console.log(cowbullcount[1].toString() + "  Agreed That The Offering Is Correct")
          this.output_text += cowbullcount[1].toString() + " Agreed That The Offering Is Correct"
        }
        if (cowbullcount[0] != 0){
          //console.log(cowbullcount[0].toString() + " Have Declared The Offering Incorrect")
          this.output_text += "\n" + cowbullcount[0].toString() + " Have Declared The Offering Incorrect"
        }
        if (cowbullcount[0] + cowbullcount[1] != 4){
          //console.log(4-cowbullcount[0]-cowbullcount[1] + " Have Said It's An Unknown Offering")
          this.output_text += "\n" + (4-cowbullcount[0]-cowbullcount[1]) + " Have Said It's An Unknown Offering"
        }
        this.add_history()
      }
      if (cowbullcount[1] == 4){
        this.output_text = "";
        //console.log("You won after " + this.tries.toString() + " tries! The number was "+ this.num);
        this.output_text += "You won after " + this.tries.toString() + " tries! The number was "+ this.num + "\n"
        this.reset_game();
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

  private check_item(item){
    //console.log(item);
    if(item == 1){
      return 'assets/medal.jpg'
    }
    else if(item == 2){
      return 'assets/scroll.jpg'
    }
    else if (item == 3) {
      return 'assets/food.jpg'
    }
    else if (item == 4) {
      return 'assets/wine.jpg'
    }
    else{
      return ''
    }
  }

  private add_history(){
    const factory = this.resolver.resolveComponentFactory(HistoryComponent);
    const componentRef = this.entry.createComponent(factory);
    this.componentList.push(componentRef);
    //console.log(this.componentList.length)
    componentRef.instance.item1 = this.check_item(this.item1);
    componentRef.instance.item2 = this.check_item(this.item2);
    componentRef.instance.item3 = this.check_item(this.item3);
    componentRef.instance.item4 = this.check_item(this.item4);
    
    var temp_answer = this.output_text;
    var answers = temp_answer.split("\n")
    if (answers.length == 1){
      componentRef.instance.answer1 = answers[0].toString();
      componentRef.instance.answer2 = "";
      componentRef.instance.answer3 = "";
    } else if (answers.length == 2){
      componentRef.instance.answer1 = answers[0].toString();
      componentRef.instance.answer2 = answers[1].toString();
      componentRef.instance.answer3 = "";
    } else if (answers.length == 3){
      componentRef.instance.answer1 = answers[0].toString();
      componentRef.instance.answer2 = answers[1].toString();
      componentRef.instance.answer3 = answers[2].toString();;
    } else {
      componentRef.instance.answer1 = "";
      componentRef.instance.answer2 = "";
      componentRef.instance.answer3 = "";
    }
    componentRef.instance.attempt = this.tries;
    //console.log(temp_answer.toString())
    componentRef.changeDetectorRef.detectChanges();
  }

  show_instructions(){
    let dialog_ref: OverlayReference = this.previewDialog.open();
  }

  ngOnInit(): void {

    
  }
}
