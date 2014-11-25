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
	this.yearDiv=this.headerDiv.querySelector(".calender-yearHeader");
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
HeaderView.numbers=[{image:"0.png",name:0},{image:"1.png",name:1},{image:"2.png",name:2},{image:"4.png",name:4}];

letters = {"a": "asdf", "b": "asdf"}

HeaderView.prototype.updateMonth=function(number, year)
{
	this.yearDiv.innerHTML="";
	this.monthSpan.innerHTML=(HeaderView.monthNames[number]);
	var year1=year+1900;
	var year2=year1.toString();
	for (var i=0;i<year2.length;i++)
	{
		for (var j=0;j<HeaderView.numbers.length;j++)
		{
			if (year2[i]==HeaderView.numbers[j].name)
			{
				this.flowerNumber=document.createElement("img");
				this.flowerNumber.className="calender-flowerNumber";
				this.flowerNumber.src=HeaderView.numbers[j].image;
				this.yearDiv.appendChild(this.flowerNumber);
			}

		}

	}

}

HeaderView.template='<div class="calender-topDivOfHeader">'+
	'	<img class="backArrow" src="back%20arrow.png"></img>'+
	'	<img class="forwardArrow" src="forward%20arrow.png"></img>'+
	'	<span class="calender-monthName"></span>'+
	'   <div class="calender-yearHeader"></div>'+
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
