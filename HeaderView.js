/**
 * Created by Ben on 07/11/2014.
 */
function HeaderView(calender)
{
	this.calender=calender;

	this.headerDiv=document.createElement("div");
	this.headerDiv.className="headerDiv";
	this.headerDiv.innerHTML=HeaderView.template;
	this.monthSpan=this.headerDiv.querySelector(".monthName");
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

HeaderView.template='<div class="topDiv2">'+
	'	<img class="backArrow" src="back%20arrow.png"></img>'+
	'	<img class="forwardArrow" src="forward%20arrow.png"></img>'+
	'	<span class="monthName"></span>'+
	'	<img class="menuButton" src="menu%20button.png"></img>'+

	'</div>'+
	''+
	'<div class="bottomDiv2">'+
	'	<div class="dayDiv">Sunday</div>'+
	'	<div class="dayDiv">Monday</div>'+
	'	<div class="dayDiv">Tuesday</div>'+
	'	<div class="dayDiv">Wednesday</div>'+
	'	<div class="dayDiv">Thursday</div>'+
	'	<div class="dayDiv">Friday</div>'+
	'	<div class="dayDiv">Saturday</div>'+
	'</div>';
