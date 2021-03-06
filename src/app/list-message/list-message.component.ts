import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Staticdata } from "../staticContainer";
import { ImageUrl } from "../staticContainer";
// import { Staticdata } from './../staticContainer';

@Component({
  selector: "app-list-message",
  templateUrl: "./list-message.component.html",
  styleUrls: ["./list-message.component.css"]
})
export class ListMessageComponent implements OnInit {
  // @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }

  // scrollToBottom(): void {
  //   try {
  //     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  //   } catch (err) {}
  // }

  getColor(choose) {
    switch (choose) {
      case "yes":
        return "#bfd6bf";
      case "no":
        return "#f09f9d";
      case "skip":
        return "#fbe59f";
    }
  }

  getUrl(choose, confirmed) {
    switch (choose) {
      case "yes":
        if (confirmed) {
          return "assets/images/yes-choosed.png";
        } else return "assets/images/yes-ok.png";
      case "no":
        if (confirmed) {
          return "assets/images/no-choosed.png";
        } else return "assets/images/no-ok.png";
      case "skip":
        if (confirmed) {
          return "assets/images/skip-choosed.png";
        } else return "assets/images/skip-ok.png";
    }
  }

  imageUrles = ImageUrl;
  confirm = "confirm";
  imgUrl1 = "assets/images/05-01.png";
  newObj;
  staticDataToShow = [];
  staticDataToShowFix = [];
  setClassFixed = {
    animated: true,
    lightSpeedIn: false,
    slideInLeft: true,
    "delay-2s": true,
    "display-hidden": false
  };
  setClassTop = {
    animated: true,
    fadeInUp: false,
    "delay-2s": true,
    "display-hidden": false
  };
  isShow = true;

  // staticDataToShow.push(Staticdata);
  // staticDataToShow[0]=Staticdata[0];
  staticData = Staticdata;

  // console.log("imageUrles",staticData);
  constructor() {
    // this.staticDataToShow.push(Staticdata[0]);
    this.staticDataToShowFix.push(Staticdata[0]);

    console.log("staticDataToShow", this.staticDataToShow);
    console.log("staticData", this.staticData);
    console.log("staticDataToShowFix", this.staticDataToShowFix);
  }
  findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }
  findObjectById(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === value) {
        return array[i];
      }
    }
    return null;
  }
  ngOnInit() {
    // this.scrollToBottom();
  }
  chooseFix(choose, id) {
    this.setClassFixed = {
      animated: false,
      lightSpeedIn: false,
      slideInLeft: false,
      "delay-2s": false,
      "display-hidden": false
    };
    this.setClassTop = {
      animated: false,
      fadeInUp: false,
      "delay-2s": false,
      "display-hidden": false
    };
    let objStaticData = this.findObjectById(this.staticData, id);
    let index = this.staticData.indexOf(objStaticData);

    console.log("index", index);

    // if (this.staticData[index].isNew) {

    if (choose === "confirm" && this.staticData[index].result) {
      this.staticData[index].confirmed = true;
      this.staticData[index].imgUrl = this.getUrl(
        this.staticData[index].result,
        this.staticData[index].confirmed
      );
      this.staticData[index].color = this.getColor(
        this.staticData[index].result
      );

      // if (this.staticData[index].status === "new") {
      this.setClassFixed = {
        animated: false,
        lightSpeedIn: false,
        slideInLeft: false,
        "delay-2s": false,
        "display-hidden": false
      };
      this.setClassTop = {
        animated: false,
        fadeInUp: false,
        "delay-2s": false,
        "display-hidden": false
      };
      // this.isShow=false;
      // this.staticDataToShowFix[0]=[];
      if (this.staticData[index + 1]) {
        this.staticDataToShowFix[0] = this.staticData[index + 1];
        // this.isShow=true;
        console.log("index", index + 1);
      } else {
        this.isShow = false;
        console.log(" this.isShow", this.isShow);
      }
      this.staticData[index].status = "up";
      this.staticDataToShow.unshift(this.staticData[index]);
      console.log("staticDataToShow", this.staticDataToShow);
      this.setClassFixed = {
        animated: true,
        lightSpeedIn: false,
        slideInLeft: true,
        "delay-2s": true,
        "display-hidden": false
      };
      this.setClassTop = {
        animated: true,
        fadeInUp: true,
        "delay-2s": true,
        "display-hidden": false
      };
      // this.isShow=true;
      // } else if (this.staticData[index].status === "up") {
      //   this.staticDataToShow[index] = this.staticData[index];

      // }
    } else if (choose !== "confirm") {
      this.staticData[index].result = choose;
      this.staticData[index].imgUrl = this.getUrl(
        choose,
        this.staticData[index].confirmed
      );
      // if (this.staticData[index].status === "new") {
      this.staticDataToShowFix[0] = this.staticData[index];
      // }
      //  else if (this.staticData[index].status === "up") {
      // this.staticDataToShow[index] = this.staticData[index];
      // }
    }

    if (choose === "confirm") {
      console.log("confirm");
    }
  }

  chooseUp(choose, id) {
    // this.setClassFixed={'animated':false ,'lightSpeedIn':false,'slideInLeft':false,'delay-2s':false,'display-hidden':false};
    let objStaticData = this.findObjectById(this.staticData, id);
    let objStaticDataShow = this.findObjectById(this.staticDataToShow, id);
    let index = this.staticData.indexOf(objStaticData);
    let indexShow = this.staticDataToShow.indexOf(objStaticDataShow);

    console.log("index", index);
    console.log("indexShow", indexShow);

    if (choose === "confirm") {
      this.staticData[index].confirmed = true;
      this.staticData[index].imgUrl = this.getUrl(this.staticData[index].result,this.staticData[index].confirmed);

      this.staticData[index].color = this.getColor(
        this.staticData[index].result
      );
      
      
      this.staticDataToShow[indexShow] = this.staticData[index];
    } else if (choose !== "confirm") {
      this.staticData[index].confirmed = false;
      this.staticData[index].result = choose;
      this.staticData[index].imgUrl = this.getUrl(
        choose,
        this.staticData[index].confirmed
      );
      // if (this.staticData[index].status === "new") {
      this.staticDataToShow[indexShow] = this.staticData[index];
    }

    if (choose === "confirm") {
      console.log("confirm");
    }
  }

  choosing(choose, id) {
    this.setClassFixed = {
      animated: false,
      lightSpeedIn: false,
      slideInLeft: false,
      "delay-2s": false,
      "display-hidden": false
    };
    let objStaticData = this.findObjectById(this.staticData, id);
    let index = this.staticData.indexOf(objStaticData);

    console.log("index", index);

    // if (this.staticData[index].isNew) {

    if (choose === "confirm" && this.staticData[index].result) {
      this.staticData[index].confirmed = true;
      this.staticData[index].imgUrl = this.getUrl(
        this.staticData[index].result,
        this.staticData[index].confirmed
      );
      this.staticData[index].color = this.getColor(
        this.staticData[index].result
      );

      if (this.staticData[index].status === "new") {
        this.setClassFixed = {
          animated: false,
          lightSpeedIn: false,
          slideInLeft: false,
          "delay-2s": false,
          "display-hidden": false
        };
        // this.isShow=false;
        // this.staticDataToShowFix[0]=[];
        if (this.staticData[index + 1]) {
          this.staticDataToShowFix[0] = this.staticData[index + 1];
          // this.isShow=true;
          console.log("index", index + 1);
        } else {
          this.isShow = false;
          console.log(" this.isShow", this.isShow);
        }
        this.staticData[index].status = "up";
        this.staticDataToShow.push(this.staticData[index]);
        console.log("staticDataToShow", this.staticDataToShow);
        this.setClassFixed = {
          animated: true,
          lightSpeedIn: false,
          slideInLeft: true,
          "delay-2s": true,
          "display-hidden": false
        };
        // this.isShow=true;
      } else if (this.staticData[index].status === "up") {
        this.staticDataToShow[index] = this.staticData[index];
      }
    } else if (choose !== "confirm") {
      this.staticData[index].result = choose;
      this.staticData[index].imgUrl = this.getUrl(
        choose,
        this.staticData[index].confirmed
      );
      if (this.staticData[index].status === "new") {
        this.staticDataToShowFix[0] = this.staticData[index];
      } else if (this.staticData[index].status === "up") {
        this.staticDataToShow[index] = this.staticData[index];
      }
    }

    if (choose === "confirm") {
      console.log("confirm");
    }
  }
}
