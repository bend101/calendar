/**
 * Created by Ben on 07/11/2014.
 */
function HeaderView(calendar)
{
	this.calendar=calendar;

	this.headerDiv=document.createElement("div");
	this.headerDiv.className="calendar-headerDiv";
	this.headerDiv.innerHTML=HeaderView.template;
	this.backArrow=this.headerDiv.querySelector(".backArrow");
	this.forwardArrow=this.headerDiv.querySelector(".forwardArrow");
	this.yearDiv=this.headerDiv.querySelector(".calendar-yearHeader");
	this.monthNameDiv=this.headerDiv.querySelector(".calendar-monthHeader");
	this.surroundingDiv=this.headerDiv.querySelector(".calendar-divSurroundingYearMonth");
	this.menuButton=this.headerDiv.querySelector(".menuButton");
	this.syncButton=this.headerDiv.querySelector(".syncButton");
	this.syncButton.addEventListener("click",this.calendar.onSyncClick.bind(this.calendar));
	this.divWhereDaysGo=this.headerDiv.querySelector(".calendar-bottomDivOfHeader");
	this.menuButton.addEventListener("click",this.calendar.onSidebarShow.bind(this.calendar));

	this.forwardArrow.addEventListener("click",this.calendar.onClickRight.bind(this.calendar));
	this.backArrow.addEventListener("click",this.calendar.onClickLeft.bind(this.calendar));
	this.forwardArrow.addEventListener("touchstart",this.calendar.onClickRight.bind(this.calendar));
	this.backArrow.addEventListener("touchstart",this.calendar.onClickLeft.bind(this.calendar));

	this.backArrow.style.cursor="pointer";
	this.forwardArrow.style.cursor="pointer";
	this.currentMonth=-1;
	this.theme=-1;


this.dayToStartOn=0;
	this.daysArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	this.addDaysOfTheWeek();
}
HeaderView.prototype.getElement=function()
{
	return this.headerDiv;
}

HeaderView.monthNames = [ "January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];
//HeaderView.numbers=[{image:"0.png",name:0},{image:"1.png",name:1},{image:"2.png",name:2},{image:"4.png",name:4}];

HeaderView.prototype.updateMonth=function(monthIndex, year)
{
	if (monthIndex!==this.currentMonth || this.calendar.theme!==this.theme)
	{
		if (this.calendar.theme==="themeMountain")
		{
			this.yearDiv.innerHTML = "";
			this.monthNameDiv.innerHTML = "";
			this.monthNameDiv.innerHTML=HeaderView.monthNames[monthIndex];
			this.yearDiv.innerHTML=year+1900;
		}
		if (this.calendar.theme==="themeFlower")
		{
			this.yearDiv.innerHTML = "";
			this.monthNameDiv.innerHTML = "";
//	this.monthSpan.innerHTML=(HeaderView.monthNames[number]);
			var year1 = year + 1900;
			var year2 = year1.toString();
			this.month = HeaderView.monthNames[monthIndex].toLowerCase();
			for (var j = 0; j < this.month.length; j++)
			{
				this.monthName = document.createElement("img");
				this.monthName.className = "calendar-monthNameImg";
				this.monthName.src = "images/" + this.month[j] + ".png";
				this.monthNameDiv.appendChild(this.monthName);
			}
			for (var i = 0; i < year2.length; i++)
			{
				this.flowerNumber = document.createElement("img");
				this.flowerNumber.className = "calendar-flowerNumber";
				this.flowerNumber.src = "images/" + year2[i] + ".png";
				this.yearDiv.appendChild(this.flowerNumber);
			}

		}

		this.currentMonth=monthIndex;
		this.theme=this.calendar.theme;
	}

}

HeaderView.template='<div class="calendar-topDivOfHeader">'+
	'	<img class="backArrow" src="otherImages/back%20arrow.png"></img>'+
	'	<img class="forwardArrow" src="otherImages/forward%20arrow.png"></img>'+
	' <div class="calendar-divSurroundingYearMonth">'+
		'   <div class="calendar-monthHeader"></div>'+
		'   <div class="calendar-middleDiv"></div>'+
		'   <div class="calendar-yearHeader"></div>'+
	' </div>'+

	'	<img class="menuButton" src="otherImages/menu%20button.png"></img>'+
	'   <img class="syncButton" src="otherImages/sync icon.png"></img>'+

	'</div>'+
	''+
	'<div class="calendar-bottomDivOfHeader">'+

	'</div>';

HeaderView.prototype.addDaysOfTheWeek=function()
{
	this.divWhereDaysGo.innerHTML="";
	var day=this.dayToStartOn;
	for (var i=0;i<7;i++)
	{
		var dayNameDiv=document.createElement("div");
		dayNameDiv.className="calendar-dayName";
		dayNameDiv.innerHTML=this.daysArray[day];
		this.divWhereDaysGo.appendChild(dayNameDiv);
		if (day<6)
		{
			day=day+1;
		}
		else
		{
			day=0;
		}
	}
}
