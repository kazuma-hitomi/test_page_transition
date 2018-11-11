import $ from 'jquery';
import { TweenLite, POWER2 } from 'gsap';
// const CustomEase = require('./gsap/CustomEase');
import * as PIXI from 'pixi.js';

export const cursor = () => {
  cursorMovie();
};

const cursorMovie = () => {
  let GLOBAL_EASE = Power3.easeOut;
  let $html = $('html');
  let wH = $(window).height();
  let wW = $(window).width();
  let $pointer = $('.js-mouse-pointer');
  let prevEvent, currentEvent;
  let isRetina = false;
  let DEVICE_RATIO = window.devicePixelRatio;
  if (DEVICE_RATIO === 1) {
    let FILTER_RES = 1;
    let DEVICE_RATIO_SCALED = 1;
    isRetina = false;
  } else {
    let FILTER_RES = 1;
    let DEVICE_RATIO_SCALED = 1.5;
    isRetina = true;
  }
  let DEVICE_RATIO_SCALED = 1;

  let mainVisual = {
    initWebGL: function() {
      let _this = this;
      _this.height = wH;
      _this.width = wW;
      _this.app = new PIXI.Application(_this.width,_this.height,{
        resolution: DEVICE_RATIO_SCALED,
      });
      _this.loader = PIXI.loader;
      _this.loader.load(function() {
        _this.fire();
        $html.addClass('is-mv-loaded');
      });
    },
    fire: function() {
      let _this = this;
      _this.app.ticker.add(function() {
        mouse.onUpdate();
      });
    },
  };
  let springAnim = {
    onMouseEnter: function(el) {
      let _this = this;
      _this.isready = true;
      _this.el = el;
      _this.$el = $(el);
      _this.$spring = $(el).find('.js-spring-target');
      _this.w = _this.$el.width();
      _this.h = _this.$el.height();
      _this.$el.addClass('unset');
    },
    onMouseMove: function() {
      let _this = this;
      let bounds = _this.el.getBoundingClientRect();
      let x = bounds.left;
      let y = bounds.top;
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
      let _this = this;
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
  };

  $(window).on({
    load: function() {
      mainVisual.initWebGL();
    },
    mousemove: function(e) {
      let x = e.clientX;
      let y = e.clientY;
      let cx = (x - wW / 2) / (wW / 2);
      let cy = (y - wH / 2) / (wH / 2);
      mouse.x = x;
      mouse.y = y;
      mouse.cx = cx;
      mouse.cy = cy;
      if(springAnim.isready) {
        springAnim.onMouseMove();
      }
      mouse.onMouseMove();
      TweenLite.to(mouse.anim, 2, {
        cx: cx,
        cy: cy,
      });
      currentEvent = e;
    },
    mousedown: function() {
      $html.addClass('js-mousedown');
    },
    mouseup: function() {
      $html.removeClass('js-mousedown');
    },
  });

  $(document).on({
    mouseenter: function() {
      $html.addClass('js-hover');
    },
    mouseleave: function() {
      $html.removeClass('js-hover');
    }
  }, 'a,.a,.js-hletea,.fix-nav-in');

  $(document).on({
    mouseenter: function() {
      springAnim.onMouseEnter(this);
    },
    mouseleave: function() {
      springAnim.onMouseLeave(this);
    },
  }, '.js-spring');

  let mouse = {
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
      let _this = this;
      TweenLite.to($pointer, .3, {
        x: mouse.x,
        y: mouse.y,
      });
    },
    onUpdate: function() {
      let _this = this;
      TweenLite.set($pointer, {
        rotation: _this.vr,
      });
      TweenLite.to($pointer, .8, {
        scaleX: _this.pow / _this.maxpow + 1,
      });
    }
  };
  let prevSpeed = 0;
  setInterval(function() {
    if(prevEvent && currentEvent) {
      mouse.vx = currentEvent.clientX - prevEvent.clientX;
      mouse.vy = currentEvent.clientY - prevEvent.clientY;
      let d = Math.sqrt(Math.abs(mouse.vx * mouse.vx) + Math.abs(mouse.vy * mouse.vy));
      if (d < mouse.maxpow) {
        mouse.pow = d;
      } else {
        mouse.pow = mouse.maxpow;
      }
      let rad = Math.atan2(mouse.vy, mouse.vx);
      mouse.vr = rad / (Math.PI / 180);
    }
    prevEvent = currentEvent;
    prevSpeed = mouse.pow;
  }, 50);


};
