////////////////////////////////
// Author: Bora DAN — http://codecanyon.net/user/bqra
// 18 August 2013
// E-mail: bora_dan@hotmail.com
////////////////////////////////

$(function () {    
    (function ($) {
        $.fn.jalendar = function (options) {
            
            var settings = $.extend({
                customDay: new Date(),
                color: '#65c2c0',
                lang: 'EN'
            }, options);
            
            // Languages            
            var dayNames = {};
            var monthNames = {};
            var lAddEvent = {};
            var lAllDay = {};
            var lTotalEvents = {};
            var lEvent = {};
            dayNames['EN'] = new Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
            dayNames['TR'] = new Array('Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr');
            dayNames['ES'] = new Array('Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Såb', 'Dom');
            monthNames['EN'] = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'); 
            monthNames['TR'] = new Array('Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'); 
            monthNames['ES'] = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'); 
            lAddEvent['EN'] = 'Add New Event';
            lAddEvent['TR'] = 'Yeni Etkinlik Ekle';
            lAddEvent['ES'] = 'Agregar Un Nuevo Evento';
            lAllDay['EN'] = 'All Day';
            lAllDay['TR'] = 'Tüm Gün';
            lAllDay['ES'] = 'Todo El Día';
            lTotalEvents['EN'] = 'Total Events in This Month: ';
            lTotalEvents['TR'] = 'Bu Ayki Etkinlik Sayısı: ';
            lTotalEvents['ES'] = 'Total De Eventos En Este Mes: ';
            lEvent['EN'] = 'Event(s)';
            lEvent['TR'] = 'Etkinlik';
            lEvent['ES'] = 'Evento(s)';
            
            
            var $this = $(this);
            // div 函数用于生成html div（附带class name）
            var div = function (e, classN) {
                return $(document.createElement(e)).addClass(classN);
            };
            
            var clockHour = [];
            var clockMin = [];
            for (var i=0;i<24;i++ ){
                clockHour.push(div('div', 'option').text(i))
            }
            for (var i=0;i<59;i+=5 ){
                clockMin.push(div('div', 'option').text(i))
            }
            
            // HTML Tree
            $this.append(
                div('div', 'wood-bottom'),      // 背景div
                // 主体 div
                div('div', 'jalendar-wood').append(
                    div('div', 'close-button'),       // 关闭按钮

                    // 日历主体（页面左侧）
                    div('div', 'jalendar-pages').append(
                        div('div', 'pages-bottom'),    // 日历底部（装饰）
                        // 日历头部（月份、年份）
                        div('div', 'header').css('background-color', settings.color).append(
                            div('a', 'prv-m'),
                            div('h1'),
                            div('a', 'nxt-m'),
                            div('div', 'day-names')
                        ),                          
                        //月份事件总数记录 Total Events in This Month
                        div('div', 'total-bar').html( lTotalEvents[settings.lang] + '<b style="color: '+settings.color+'"></b>'),
                        // 每月的天数
                        div('div', 'days')
                    ),

                    // 事件主体（页面右侧）
                    div('div', 'add-event').append(
                        // 添加新事件（上面）
                        div('div', 'add-new').append(
                            //输入框
                            '<input type="text" placeholder="' + lAddEvent[settings.lang] + '" value="' + lAddEvent[settings.lang] + '" />',
                            div('div', 'submit'),    // 提交按钮
                            div('div', 'clear'),     // 清楚事件功能未设置
                            // 添加时间
                            div('div', 'add-time').append(
                                div('div', 'disabled'),
                                div('div', 'select').addClass('hour').css('background-color', settings.color).append(
                                    div('span').text('00'),
                                    div('div', 'dropdown').append(clockHour)
                                ),
                                div('div', 'left').append(':'),
                                div('div', 'select').addClass('min').css('background-color', settings.color).append(
                                    div('span').text('00'),
                                    div('div', 'dropdown').append(clockMin)
                                )
                            ),
                            // 设置时间为：ALL Day
                            div('div', 'all-day').append(
                                div('fieldset').attr('data-type','disabled').append(
                                    div('div', 'check').append(
                                        div('span', '')
                                    ),
                                    div('label').text(lAllDay[settings.lang])
                                )
                            ),
                            div('div', 'clear')   // 清楚事件功能未设置
                        ),
                        // 事件展示（下面）
                        div('div', 'events').append(
                            //  事件计数：Event(s)
                            div('h3','').append(
                                div('span', '').html('<b></b> ' + lEvent[settings.lang])
                            ),
                            div('div', 'gradient-wood'),    // 底部样式木材（装饰）；样式设置了position: absolute;
                            div('div', 'events-list')     // 事件列表（主体部分）
                        )

                    )        
                    // 结束：事件主体（页面右侧）

                )
            );
            
            // 添加每月天数boxes  Adding day boxes
            for (var i = 0; i < 42; i++) {
                $this.find('.days').append(div('div', 'day'));
            }
            
            // 加载星期名字字段 Adding day names fields
            for (var i = 0; i < 7; i++) {
                $this.find('.day-names').append(div('h2').text(dayNames[settings.lang][i]));
            }

            var d = new Date(settings.customDay);  //获当前时间：Tue Dec 27 2016 15:35:44 GMT+0800 (中国标准时间) 
            console.log(d);
            var year = d.getFullYear(); 
            var date = d.getDate();
            var month = d.getMonth();
            
            // 判断是否是闰年，闰年2月只有29天
            var isLeapYear = function(year1) {
                var f = new Date();
                f.setYear(year1);
                f.setMonth(1);
                f.setDate(29);
                return f.getDate() == 29;
            };
        
            var feb;    // 二月的天数：28或29
            var febCalc = function(feb) { 
                if (isLeapYear(year) === true) { feb = 29; } else { feb = 28; } 
                return feb;
            };
            var monthDays = new Array(31, febCalc(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);   // 1-12月月份的天数

            function calcMonth() {

                monthDays[1] = febCalc(feb);   // 二月的天数：28或29
                
                var weekStart = new Date();                 
                weekStart.setFullYear(year, month, 0);  //设置开始的星期：Wed Nov 30 2016 15:44:23 GMT+0800 (中国标准时间)
                // 当前时间：Tue Dec 27 2016 15:45:45 GMT+0800 (中国标准时间)
                var startDay = weekStart.getDay(); // 3（即星期三 Wed）
                
                // 设置日历头部显示的时间
                $this.find('.header h1').html(monthNames[settings.lang][month] + ' ' + year);  
        
                $this.find('.day').html('&nbsp;');
                $this.find('.day').removeClass('this-month');
                // 设置该月天数boxes，添加class name参数：this-month、data-date
                for (var i = 1; i <= monthDays[month]; i++) {
                    startDay++;
                    $this.find('.day').eq(startDay-1).addClass('this-month').attr('data-date', i+'/'+(month+1)+'/'+year).html(i);
                }

                if ( month == d.getMonth() ) {
                    // 使用eq(date-1)来设置 当前日的样式
                    $this.find('.day.this-month').removeClass('today').eq(date-1).addClass('today').css({"color":settings.color,"background-color":"beige",});
                } else {
                    $this.find('.day.this-month').removeClass('today').attr('style', '');
                }
                
                // 添加index.html中的added-event里面的事件 added event
                $this.find('.added-event').each(function(i){
                    $(this).attr('data-id', i);
                    $this.find('.this-month[data-date="' + $(this).attr('data-date') + '"]').append(
                        // attr() 方法设置或返回被选元素的属性值。
                        // 事件被记录在标签 event-single 的div中
                        div('div','event-single').attr('data-id', i).append(
                            div('p','').text($(this).attr('data-title')),
                            div('div','details').append(
                                div('div', 'clock').text($(this).attr('data-time')),
                                div('div', 'erase')
                            )
                        )
                    );
                    $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i',''));
                });
                
                calcTotalDayAgain();  
                
            }
            calcMonth();  // 上面的函数就是该calcMonth()的功能

            //获取日历头部：上一月和下一月 按钮的对象
            var arrows = new Array ($this.find('.prv-m'), $this.find('.nxt-m'));   
            //console.log(arrows);
            // 时间-下拉选框 对象
            var dropdown = new Array ($this.find('.add-time .select span'), $this.find('.add-time .select .dropdown .option'), $this.find('.add-time .select'));
            // ALL Day 属性数组str
            var allDay = new Array ('.all-day fieldset[data-type="disabled"]', '.all-day fieldset[data-type="enabled"]');
            // 关闭 按钮 对象
            var $close = $this.find('.jalendar-wood > .close-button');
            // 删除时间 按钮 对象
            var $erase = $this.find('.event-single .erase');
            //设置日历页面的宽度 width
            $this.find('.jalendar-pages').css({'width' : $this.find('.jalendar-pages').width() });
            // 设置时间列表的高度height
            $this.find('.events').css('height', ($this.height()-197) );
            
            // 设置时间-下拉选框 的背景样式
            $this.find('.select .dropdown .option').hover(function() {
                $(this).css('background-color', settings.color); 
            }, function(){
                $(this).css('background-color', 'inherit'); 
            });
            // 获取 主体 div  的宽度width，并赋值给jalendarWoodW
            var jalendarWoodW = $this.find('.jalendar-wood').width();
            // 获取 背景div  的宽度width，并赋值给 woodBottomW
            var woodBottomW = $this.find('.wood-bottom').width();

            // 计算events-list面板的滚条是否显示 calculate for scroll
            function calcScroll() {
                if ( $this.find('.events-list').height() < $this.find('.events').height() ) { $this.find('.gradient-wood').hide(); $this.find('.events-list').css('border', 'none') } else { $this.find('.gradient-wood').show(); }
            }
            
            //计算每月总共的事件 Calculate total event again
            function calcTotalDayAgain() {
                var eventCount = $this.find('.this-month .event-single').length;
                $this.find('.total-bar b').text(eventCount);
                $this.find('.events h3 span b').text($this.find('.events .event-single').length)
            }
            
            function prevAddEvent() {
                $this.find('.day').removeClass('selected').removeAttr('style');      // 去除被选中的天的样式
                $this.find('.today').css({"color":settings.color,"background-color":"beige",});  // 设置 当天的样式
                $this.find('.add-event').hide();   // 隐藏事件列表
                $this.children('.jalendar-wood').animate({'width' : jalendarWoodW}, 200);   // 设置动画, 时间200ms
                $this.children('.wood-bottom').animate({'width' : woodBottomW}, 200);       // 设置动画, 时间200ms
                $close.hide();     // 隐藏关闭按钮
            }
            
            // 点击了 “下一月” 按钮
            arrows[1].on('click', function () {
                if ( month >= 11 ) {
                    month = 0;
                    year++;
                } else {
                    month++;   
                }
                calcMonth();
                prevAddEvent();
            });
            // 点击了 “上一月” 按钮
            arrows[0].on('click', function () {
                dayClick = $this.find('.this-month');
                if ( month === 0 ) {
                    month = 11;
                    year--;
                } else {
                    month--;   
                }
                calcMonth();
                prevAddEvent();
            });
            
            // 点击日历表中某一天时，响应的事件
            $this.on('click', '.this-month', function () {
                // 获取事件列表的事件 对象
                var eventSingle = $(this).find('.event-single')   // 保存event-single 的div时
                $this.find('.events .event-single').remove();   // 先移除event-single 的div
                prevAddEvent();
                $(this).addClass('selected').css({'background-color': settings.color});    // 改变选中天的样式
                //children()方法返回匹配元素集合中每个元素的子元素，添加可选参数可通过选择器进行过滤。
                $this.children('.jalendar-wood, .wood-bottom').animate({width : '+=300px' }, 200, function() {
                    $this.find('.add-event').show().find('.events-list').html(eventSingle.clone())   // 显示事件列表
                    $this.find('.add-new input').select();   // 聚焦输入框
                    calcTotalDayAgain();    //计算每月总共的事件 Calculate total event again
                    calcScroll();           //计算events-list面板的滚条是否显示 calculate for scroll
                    $close.show();    
                });
            });
            
            dropdown[0].click(function(){
                dropdown[2].children('.dropdown').hide(0);
                $(this).next('.dropdown').show(0);
            });
            dropdown[1].click(function(){
                $(this).parent().parent().children('span').text($(this).text());
                dropdown[2].children('.dropdown').hide(0);
            });
            $('html').click(function(){
                dropdown[2].children('.dropdown').hide(0); 
            });
            $('.add-time .select span').click(function(event){
                event.stopPropagation(); 
            });
            
            $this.on('click', allDay[0], function(){
                $(this).removeAttr('data-type').attr('data-type', 'enabled').children('.check').children().css('background-color', settings.color);
                dropdown[2].children('.dropdown').hide(0);
                $(this).parents('.all-day').prev('.add-time').css('opacity', '0.4').children('.disabled').css('z-index', '10');
            });
            $this.on('click', allDay[1], function(){
                $(this).removeAttr('data-type').attr('data-type', 'disabled').children('.check').children().css('background-color', 'transparent');
                $(this).parents('.all-day').prev('.add-time').css('opacity', '1').children('.disabled').css('z-index', '-1');
            });
            
            
            var dataId = parseInt($this.find('.total-bar b').text());   // 日历中的Total Events in This Month
            // 在面板上添加新事件 add new event with panel
            $this.find('.submit').on('click', function(){
                var title = $(this).prev('input').val();    // 面板中的输入框内容，即需要记录的事件
                var hour = $(this).parents('.add-new').find('.hour > span').text();
                var min = $(this).parents('.add-new').find('.min > span').text();
                var isAllDay = $(this).parents('.add-new').find('.all-day fieldset').attr('data-type');  // 二选一：enabled或disabled
                var isAllDayText = $(this).parents('.add-new').find('.all-day fieldset label').text();   //获取“ALL Day”的文字内容
                var thisDay = $this.find('.day.this-month.selected').attr('data-date');
                var time;
                if ( isAllDay == 'disabled' ) {
                    time = hour + ':' + min;
                } else {
                    time = isAllDayText;
                }
                //在html中添加added-event
                $this.prepend(div('div', 'added-event').attr({'data-date':thisDay, 'data-time': time, 'data-title': title, 'data-id': dataId}));
                //jq prepend() 方法在被选元素的开头（仍位于内部）插入指定内容。
                //在面板中添加的数据：dataId、title、time
                $this.find('.day.this-month.selected').prepend(
                    div('div','event-single').attr('data-id', dataId).append(
                        div('p','').text(title),
                        div('div','details').append(
                            div('div', 'clock').text(time),
                            div('div', 'erase')
                        )
                    )
                );
                $this.find('.day').has('.event-single').addClass('have-event').prepend(div('i',''));
                $this.find('.events-list').html($this.find('.day.this-month.selected .event-single').clone())
                $this.find('.events-list .event-single').eq(0).hide().slideDown();
                calcTotalDayAgain();
                calcScroll();
                // scrolltop after adding new event
                $this.find('.events-list').scrollTop(0);
                // form reset
                $this.find('.add-new > input[type="text"]').val(lAddEvent[settings.lang]).select();
                dataId++;
            });
            
            $close.on('click', function(){
                prevAddEvent(); 
            });
            
            // delete event    删除事件
            $this.on('click', '.event-single .erase', function(){
                $('div[data-id=' + $(this).parents(".event-single").attr("data-id") + ']').animate({'height': 0}, function(){ 
                    $(this).remove();
                    calcTotalDayAgain();
                    calcScroll();
                });
            });

        };

    }(jQuery));

});

