/**
 * Created by Ben on 04/11/2014.
 */
function DayView(calender,dayOfWeek)
{
	this.date=new Date();
	this.calender=calender;
	this.outsideDiv=document.createElement("div");
	this.outsideDiv.className="calender-day-outside";
	this.dayDiv=document.createElement("div");

	this.smallDiv=document.createElement("div");
	this.smallDiv.className="smallDiv";

	this.calender.daysContainerDiv.appendChild(this.outsideDiv);
	this.dayDiv.className="calender-day-inside";
	this.outsideDiv.appendChild(this.dayDiv);

	this.dayDiv.appendChild(this.smallDiv);
	this.dayReceiveClick=document.createElement("div");
	this.dayReceiveClick.className="calender-dayReceiveClick";
	this.outsideDiv.appendChild(this.dayReceiveClick);
	this.dayReceiveClick.addEventListener("dblclick",this.onDblClick.bind(this));
	this.dayReceiveClick.addEventListener("touchstart",this.onTouchStart.bind(this));
	this.dayReceiveClick.addEventListener("touchend",this.onTouchEnd.bind(this));

	if ('ontouchstart' in window)
	{
		this.dayReceiveClick.addEventListener("touchstart",this.onClick.bind(this));
	}
	else
	{
		this.dayReceiveClick.addEventListener("click",this.onClick.bind(this));
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

	this.calender.showDate(this.date);
	console.log(this.date);
}

DayView.prototype.onDblClick=function()
{
	var notes=this.calender.store.getNotes(this.date);
	console.log(notes);
	if (notes===undefined)
	{
		notes=new Notes();
		console.log(notes);
	}
	var notesDialog=new NotesDialog("Add/edit notes", 300, 324, this.onNotesDone.bind(this),notes );

}

DayView.prototype.onNotesDone = function(dialog, dialogResult)
{
	if (dialogResult == Dialog.OK)
	{
		this.calender.store.putNotes(this.date, dialog.getNotes());
		console.log("---->", dialog.getNotes(), this.calender.store.getNotes(this.date));
		this.render();
		this.calender.store.save();
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

	var notes=this.calender.store.getNotes(this.date);
	if (notes !== undefined)
	{
		var notesText="";
		for (var j=0;j<notes.noteArray.length;j++)
		{
			notesText=notesText+"<p class='calender-noSelect'>"+notes.noteArray[j]+"</p>";
		}

		this.notesContainer=document.createElement("div");
		this.notesContainer.className="spanObject";

		this.notesContainer.innerHTML=notesText;
		this.dayDiv.appendChild(this.notesContainer);
	}
	this.smallDiv.innerHTML= this.date.getDate();
	if (this.calender.firstDayOfMonth.getMonth()!==this.date.getMonth())
	{
		this.dayDiv.className = "calender-day-inside calender-textGrey";
	}
	else
	{
		this.dayDiv.className = "calender-day-inside";
	}
	if (this.date.getDay()===0)
	{
		this.dayDiv.className = this.dayDiv.className + " calender-nextline";
	}
	if (this.compareDates(this.date,this.calender.selectedDate)===true)
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
