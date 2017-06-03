import Ember from "ember";

export default Ember.Service.extend({
	download(data, fileName, mimeType){
		if (window.hasOwnProperty('download')) {
			window.download(data, fileName, mimeType);
		} else {
			console.error("Downloadjs was not imported"); // eslint-disable-line no-console
		}
	}
});
