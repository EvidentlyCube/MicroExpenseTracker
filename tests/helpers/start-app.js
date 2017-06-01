import Ember from "ember";
import Application from "../../app";
import config from "../../config/environment";

export default function startApp(attrs) {
	let attributes = Ember.merge({}, config.APP);
	attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

	return Ember.run(() => {
		let application = Application.create(attributes);
		application.setupForTesting();
		application.injectTestHelpers();

		window.localStorage.clear();

		application.lookup = function(name){
			return application.__container__.lookup(name);
		};

		application.dao = application.lookup('service:dao/model-daos');
		application.storage = application.lookup('service:storage/permanent-storage-service');
		application.optionsService = application.lookup('service:options-service');

		application.dao.get('expense').clearMemory();
		application.dao.get('.category').clearMemory();
		application.optionsService.clearMemory();

		application.optionsService.setInstallationFinished(true);

		return application;
	});
}
