#!/usr/bin/env node

const pkg = require('./package.json');
var fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');

const buildSHA_path = './buildSHA.json';
const PKG_PATH = './package.json';
const PACKAGE_FULL_PATH = path.join(process.cwd(), PKG_PATH);
const BUILD_UUID_FILE_FULL_PATH = path.join(process.cwd(), buildSHA_path);
const FORMAT = 'utf8';

console.log({ pkg });
if (fs.existsSync(PACKAGE_FULL_PATH)) {
	const randomUUID = uuid();
	pkg.lastBuild = randomUUID;
	const json = JSON.stringify(pkg, null, 4);
	fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);

	// commit optionnally
} else {
	console.log('no package.json found, sowwy :)');
}

// on postbuild :

console.log({ PACKAGE_FULL_PATH, BUILD_UUID_FILE_FULL_PATH });

// if (fs.existsSync('./buildSHA.json')) {
// 	const json = JSON.stringify({ lastBuild: SHA }, null, 4);
// 	fs.writeFileSync(PACKAGE_FULL_PATH, json, FORMAT);
// }
// on fonctionne avec un fichier en gitignore ( la ref locale pour le build)
// et une entrée dans le package.json qui est updatée à chaque modification des packages ( add/update )
