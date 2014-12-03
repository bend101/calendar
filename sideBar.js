/**
 * Created by Ben on 27/11/2014.
 */

function SideBar (calender)
{
	this.calender=calender;
	var container=document.createElement("div");

	this.themesArray=[ {name:"themeMountain",image:"themeImageOfMountain.png"},{name:"themeFlower",image:"themeImageOfFlowers.png"} ];

	container.innerHTML=
		'<div class="sidebar-container">'+
			'<p class="sidebar-chooseday">First day of the week</p>'+
			'<div class="sidebar-dropdownboxdiv">'+
				'<select id="dropDownBox" class="dropDownBox">'+
					'<option value="0">Sunday</option>'+
					'<option value="1">Monday</option>'+
					'<option value="2">Tuesday</option>'+
					'<option value="3">Wednesday</option>'+
					'<option value="4">Thursday</option>'+
					'<option value="5">Friday</option>'+
					'<option value="6">Saturday</option>'+
				'</select>'+
			'</div>'+
			'<div class="sidebar-themestitlediv">'+
				'<span class="spanThemes">Themes</span>'+
			'</div>'+
			'<div class="sidebar-listdiv">'+
				'<div class="sidebar-listplaceholder"></div>'+
			'</div>'+
			'<div class="sidebar-lastdiv">'+
				'<button class="common-button sidebar-applybutton">Apply</button>'+
			'</div>'+
		'</div>';

this.containingElement=container.querySelector(".sidebar-container");
	this.listBox= new ListBox(this.themesArray.length,null,this.listRenderer.bind(this));
	this.listBox.setSelectedIndex(0);
	this.listOfThemes = container.querySelector(".sidebar-listplaceholder");
	this.applyButton = container.querySelector(".sidebar-applybutton");
	this.dropDownBox = container.querySelector(".dropDownBox");
	this.listOfThemes.appendChild(this.listBox.getElement());
	this.applyButton.addEventListener("click",this.calender.onSidebarApplyClick.bind(this.calender));
}

SideBar.prototype.listRenderer=function(rowDiv,index)
{
	rowDiv.innerHTML= "<img class='sidebar-image' src='" + this.themesArray[index].image + "'/>";
}

SideBar.prototype.getElement=function()
{
	return this.containingElement;
}

SideBar.prototype.getSelectedTheme=function()
{
	return this.themesArray[this.listBox.getSelectedIndex()];
}

SideBar.prototype.getSelectedDay=function()
{
	var dropDownBox=document.getElementById("dropDownBox");
	return dropDownBox.options[dropDownBox.selectedIndex].value;
}
