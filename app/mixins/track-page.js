import Ember from 'ember';
import config from 'listening-crowd/config/environment';

export default Ember.Mixin.create({
  metrics: Ember.inject.service(),
  fastboot: Ember.inject.service(),
  didTransition() {
    this._super(...arguments);
    let isFastBoot = this.get('fastboot.isFastBoot');
    if (!isFastBoot) {
      this._trackPage();
    }
  },
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      let page = document.location.pathname;
      let title = this.getWithDefault('currentRouteName', 'unknown');

      if (config.environment === 'production') {
        this.get('metrics').trackPage({ page, title });
      }
    });
  }
});
