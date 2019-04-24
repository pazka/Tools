const fs = require('fs');
const path = require('path');

//windows command to copy an arborescence without the files : xcopy /t /e "C:\Your Folder" "C:\New Folder"

function flatten(lists) {
	return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
	var dirs = fs.readdirSync(srcpath)
	.map(file => path.join(srcpath, file))
	.filter(path => fs.statSync(path).isDirectory());

	if(dirs.length == 0){
		fs.writeFile(path.join(srcpath,"form.ascx"), "<lol> this is text</lol>")
		fs.writeFile(path.join(srcpath,"code.ascx.cs"), "var lol = 'this is code';")
		fs.writeFile(path.join(srcpath,"script.js"), "var lol = 'this is js';")
		fs.writeFile(path.join(srcpath,"style.css"), ".styel{color:black}")
		fs.writeFile(path.join(srcpath,"osef.xml"), "<osef></osef>")
		return [];
	}else{
		return dirs;
	}
}

function getDirectoriesRecursive(srcpath) {
	return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}

getDirectoriesRecursive("C:\\Users\\alexandre\\Documents\\Tests\\fakemaestro\\Projets\\");
