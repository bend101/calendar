/**
 * Created by Ben on 04/11/2014.
 */
function Calender(store)
{
	this.firstDayOfMonth = null;
	this.dayArray = [];
	this.selectedDate=null;
	this.store=store;
	this.theme="themeFlower";
	this.firstDayOfWeek=0;

	document.ontouchmove = function(event){
		event.preventDefault();
	};

	// create the containing element
	this.containingDiv = document.createElement("div");
	this.containingDiv.className = "containingDiv";
	this.backgroundDiv = document.createElement("div");
	this.backgroundDiv.className = "backgroundDiv";
	this.foregroundDiv = document.createElement("div");
	this.foregroundDiv.className = "foregroundDiv";
	this.sidebar=new SideBar(this);
	this.containingDiv.appendChild(this.sidebar.getElement());
//	this.modalDiv=document.createElement("div");
//	this.modalDiv.className="calender-modalDiv";
//	this.foregroundDiv.appendChild(this.modalDiv);

	this.daysContainerDiv = document.createElement("div");
	this.daysContainerDiv.className = "calender-daysContainer";

	this.headerView = new HeaderView(this);

	this.containingDiv.appendChild(this.backgroundDiv);
	this.containingDiv.appendChild(this.foregroundDiv);

	this.foregroundDiv.appendChild(this.headerView.getElement());
	this.foregroundDiv.appendChild(this.daysContainerDiv);

	this.containingDiv.addEventListener("mousemove", this.onMouseMove.bind(this));

	this.daysContainerDiv.tabIndex=1;
	this.daysContainerDiv.focus();
	this.daysContainerDiv.addEventListener("keydown", this.onKeyDown.bind(this));

	this.rightShowing = false;
	this.leftShowing = false;

	this.createLeftButton();
	this.createRightButton();

	// create 42 days and add to this.dayArray
	for (var i = 0; i < 42; i++)
	{
		var dayOfWeek=i%7;
		var dayObject = new DayView(this,dayOfWeek);
		this.dayArray.push(dayObject);
	}
}

// set the calendar to show the month of the given date
// so for example given 11/11/2014 show november 2014
Calender.prototype.showDate = function(showDate)
{
	this.selectedDate= new Date(showDate.getTime());
	// get the month from date
	var date = new Date(showDate.getTime());
	date.setDate(1);

	// save first day of month
	this.firstDayOfMonth = new Date(date.getTime());

	//go back to sunday
	while (date.getDay() !== this.firstDayOfWeek)
	{
		date.setDate(date.getDate() - 1);
	}

	// update the 42 days with their dates
	for (var i=0; i<this.dayArray.length; i++)
	{
		this.dayArray[i].setDate(date);
		date.setDate(date.getDate()+1);
	}

	// update the header with the name of the month

	this.headerView.updateMonth(this.firstDayOfMonth.getMonth(), this.firstDayOfMonth.getYear());
}

Calender.prototype.toString = function()
{
	return this.firstDayOfMonth + ": " + this.dayArray.toString();
};

Calender.prototype.getElement=function()
{
	return this.containingDiv;
}

Calender.prototype.onClickRight=function(event)
{
	event.preventDefault();
	var nextMonth=new Date(this.firstDayOfMonth.getTime());
	nextMonth.setMonth(this.firstDayOfMonth.getMonth()+1);
	this.showDate(nextMonth);
}

Calender.prototype.onClickLeft=function(event)
{
	event.preventDefault();
	var nextMonth=new Date(this.firstDayOfMonth.getTime());
	nextMonth.setMonth(this.firstDayOfMonth.getMonth()-1);
	this.showDate(nextMonth);
}

Calender.prototype.onMouseMove=function(event)
{
	if (this.rightShowing===false)
	{
		if (event.clientX > this.containingDiv.offsetWidth - 10)
		{
			var left = this.rightButton.offsetLeft;
			this.rightButton.style.right = "0px";
			this.rightShowing = true;
		}
	}
	else
	{
		if (event.clientX < this.containingDiv.offsetWidth - 45)
		{
			this.rightButton.style.right = "-40px";
			this.rightShowing = false;
		}
	}

	if (this.leftShowing===false)
	{
		if (event.clientX < this.containingDiv.clientLeft + 10)
		{

			this.leftButton.style.left = "0px";
			this.leftShowing = true;
		}
	}
	else
	{
		if (event.clientX > this.containingDiv.clientLeft + 45)
		{
			this.leftButton.style.left = "-40px";
			this.leftShowing = false;
		}
	}
}

Calender.prototype.createLeftButton=function()
{
	this.leftButton=document.createElement("div");
	this.leftButton.className="leftButton";
	this.leftButton.style.left="-40px";
	this.leftButton.style.cursor="pointer";
	this.leftButton.addEventListener("click", this.onClickLeft.bind(this));
	this.foregroundDiv.appendChild(this.leftButton);
}

Calender.prototype.createRightButton=function()
{
	this.rightButton=document.createElement("div");
	this.rightButton.className="rightButton";
	this.rightButton.style.right="-40px";
	this.rightButton.style.cursor="pointer";
	this.rightButton.addEventListener("click", this.onClickRight.bind(this));
	this.foregroundDiv.appendChild(this.rightButton);
}

Calender.prototype.onKeyDown=function(event)
{
	console.log(event);
	this.handleArrowKeys(event,-7,38);
	this.handleArrowKeys(event,7,40);
	this.handleArrowKeys(event,-1,37);
	this.handleArrowKeys(event,1,39);
}

Calender.prototype.handleArrowKeys=function(event,number,keyPressed)
{
	if (event.keyCode===keyPressed)
	{
		event.preventDefault();
		this.selectedDate.setDate(this.selectedDate.getDate()+number);
		this.showDate(this.selectedDate);
	}
}

Calender.prototype.onSidebarShow=function()
{
	this.sidebar.getElement().style.right="0px";
}

Calender.prototype.onSidebarApplyClick=function()
{
	console.log(this.sidebar.getSelectedDay());
	this.firstDayOfWeek=parseInt(this.sidebar.getSelectedDay());
	var newtheme=this.sidebar.getSelectedTheme();
	var currentTheme=this.theme;
	this.theme=newtheme.name;
	var themeCss=document.getElementById("theme");
	themeCss.href=newtheme.name+".css";
	if (newtheme!==currentTheme)
	{
		var currentMonth=new Date(this.firstDayOfMonth.getTime());
		var month=currentMonth.getMonth();
		var year=currentMonth.getYear();
		this.headerView.updateMonth(month,year);
	}
	this.sidebar.getElement().style.right="-220px";
	this.showDate(this.selectedDate);
	this.headerView.dayToStartOn=this.firstDayOfWeek;
	this.headerView.addDaysOfTheWeek();
}


Calender.prototype.onSyncClick=function()
{
	console.log("sync clicked");
	var serverStore=new Store();
	serverStore.loadFromServer(function()
	{
		this.store.merge(serverStore);
		this.showDate(this.firstDayOfMonth);
		this.store.saveToServer();
	}.bind(this));


}
