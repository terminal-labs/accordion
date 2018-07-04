/*
* This code is based on Michael Kuehl's "Accordion Menus". 
* Michael Kuehl's original  code can be founds here:
* http://tech.pro/tutorial/697/javascript-and-css-tutorial-accordion-menus
* 
* I (Michael Verhulst) <michael@terminallabs.com> modified this code by 
* adding in the ability to have multiple sections open simultaneously. 
* I also added in the rotating arrow images.
* Last edtied: 05-13-2013
*/

var TimeToSlide = 250;
var cell_status = [0,0,0,0,0];
var drop_down_status = []

function runAccordion(index)
{
    var nID = "accordion" + index + "content";
    var arrow_class_id = "#accordion_arrow_" + index;

    if(cell_status[index] == 0)
    {
        $(arrow_class_id).removeClass('accordion_arrow_down');
        $(arrow_class_id).addClass('accordion_arrow_up')      
        cell_status[index] = 1;
        set_opening(new Date().getTime(),TimeToSlide,nID, index);
    }
    else if(cell_status[index] == 1)
    {
        $(arrow_class_id).removeClass('accordion_arrow_up');
        $(arrow_class_id).addClass('accordion_arrow_down')
        cell_status[index] = 0;
        set_closing(new Date().getTime(),TimeToSlide,nID, index);
    }  
}

function set_opening(lastTick, timeLeft, openingId, index)
{
    setTimeout(function(){
                            animate_opening(lastTick,
                                            timeLeft,
                                            openingId,
                                            index);
                         }, 33);
}

function animate_opening(lastTick, timeLeft, openingId, index)
{  
    var curTick = new Date().getTime();
    var elapsedTicks = curTick - lastTick;

    var opening = (openingId == '') ?
        null : document.getElementById(openingId);

    if(timeLeft <= elapsedTicks)
    {
        if(opening != null)
        {
            opening.style.height = get_div_height("#" + openingId) + 'px';
        }
        return;
    }

    timeLeft -= elapsedTicks;
    var percent_open = Math.round(timeLeft/TimeToSlide);
    var newClosedHeight = percent_open * get_div_height("#" + openingId);

    if(opening != null)
    {
        if(opening.style.display != 'block')
        {
            opening.style.display = 'block';
        }
        opening.style.height = (get_div_height("#" + openingId)
                                - newClosedHeight)
                                + 'px';
    }
    set_opening(curTick,timeLeft, openingId);
}

function set_closing(lastTick, timeLeft, closingId, openingId, index)
{
    setTimeout(function(){
                            animate_closing(lastTick,
                                            timeLeft,
                                            closingId,
                                            openingId,
                                            index);
                         }, 33);
}

function animate_closing(lastTick, timeLeft, closingId, openingId, index)
{  
    var curTick = new Date().getTime();
    var elapsedTicks = curTick - lastTick;

    var closing = (closingId == '') ? 
        null : document.getElementById(closingId);

    if(timeLeft <= elapsedTicks)
    {
    if(closing != null)
    {
        closing.style.display = 'none';
        closing.style.height = '0px';
    }
    return;
    }

    timeLeft -= elapsedTicks;
    var percent_open = Math.round(timeLeft/TimeToSlide);
    var newClosedHeight = percent_open * get_div_height("#" + closingId);

    if(closing != null)
    {
        closing.style.height = newClosedHeight + 'px';
    }
    set_closing(curTick,timeLeft,closingId, openingId);
}

function get_div_height(id)
{
    var count = $(id).children().length;;
    return (count * 15) + 10;
}

function clear_boxes(id)
{
    $(id + " input:checkbox").removeAttr("checked");
}

function toggle_drop_down(id)
{       
        var id_num = id.replace('drop_down_','');
        if(drop_down_status[id_num] == 0)
        {
            $('#drop_down_options_' + id_num).show();
            $('#drop_down_arrow_' + id_num).removeClass("floot_arrow_down");
            $('#drop_down_arrow_' + id_num).addClass("floot_arrow_up");
            drop_down_status[id_num] = 1;
        }
        else if(drop_down_status[id_num] == 1)
        {   
            $('#drop_down_options_' + id_num).hide();
            $('#drop_down_arrow_' + id_num).removeClass("floot_arrow_up");
            $('#drop_down_arrow_' + id_num).addClass("floot_arrow_down");
            drop_down_status[id_num] = 0;
        }
}

$(document).ready(function()
{
    for (var i=0 ; i< $(".accordion_title").length ; i++)
    { 
        cell_status.push(0);
    }
    
    $(".accordion_title").click(function()
    { 
        var clicked_div_id = this.id;
        var target = clicked_div_id.replace("accordion","");
        runAccordion(target);
    });
    
    for (var i=0 ; i< $(".drop_down_section").length ; i++)
    { 
        drop_down_status.push(0);
    }    

    $(".flooting_dropdown_menu").click(function()
    { 
        toggle_drop_down(this.id);
    });

});
