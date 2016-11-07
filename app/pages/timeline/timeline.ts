import {Component} from '@angular/core';
import {NavController, Nav} from 'ionic-angular';

import {Timeline} from '../../models/timeline.model';
import {TimelineService} from '../../services/timeline.service';
import {Helper} from '../../other/helper.component';
import {Auth} from '../../other/auth.component';
import {Common} from '../../other/common.component';
import {AuthModal} from '../../other/authModal.component';
import {MomentPipe, TimeagoPipe} from '../../other/moment.pipe';

import {TimelineCreatePage} from '../timeline/timeline-create';
import {TimelineDetailPage} from '../timeline/timeline-detail';


@Component({
  templateUrl: 'build/pages/timeline/timeline.html',
  providers: [
    Common,
    AuthModal,
  ],
  pipes: [
    TimeagoPipe,
    MomentPipe,
  ]
})
export class TimelinePage {

  //
  // constructor
  constructor(
    private auth: Auth,
    private helper: Helper,
    private nav: Nav,
    private navCtrl: NavController,
    private common: Common,
    private authModal: AuthModal,
    private timelineService: TimelineService
  ) {
  }


  //
  // on init
  ngOnInit() {
    this.timelineService.getTimelines();
  }


  //
  // go to create timeline page
  gotoTimelineCreatePage() {
    if (!this.auth.isAuth) {
      this.authModal.openAuthenticateModal();
    } else {
      this.nav.push(TimelineCreatePage);
    }
  }


  //
  // go to timeline detail
  gotoTimelineDetailPage(index: number) {
    this.nav.push(TimelineDetailPage, {index: index});
  }


  //
  // set like for timeline
  setLikeForTimeline(timeline: Timeline) {
    if (!this.auth.isAuth) {
      this.authModal.openAuthenticateModal();
    } else {
      this.timelineService.setLike(timeline)
      .then(newTimeline => {
        timeline.is_like = newTimeline.is_like;
        timeline.like_num = newTimeline.like_num;
      });
    }
  }


  //
  //
  videoPlay(event) {
    if (event.srcElement.paused) {
      event.srcElement.play();
    } else {
      event.srcElement.pause();
    }
  }


  //
  // Refresh
  doRefresh(refresher) {
    let params: any = {
      id: this.timelineService.timelines[0].id,
    }

    this.timelineService.refresh(params)
    .then(timelines => {
      refresher.complete();
    });
  }


  //
  // Infinite
  doInfinite(infiniteScroll) {
    let params: any = {
      id: this.timelineService.timelines[this.timelineService.timelines.length - 1].id,
    }

    this.timelineService.infinite(params)
    .then(timelines => {
      infiniteScroll.complete();
    });
  }
}
