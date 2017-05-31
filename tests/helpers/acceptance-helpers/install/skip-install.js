export default function(context) {
	(function () {
		visit('/install');
		click('.install-route .start-button');
	}).call(context);
}