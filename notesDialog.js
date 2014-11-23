/**
 * Created by Ben on 19/11/2014.
 */
function NotesDialog(title, width, height, closeListener, notes)
{
	Dialog.call(this,title, width, height, closeListener);
	this.notes = notes;
	this.itemsArray=notes.noteArray.slice(0);

	this.listBox=new ListBox(this.itemsArray.length,this.onSelectionChange.bind(this),this.onRender.bind(this));
	this.middeDiv.innerHTML='   <div class="notesDialog">'+
		'       <div class="topDiv1">'+
		'            <span class="topSpan">Add/edit notes</span>'+
		'            <input class="inputBox"></input>'+
		'            <button class="addEditButton">Add</button>'+
		'       </div>'+
		'        <div class="bottomDiv1">'+
		'            <span class="bottomSpan">Current notes</span>'+
		'            <div class="listDiv"></div>'+
		'            <button class="deleteButton">Delete</button>'+
		'        </div>'+
		'    </div>'
	this.listDiv=document.querySelector(".listDiv");
	this.inputBox=document.querySelector(".inputBox");
	this.inputBox.focus();
	this.deleteButton=document.querySelector(".deleteButton");
	this.deleteButton.addEventListener("click",this.onDeleteClick.bind(this));
	this.addEditButton=document.querySelector(".addEditButton");
	this.addEditButton.addEventListener("click",this.onAddEditClick.bind(this));


	console.log(this.listDiv);
	this.listDiv.appendChild(this.listBox.getElement());
}

NotesDialog.prototype=Object.create(Dialog.prototype);

NotesDialog.prototype.onSelectionChange=function(listBox,index)
{
	var string=this.itemsArray[index];
	this.inputBox.value=string;
	if (this.listBox.getSelectedIndex()!==-1)
	{
		this.addEditButton.innerHTML="Edit";
	}
}

NotesDialog.prototype.onRender=function(div,index)
{
	div.innerHTML=this.itemsArray[index];
}

NotesDialog.prototype.onDeleteClick=function()
{
	var index=this.listBox.getSelectedIndex();
	this.listBox.removeRow(index);
	this.itemsArray.splice(index,1);
	this.inputBox.value="";
	this.addEditButton.innerHTML="Add";
	console.log(this.itemsArray);

}

NotesDialog.prototype.onAddEditClick=function()
{
	if (this.listBox.getSelectedIndex()!==-1)
	{
		this.itemsArray[this.listBox.getSelectedIndex()]=this.inputBox.value;
		this.listBox.updateRow(this.listBox.getSelectedIndex());
		this.inputBox.value="";
		this.addEditButton.innerHTML="Add";
	}
	else
	{
		if(this.inputBox.value.trim()!=="")
		{
			this.itemsArray.push(this.inputBox.value);
			this.listBox.addRow();
			this.inputBox.value = "";
		}
	}
}

NotesDialog.prototype.getNotes = function()
{
	return this.notes;
}

NotesDialog.prototype.onOK=function()
{
	this.notes.noteArray = this.itemsArray;

	document.body.removeChild(this.dialogDiv);
	this.closeListener(this, Dialog.OK);
}

