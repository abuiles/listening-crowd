import Ember from 'ember';
import Quill from 'npm:quill/dist/quill';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    var toolbarOptions = [
      [{ 'header': [2, 3, 4, false] }],
      ['bold', 'italic', 'underline'],    // toggled buttons
      ['blockquote', 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],      // outdent/indent
      ['video'],
      [{ 'color': [] }, { 'background': [] }],      // dropdown with defaults from theme
      [{ 'align': [] }],
      [{ 'direction': 'rtl' }]                     // text direction

      ['clean']                          // remove formatting button
    ];

    let options = {

    };

    if (this.get('readOnly')) {
      options.modules = {
        toolbar: this.$('.toolbar')[0]
      };
      options.readOnly = true;
    } else {
      options.theme = 'snow';
      options.modules = {
        toolbar: toolbarOptions,
        history: {
          delay: 2000,
          maxStack: 500
        }
      };
    }

    let container = this.$('.editor')[0];
    let quill = new Quill(container, options);

    this.set('quill', quill);

    if (this.get('deltas')) {
      Ember.run.next(() => {
        quill.setContents(this.get('deltas'));
      });
    } else {
      quill.on('text-change', (delta, oldDelta, source) => {
        if (this.textChanged) {
          this.textChanged(this.get('quill').getContents());
        }
      });
    }
  }
});
