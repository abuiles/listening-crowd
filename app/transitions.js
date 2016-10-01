export default function(){
  this.transition(
    this.fromRoute('index'),
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
}
