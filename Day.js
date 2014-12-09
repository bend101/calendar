/**
 * Created by Ben on 14/11/2014.
 */
function Day()
{
	this._noteArray = [];
	this._deletedNotes={};
}

Day.prototype.clone = function ()
{
	var copyNotes = new Day();
	copyNotes._noteArray = this._noteArray.slice(0);
	for (var id in this._deletedNotes)
	{
		copyNotes._deletedNotes[id]= null;
	}
	return copyNotes;
}

Day.prototype.copyFrom = function (fromNotes)
{
	this._noteArray = fromNotes._noteArray.slice(0);
	for (var id in fromNotes._deletedNotes)
	{
		this._deletedNotes[id]= null;
	}
}

Day.prototype.length = function ()
{
	return this._noteArray.length;
}

Day.prototype.getNoteText = function (index)
{
	return this._noteArray[index].note;
}

Day.prototype.getNote = function (index)
{
	return this._noteArray[index];
}

Day.prototype.remove = function (index)
{
	this._deletedNotes[this._noteArray[index].id]=null;
	this._noteArray.splice(index, 1);

}

Day.nextId=0;

Day.prototype.add = function (newItem)
{

	var date = new Date();
	var dateTime = date.getTime();
	var id= ""+dateTime+Day.nextId;
	Day.nextId=Day.nextId+1;
	var note = new Note(newItem,id, dateTime);
	this._noteArray.push(note);
}

Day.prototype.update = function (index, newItem)
{
	var date = new Date;
	var dateTime = date.getTime();
	var note = this._noteArray[index];
	note.note = newItem;
	note.time = dateTime;
}

Day.merge = function (day1, day2)
{
	var day = new Day();

	for (var i = 0; i < day1._noteArray.length; i++)
	{
		var day1Note = day1._noteArray[i];
		var day2Note = day2.findById(day1Note.id);

		if (day2Note !== null)  //same id
		{
			if (day1Note.time !== day2Note.time)  //different time
			{
				if (day1Note.time > day2Note.time)
				{
					day._noteArray.push(day1Note);
				}
				else
				{
					day._noteArray.push(day2Note);
				}
			}
			else  //same id same time
			{
				day._noteArray.push(day1Note);
			}
		}
		else  //id not found
		{
			day._noteArray.push(day1Note);
		}

	}

	//see if there are any notes in day2 which arent in day 1
	for (var i = 0; i < day2._noteArray.length; i++)
	{
		var day2Note = day2._noteArray[i];
		var day1Note = day1.findById(day2Note.id);
		if (day1Note===null)
		{
			day._noteArray.push(day2Note);
		}
	}


	return day;
}

Day.createTestDay = function (data)
{
	var day = new Day();
	for (var i = 0; i < data.length; i++)
	{
		var noteData = data[i];
		var note = new Note(noteData[1], noteData[0]);
		note.time = noteData[2];

		day._noteArray.push(note);
	}
	return day;
}

Day.prototype.toString = function ()
{
	var s = "";
	for (var i = 0; i < this._noteArray.length; i++)
	{
		s = s + "[" + this._noteArray[i].toString() + "],";
	}

	return s;
}

Day.prototype.findById=function(id)
{
	for (var i=0;i<this._noteArray.length;i++)
	{
		if (this._noteArray[i].id===id)
		{
			return this._noteArray[i];
		}

	}
	return null;
}
   //create object suitable for saving
Day.prototype.save=function()
{
	var saveObject={};
	saveObject.Notes=[];
	for (var i=0; i<this._noteArray.length;i++)
	{
		var saved=this._noteArray[i].save();
		saveObject.Notes.push(saved);
	}
	saveObject.deleted=[];
	for (var id in this._deletedNotes)
	{
		saveObject.deleted.push(id);
	}

	return saveObject;
}


Day.load=function(savedDay)
{
	var day=new Day();
	for (var i=0;i<savedDay.Notes.length;i++)
	{
		var loadedNote=savedDay.Notes[i];
		var note = Note.load(loadedNote);
		day._noteArray.push(note);
	}
	for (var j=0;j<savedDay.deleted.length;j++)
	{
		var id=savedDay.deleted[j];
		day._deletedNotes[id]=null;
	}

	return day;
}
