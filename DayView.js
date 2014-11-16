/**
 * Created by Ben on 04/11/2014.
 */
function DayView(calender,dayOfWeek)
{
	this.date=new Date();
	this.calender=calender;
	this.outsideDiv=document.createElement("div");
	this.outsideDiv.className="outsideDiv";
	this.dayDiv=document.createElement("div");

	this.smallDiv=document.createElement("div");
	this.smallDiv.className="smallDiv";
	this.smallDiv.addEventListener("dblclick",this.onDblClick.bind(this));

	this.calender.daysContainerDiv.appendChild(this.outsideDiv);
	this.outsideDiv.appendChild(this.dayDiv);
	this.dayDiv.appendChild(this.smallDiv);

	this.dayDiv.className="element";

	if ('ontouchstart' in window)
	{
		this.dayDiv.addEventListener("touchstart",this.onClick.bind(this));
	}
	else
	{
		this.dayDiv.addEventListener("click",this.onClick.bind(this));
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

	var notes=this.calender.store.getNotes(this.date);
	if (notes !== undefined)
	{
		for (var i=0; i<this.dayDiv.children.length; i++)
		{
			if (this.dayDiv.children[i].tagName==="P")
			{
				this.dayDiv.removeChild(this.dayDiv.children[i]);
			}
		}
		var notesText=notes.noteArray.join(", ");
		this.spanObject=document.createElement("p");
		this.spanObject.className="spanObject";

		this.spanObject.innerHTML=notesText;
		this.dayDiv.appendChild(this.spanObject);
	}
	this.smallDiv.innerHTML= this.date.getDate();
	if (this.calender.firstDayOfMonth.getMonth()!==this.date.getMonth())
	{
		this.dayDiv.className = "element textGrey";
	}
	else
	{
		this.dayDiv.className = "element";
	}
	if (this.date.getDay()===0)
	{
		this.dayDiv.className = this.dayDiv.className + " sundayDiv";
	}
	if (this.compareDates(this.date,this.calender.selectedDate)===true)
	{
		this.dayDiv.className = this.dayDiv.className + " selectedDiv";
	}

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
	var notePrompt= prompt("Enter note");
	var notes=this.calender.store.getNotes(this.date);
	if (notes===undefined)
	{
		notes=new Notes();
		this.calender.store.putNotes(this.date, notes);
	}
	notes.noteArray.push(notePrompt);

	this.setDate(this.date);
	this.calender.store.save();
}