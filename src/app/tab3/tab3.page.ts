import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  image: string = ''; 
  location: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 }; // Initialize with default coordinates
  messageContent: string = ''; 

  constructor(private camera: Camera, private geolocation: Geolocation, private file: File) {}

  
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.error(err);
    });
  }

  
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude,
      };
    }).catch((error) => {
      console.error('Error getting location', error);
    });
  }

  
  writeFile() {
    const fileName = 'message.txt';
    const data = this.messageContent || 'No message entered.';

    this.file.writeFile(this.file.dataDirectory, fileName, data, { replace: true })
      .then(() => {
        console.log('File written successfully!');
      })
      .catch(err => {
        console.error('Error writing file', err);
      });
  }
}

