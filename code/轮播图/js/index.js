/**
 * @file fsBanner.js 背景切换
 * @author 
 * @par Copyright (c):
 *
 * **/
var fsBanner = {
    /**
     *  {data JSON对象数据的封装}
     * **/
    data: {
    	currentImg: 0,
    	bannerImgs: '', // 图片控件
    	imgSum: 0,
    	reverseOrder: false,
    	parentID: 'fsBanner',
    	speed: 1500, // 渐变持续时间；不可能为0
    	interval: 1500, // 图片多久切换
    	initPlayTime: 1500, // 初始轮播时间
    	type: 1, // 轮播类型
    	zIndex: 999,
    	autoplay: true, // 自动轮播
    },
    /**
     *  {init 初始化}
     * **/
    init: function(opts) {
    	var that = this;
    	$.extend(true, that.data, opts || {});
    	that.data.bannerImgs = $("#"+that.data.parentID).children('img');
	    that.data.imgSum = that.data.bannerImgs.length;
        for (i = 0; i < that.data.imgSum; i++) {
            that.data.bannerImgs.eq(i).css({ 'z-index': (that.data.zIndex + that.data.imgSum - i) });
        }
        // 需要多久才开始轮播
        setTimeout(function() {
            that.whichOne();
        }, that.data.initPlayTime);
        return that;
    },
    /**
     *  {picFadeIn 自动轮播 --淡入淡出}
     * **/
    picFadeIn: function() {
    	var that = this;
    	that.data.bannerImgs.eq(that.data.currentImg).fadeOut(that.data.speed);
        that.data.currentImg = (that.data.reverseOrder ? (that.data.currentImg - 1) : (that.data.currentImg + 1)) % that.data.imgSum;
        that.data.bannerImgs.eq(that.data.currentImg).fadeIn(that.data.speed);
        if (that.data.autoplay) {
	        setTimeout(function() {
	            that.picFadeIn();
	        }, that.data.interval);
	    }
	    return that;
    },
    /**
     *  {picRightToLeft 自动轮播 --从右往左}
     * **/
    picRightToLeft: function() {
    	var that = this;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("left", 0).animate({left: '-100%'}, that.data.speed);
        that.data.currentImg = (that.data.reverseOrder ? (that.data.currentImg - 1) : (that.data.currentImg + 1)) % that.data.imgSum;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("left", '100%').animate({left: 0}, that.data.speed);
        if (that.data.autoplay) {
        	setTimeout(function() {
	            that.picRightToLeft();
	        }, that.data.interval);
        }
        return that;
    },
    /**
     *  {picLeftToRight 自动轮播 --从左往右}
     * **/
    picLeftToRight: function() {
    	var that = this;
    	that.data.bannerImgs.eq(that.data.currentImg).stop().css("left", 0).animate({left: '100%'}, that.data.speed);
        that.data.currentImg = (that.data.reverseOrder ? (that.data.currentImg - 1) : (that.data.currentImg + 1)) % that.data.imgSum;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("left", '-100%').animate({left: 0}, that.data.speed);
        if (that.data.autoplay) {
	        setTimeout(function() {
	            that.picLeftToRight();
	        }, that.data.interval);
	    }
	    return that;
    },
    /**
     *  {picBottomToTop 自动轮播 --从下往上}
     * **/
    picBottomToTop: function() {
    	var that = this;
		that.data.bannerImgs.eq(that.data.currentImg).stop().css("top", 0).animate({top: '-100%'}, that.data.speed);
        that.data.currentImg = (that.data.reverseOrder ? (that.data.currentImg - 1) : (that.data.currentImg + 1)) % that.data.imgSum;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("top", '100%').animate({top: 0}, that.data.speed);
	    if (that.data.autoplay) {
	        setTimeout(function() {
	            that.picBottomToTop();
	        }, that.data.interval);
	    }
	    return that;
    },
    /**
     *  {picTopToBottom 自动轮播 --从上往下}
     * **/
    picTopToBottom: function() {
    	var that = this;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("top", 0).animate({top: '100%'}, that.data.speed);
        // 上一张图片 或 下一张图片
        that.data.currentImg = (that.data.reverseOrder ? (that.data.currentImg - 1) : (that.data.currentImg + 1)) % that.data.imgSum;
        that.data.bannerImgs.eq(that.data.currentImg).stop().css("top", '-100%').animate({top: 0}, that.data.speed);
        if (that.data.autoplay) {
	        setTimeout(function() {
	            that.picTopToBottom();
	        }, that.data.interval);
	    }
	    return that;
    },
    whichOne: function() {
    	var that = this;
		switch (that.data.type) {
            case 1:
                that.picFadeIn();
                break;
            case 2:
                that.picRightToLeft();
                break;
            case 3:
                that.picLeftToRight();
                break;
            case 4:
                that.picBottomToTop();
                break;
            case 5:
                that.picTopToBottom();
                break;
            default:
                that.picFadeIn();
        }
    },
    /**
     *  {next 下一张图片}
     * **/
    next: function() {
    	var that = this;
    	that.whichOne();
    	return that;
    },
    /**
     *  {prev 上一张图片}
     * **/
    prev: function() {
    	var that = this;
    	that.data.reverseOrder = true;
    	switch (that.data.type) {
            case 1:
                that.picFadeIn();
                break;
            case 2:
                // that.picRightToLeft();
                that.picLeftToRight();
                break;
            case 3:
                // that.picLeftToRight();
                that.picRightToLeft();
                break;
            case 4:
                // that.picBottomToTop();
                that.picTopToBottom();
                break;
            case 5:
                // that.picTopToBottom();
                that.picBottomToTop();
                break;
            default:
                that.picFadeIn();
        }
        that.data.reverseOrder = false;
        return that;
    }
}

$(document).ready(function() {
	var tt = fsBanner.init({
		type: 5
	});
	console.log(tt);
});