import $ from 'jquery';
import Barba from 'barba.js'

export const barba = () => {
  Barba.Pjax.start();
  Barba.Pjax.getTransition = () => {
    return FadeTransition;
  };
};

const FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },
  fadeOut: function() {
    return $(this.oldContainer).animate({
      opacity: 0
    }).promise();
  },
  fadeIn: function() {
    let _this = this;
    let $el = $(this.newContainer);
    $(this.oldContainer).hide();
    $el.css({
      visibility : 'visible',
      opacity : 0
    });
    $el.animate({ opacity: 1 }, 400, function() {
      _this.done();
    });
  }
});
