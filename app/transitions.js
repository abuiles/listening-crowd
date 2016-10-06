export default function(){
  this.transition(
    this.toRoute('podcasts.show'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.fromRoute('podcasts.show'),
    this.toRoute('podcasts.show.episode'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.toRoute('directory'),
    this.use('toLeft', { duration: 80, easing: 'easeInOut' })
  );
  this.transition(
    this.toRoute('index'),
    this.use('toRight', { duration: 80, easing: 'easeInOut' })
  );
}
