/**
 * Created by Ben on 19/11/2014.
 */

function ListBox (size, fnSelectionListener, fnRenderer)
{
	this.size = size;
	this.fnSelectionListener = fnSelectionListener;
	this.fnRenderer  = fnRenderer;

	this.containerDiv=document.createElement("div");
	this.containerDiv.className="listbox-container";

	this.selectedIndex=-1;
	this.items=[];

	for (var i=0;i<size;i++)
	{
		this.addRow();
	}
}

ListBox.prototype.onClick=function(event)
{
	var div=event.currentTarget;
	for (var i=0;i<this.items.length;i++)
	{
		if (div===this.items[i])
		{
			var index=i;
		}
	}
	console.log(event, index);
	this.setSelectedIndex(index);
	if (this.fnSelectionListener!== null)
	{
		this.fnSelectionListener(this, index);
	}
}

ListBox.prototype.setSelectedIndex=function(index)
{
	if (this.selectedIndex !== -1)
	{
		this.items[this.selectedIndex].className = "listbox-row";
	}
	this.selectedIndex = index;
	this.items[this.selectedIndex].className = this.items[this.selectedIndex].className + " listbox-selected";
}

ListBox.prototype.getElement=function()
{
	return this.containerDiv;
}

ListBox.prototype.addRow=function()
{
	this.rowDiv=document.createElement("div");
	this.rowDiv.className="listbox-row";
//	console.log(this.items.length);
	this.rowDiv.addEventListener("click",this.onClick.bind(this));
	this.containerDiv.appendChild(this.rowDiv);
	this.items.push(this.rowDiv);

	this.fnRenderer(this.rowDiv,this.items.length-1);
}

ListBox.prototype.removeRow=function(index)
{
	this.containerDiv.removeChild(this.items[index]);
	this.items.splice(index,1);
	if(index===this.selectedIndex)
	{
		this.selectedIndex=-1;
	}
}

ListBox.prototype.updateRow=function(index)
{
	this.items[index].innerHTML="";
	this.fnRenderer(this.items[index],index);
	this.selectedIndex=-1;
	this.items[index].className="listbox-row";
}

ListBox.prototype.getSelectedIndex=function()
{
	return this.selectedIndex;
}


