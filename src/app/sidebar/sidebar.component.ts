import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare var $;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private location: Location){ }

  ngOnInit(): void {
    // this.loadScript("assets/js/vendor.min.js");
    //this.loadScript("assets/js/app.min.js");
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    $(".slimscroll-menu").slimScroll({height:"auto",position:"right",size:"8px",touchScrollStep:20,color:"#9ea5ab"});
  }

  loadScript(url) {
    console.log('preparing to load...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}
  logout(){
    localStorage.clear();
    location.reload();
  } 
}
