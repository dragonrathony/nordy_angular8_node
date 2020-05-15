import { Component } from '@angular/core';
import { CommonServiceService } from './commonservices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(public commonSer: CommonServiceService) {
  }
// ngOnInit(): void {
//   // this.loadScript("assets/js/vendor.min.js");
//   // this.loadScript("assets/js/app.min.js");
// }
//   loadScript(url) {
//     console.log('preparing to load...')
//     let node = document.createElement('script');
//     node.src = url;
//     node.type = 'text/javascript';
//     node.async = true;
//     node.charset = 'utf-8';
//     document.getElementsByTagName('head')[0].appendChild(node);
// }
}
