import $ from 'jquery';
import { TweenLite } from 'gsap';
// import * as PIXI from 'pixi.js'

export const cursor = () => {

};

var wH = $(window).height();
var wW = $(window).width();
var $pointer = $('.js-mouse-pointer');
var $pointer_b = $('.js-mouse-pointer .b');
var $loading = $('.js-loading');
var prevEvent, currentEvent;
var nomalPageScroll = {
  ny: 95,
  ly: 145,
  enable: true,
  anim: {
    s: 0.6,
  }
};
var springAnim = {
  onMouseEnter: function(el) {
    alert('enter');
    var _this = this;
    _this.isready = true;
    _this.el = el;
    _this.$el = $(el);
    _this.$spring = $(el).find('.js-spring-target');
    _this.w = _this.$el.width();
    _this.h = _this.$el.height();
    _this.$el.addClass('unset');
  },
  onMouseMove: function() {
    alert('move');
    var _this = this;
    var bounds = _this.el.getBoundingClientRect();
    var x = bounds.left;
    var y = bounds.top;
    _this.tx = ((mouse.x - x) / _this.w - 0.5) * 1;
    _this.ty = ((mouse.y - y) / _this.h - 0.5) * 1;
    _this.dx = (_this.tx * 180) * Math.PI / 180;
    _this.dy = (_this.ty * 180) * Math.PI / 180;
    TweenLite.to(_this.$spring, 0.2, {
      rotation: _this.dx + 'deg',
      x: _this.dx * 10 + 'px',
      y: _this.dy * 10 + 'px',
    });
  },
  onMouseLeave: function(el) {
    alert('leave');
    var _this = this;
    _this.isready = false;
    if (_this.$spring) {
      TweenLite.to(_this.$spring, 0.6, {
        rotation: '0deg',
        x: '0px',
        y: '0px',
        ease: Elastic.easeOut.config(1.1, 0.6)
      });
    }
  },
}
var mouse = {
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  anim: {
    cx: 0,
    cy: 0,
  },
  vx: 0,
  vy: 0,
  vr: 0,
  pow: 0,
  maxpow: 200,
  onMouseMove: function() {
    var _this = this;
    TweenLite.to($pointer, 0.2, {
      x: mouse.x,
      y: mouse.y,
    });
    TweenLite.to($loading, 0.3, {
      x: mouse.x,
      y: mouse.y,
    });
  },
  onUpdate: function() {
    var _this = this;
    TweenLite.set($pointer, {
      rotation: _this.vr,
    });
    TweenLite.to($pointer, 0.2, {
      scaleX: _this.pow / _this.maxpow + 1,
    });
  }
};

$(window).on({
  mousemove: function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var cx = (x - wW / 2) / (wW / 2);
    var cy = (y - wH / 2) / (wH / 2);
    mouse.x = x;
    mouse.y = y;
    mouse.cx = cx;
    mouse.cy = cy;
    if (springAnim.isready) {
      springAnim.onMouseMove();
    }
    mouse.onMouseMove();
    TweenLite.to(mouse.anim, 2, {
      cx: cx,
      cy: cy,
    });
    currentEvent = e;
  }
});
