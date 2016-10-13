import Ember from 'ember';
import config from 'listening-crowd/config/environment';

export default Ember.Mixin.create({
  metrics: Ember.inject.service(),
  fastboot: Ember.inject.service(),
  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      let page = document.location.pathname;
      let title = this.getWithDefault('currentRouteName', 'unknown');

      if (config.environment === 'production') {
        this.get('metrics').trackPage({ page, title });
      }
    });
  },
  actions: {
    didTransition() {
      let isFastBoot = this.get('fastboot.isFastBoot');
      if (!isFastBoot) {
        this._trackPage();
      }
      return true;
    }
  }
});
