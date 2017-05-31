import Ember from "ember";

const IsHttpOrHttps = /^https?:\/\//;
const StripStartingSlashes = /^\/+/;

export default Ember.Helper.extend({
	compute([url]) {
		if (IsHttpOrHttps.test(url)){
			return url;
		} else {
			const rootUrl = Ember.getOwner(this).lookup('router:main').get('rootURL');
			return rootUrl + url.replace(StripStartingSlashes, '');
		}
	}
});