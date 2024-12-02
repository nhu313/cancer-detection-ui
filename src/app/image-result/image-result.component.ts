import { Component, Input } from '@angular/core';
import { MyGaugeModule } from './my-gauge.module';

@Component({
  selector: 'app-image-result',
  standalone: true,
  imports: [MyGaugeModule],
  templateUrl: './image-result.component.html',
  styleUrl: './image-result.component.css'
})
export class ImageResultComponent {
  public value: number = 1;
  public category: number = 0;
  @Input() result: any = {}

  constructor() {
    this.category = 0;
    this.value = this.category * 13;
    if (this.value == 0) {
      this.value = 1; // add a little green
    }
  }

  ngOnInit(): void {
    console.log(this.result);
  }

  gaugeColor(): string {
    if (this.value < 13) {
      return "#5ee432";
    } else if (this.value < 26) {
      return "#fffa50";
    }else if(this.value < 39) {
      return "#f7aa38";
    }else {
      return "#ef4655";
    }
  }

  getPercentage(): string {
    if (this.category == undefined) {
      this.category = 0;
    }
    return (this.category * 25) + '%';
  }

  resultLabel(): string {
    if (this.category == undefined) {
      this.category = 0;
    }
    if (this.category == 0) {
      return "No cancer detected!";
    } else if (this.category == 1) {
      return "Low cancer detected."
    } else if (this.category == 2) {
      return "Moderate cancer detected."
    } else {
      return "High cancer detected.";
    }
  }


}
