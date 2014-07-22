var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var superagent = require('superagent');


gulp.task('default', function (cb) {

	var url = 'http://quilljs.com/js/quill.js';

	if(!fs.existsSync('quilljs')) {
		fs.mkdirSync('quilljs');
	}
	var agent = superagent.get(url)
				.end(function (err, res) {
					if(err || res.status !== 200) {
						console.log(err);
					}
				});
	var writer = fs.createWriteStream(path.resolve('quilljs', 'quill.js'));
	agent.pipe(writer);
	writer.on('error', function(err) {
		console.log(err);
	});
	writer.on('end', function() {
		cb();
	});

});
