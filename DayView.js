/**
 * Created by Ben on 04/11/2014.
 */
function DayView(calendar,dayOfWeek)
{
	this.date=new Date();
	this.calendar=calendar;
	this.outsideDiv=document.createElement("div");
	this.outsideDiv.className="calendar-day-outside";
	this.dayDiv=document.createElement("div");

	this.smallDiv=document.createElement("div");
	this.smallDiv.className="smallDiv";

	this.calendar.daysContainerDiv.appendChild(this.outsideDiv);
	this.dayDiv.className="calendar-day-inside";
	this.outsideDiv.appendChild(this.dayDiv);

	this.dayDiv.appendChild(this.smallDiv);
	this.dayReceiveClick=document.createElement("div");
	this.dayReceiveClick.className="calendar-dayReceiveClick";
	this.outsideDiv.appendChild(this.dayReceiveClick);
	this.dayReceiveClick.addEventListener("click",this.onClick.bind(this));
	this.dayReceiveClick.addEventListener("dblclick",this.onDblClick.bind(this));


//	this.dayReceiveClick.addEventListener("click",this.onClick.bind(this));
	if ('ontouchstart' in window)
	{
		this.dayReceiveClick.addEventListener("touchstart",this.onClick.bind(this));
		this.dayReceiveClick.addEventListener("touchstart",this.onTouchStart.bind(this));
		this.dayReceiveClick.addEventListener("touchend",this.onTouchEnd.bind(this));
	}
	else
	{
//		this.dayReceiveClick.addEventListener("click",this.onClick.bind(this));
//		this.dayReceiveClick.addEventListener("dblclick",this.onDblClick.bind(this));
	}
}

//DayView.prototype.toString = function()
//{
//	return this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+ this.date.getFullYear();
//}

//DayView.prototype.fullDate=function()
//{
//	return this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+ this.date.getFullYear();
//}

DayView.prototype.setDate=function(date)
{
	this.date.setTime(date.getTime());
	this.render();
}

DayView.prototype.compareDates=function(date1,date2)
{
	if (date1.getDate()===date2.getDate() &&
		date1.getMonth()===date2.getMonth() &&
		date1.getYear()===date2.getYear()
		)
	{
		return true;
	}
	else
	{
		return false;
	}
}

DayView.prototype.onClick=function()
{
	this.calendar.showDate(this.date);
	console.log(this.date);
}

DayView.prototype.onDblClick=function()
{
	var notes=this.calendar.store.getNotes(this.date);
	console.log(notes);
	if (notes===undefined)
	{
		notes=new Day();
		console.log(notes);
	}
	var notesDialog=new NotesDialog("Add/edit notes", 300, 324, this.onNotesDone.bind(this),notes );
}

DayView.prototype.onNotesDone = function(dialog, dialogResult)
{
	if (dialogResult == Dialog.OK)
	{
		this.calendar.store.putNotes(this.date, dialog.getNotes());
		console.log("---->", dialog.getNotes(), this.calendar.store.getNotes(this.date));
		this.render();
		this.calendar.store.saveToLocalStorage();
	}
}

DayView.prototype.render=function()
{
	// remove existing contents
	if (this.notesContainer)
	{
		this.dayDiv.removeChild(this.notesContainer);
		this.notesContainer = null;
	}

	var notes=this.calendar.store.getNotes(this.date);
	if (notes !== undefined)
	{
		var notesText="";
		for (var j=0;j<notes.length();j++)
		{
			notesText=notesText+"<p class='calendar-noSelect'>"+notes.getNoteText(j)+"</p>";
		}

		this.notesContainer=document.createElement("div");
		this.notesContainer.className="spanObject";

		this.notesContainer.innerHTML=notesText;
		this.dayDiv.appendChild(this.notesContainer);
	}
	this.smallDiv.innerHTML= this.date.getDate();
	if (this.calendar.firstDayOfMonth.getMonth()!==this.date.getMonth())
	{
		this.dayDiv.className = "calendar-day-inside calendar-textGrey";
	}
	else
	{
		this.dayDiv.className = "calendar-day-inside";
	}
	if (this.date.getDay()===0)
	{
		this.dayDiv.className = this.dayDiv.className + " calendar-nextline";
	}
	if (this.compareDates(this.date,this.calendar.selectedDate)===true)
	{
		this.dayDiv.className = this.dayDiv.className + " selectedDiv";
	}
}

DayView.prototype.onTouchStart=function()
{
	this.holdTimer = setTimeout(this.onTouchHold.bind(this),1000);
}

DayView.prototype.onTouchEnd=function()
{
	clearTimeout(this.holdTimer);
}

DayView.prototype.onTouchHold=function()
{
	this.onDblClick();
}
