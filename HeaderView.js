/**
 * Created by Ben on 07/11/2014.
 */
function HeaderView(calender)
{
	this.calender=calender;

	this.headerDiv=document.createElement("div");
	this.headerDiv.className="calender-headerDiv";
	this.headerDiv.innerHTML=HeaderView.template;
	this.monthSpan=this.headerDiv.querySelector(".calender-monthName");
	this.backArrow=this.headerDiv.querySelector(".backArrow");
	this.forwardArrow=this.headerDiv.querySelector(".forwardArrow");
	this.forwardArrow.addEventListener("click",this.calender.onClickRight.bind(this.calender));
	this.backArrow.addEventListener("click",this.calender.onClickLeft.bind(this.calender));
	this.forwardArrow.addEventListener("touchstart",this.calender.onClickRight.bind(this.calender));
	this.backArrow.addEventListener("touchstart",this.calender.onClickLeft.bind(this.calender));

	this.backArrow.style.cursor="pointer";
	this.forwardArrow.style.cursor="pointer";


}
HeaderView.prototype.getElement=function()
{
	return this.headerDiv;
}

HeaderView.monthNames = [ "January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];

HeaderView.prototype.updateMonth=function(number, year)
{
	this.monthSpan.innerHTML=(HeaderView.monthNames[number]) + " " +(year+1900);
}

HeaderView.template='<div class="calender-topDivOfHeader">'+
	'	<img class="backArrow" src="back%20arrow.png"></img>'+
	'	<img class="forwardArrow" src="forward%20arrow.png"></img>'+
	'	<span class="calender-monthName"></span>'+
	'	<img class="menuButton" src="menu%20button.png"></img>'+

	'</div>'+
	''+
	'<div class="calender-bottomDivOfHeader">'+
	'	<div class="calender-dayName">Sunday</div>'+
	'	<div class="calender-dayName">Monday</div>'+
	'	<div class="calender-dayName">Tuesday</div>'+
	'	<div class="calender-dayName">Wednesday</div>'+
	'	<div class="calender-dayName">Thursday</div>'+
	'	<div class="calender-dayName">Friday</div>'+
	'	<div class="calender-dayName">Saturday</div>'+
	'</div>';
