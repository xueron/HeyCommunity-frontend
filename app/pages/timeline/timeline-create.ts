import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Ng2Uploader} from 'ng2-uploader/ng2-uploader';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';


@Component({
  templateUrl: 'build/pages/timeline/timeline-create.html',
  providers: [
    TimelineService,
  ],
})
export class TimelineCreatePage {
  newTimeline: {content?: string} = {};


  uploadedFiles: any[] = [];
  options: Object = {
      url: 'http://localhost:10050/upload'
  };

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadedFiles.push(data);
    }
  }

  //
  // constructor
  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private timelineService: TimelineService
  ) {
  }


  //
  // timeline create handler
  timelineCreateHandler(ngForm) {
    let data: any = {
      content: ngForm.value.content
    };

    this.timelineService.store(data)
    .then((newTimeline: Timeline) => {
      this.nav.pop();
    });
  }
}
