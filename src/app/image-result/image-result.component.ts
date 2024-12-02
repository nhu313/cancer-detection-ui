import { Component, Input } from '@angular/core';
import { MyGaugeModule } from './my-gauge.module';
import { environment } from '../../environments/environment.development';

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
  public imagePath: string = '#5ee432';
  public color: string = '';
  public percentage: string = '';
  @Input() result: any = {category: 0, imagePath: ''}

  constructor() {}

  ngOnChanges(): void {
    console.log(this.result);
    this.imagePath = environment.api_url + '/' + this.result.file_path;
    this.value = this.result.category * 13;
    if (this.value == 0) {
      this.value = 1; // add a little green
    }
    this.color = this.gaugeColor();
    this.percentage = this.getPercentage();
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
    return "";
  }

  resultLabel(): string {
    if (this.result.category == undefined) {
      this.result.category = 0;
    }
    if (this.result.category == 0) {
      return "No cancer detected!";
    } else if (this.result.category == 1) {
      return "Low cancer detected."
    } else if (this.result.category == 2) {
      return "Moderate cancer detected."
    } else {
      return "High cancer detected.";
    }
  }


}
