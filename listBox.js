/**
 * Created by Ben on 19/11/2014.
 */
// add row and remove methods
// change style white text
// update row method
// add keyboard
//

function ListBox (items, selectionListener)
{
 	this.mainDiv=document.createElement("div");
 	this.inputBox=document.createElement("input");
	this.inputBox.className="input";
	this.insideDiv=document.createElement("div");
	this.mainDiv.className="mainDiv";
	this.insideDiv.className="insideDiv";

	this.mainDiv.appendChild(this.inputBox);
	this.mainDiv.appendChild(this.insideDiv);
	this.selectedIndex=-1;
	this.list=items;
	this.divs=[];
	for (var i=0;i<this.list.length;i++)
	{
		this.textDiv=document.createElement("div");
		this.textDiv.className="textDiv";
		this.textDiv.innerHTML=this.list[i];
		this.textDiv.addEventListener("click",this.onClick.bind(this,i));
		this.insideDiv.appendChild(this.textDiv);
		this.divs.push(this.textDiv);
	}
}

ListBox.prototype.onClick=function(index, event)
{
	console.log(event, index);
	if (this.selectedIndex!==-1)
	{
		this.divs[this.selectedIndex].className="textDiv";
	}
	this.selectedIndex=index;
	event.target.className=event.target.className+ " selected";
	this.inputBox.value=event.target.innerHTML;
}

ListBox.prototype.getElement=function()
{
	return this.mainDiv;
}