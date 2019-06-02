import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    private navController: NavController,
    private geolocation: Geolocation
  ) { }

  ionicViewDidLoad() {
    this.loadMap();
  }

  public loadMap(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      const latLng = new google.maps.LatLang(position.coords.latitude, position.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  public addMarker(): void {

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    const content = `<h4>Information!</h4>`;
    this.addInfoWindow(marker, content);
  }

  public addInfoWindow(marker, content): void {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
