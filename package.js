Package.describe({
	name: 'alisalaah:hijri-tools',
	summary: 'Tools for converting Gregorian and Hijri dates plus template for public converter',
	version: '1.1.0',
	git: 'https://github.com/alisalaah/meteor-hijri-tools.git'
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.2');
	api.use(['ui'], 'client');
	api.use(['blaze'], 'client');
	api.use(['templating'], 'client');
	
    api.add_files("hijritools.html", "client");
	api.add_files("hijritools.js", "client");
});
