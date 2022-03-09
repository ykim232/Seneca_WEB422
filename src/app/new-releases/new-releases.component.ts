import { Component, OnInit } from '@angular/core';
import data from '../data/NewReleasesAlbums.json';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases : any;

  constructor() { this.releases = data.albums.items; }

  ngOnInit(): void {
  }

  getReleases() : any {return this.releases;}
}
