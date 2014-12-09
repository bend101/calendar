function Note (note, id, timeStamp)
{
	this.note=note;
	this.id=id;
	this.time=timeStamp;
}

Note.prototype.toString=function()
{
	return this.id + "," + this.note + "," + this.time;
}

Note.prototype.save=function()
{
	var saveObject={};
	saveObject.Note=this.note;
	saveObject.Id=this.id;
	saveObject.Time=this.time;

	return saveObject;
}

Note.load=function(savedObject)
{
	var note=new Note(savedObject.Note, savedObject.Id, savedObject.Time);
	return  note;
}
