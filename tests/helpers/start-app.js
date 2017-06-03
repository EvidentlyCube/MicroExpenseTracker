import Ember from "ember";
import Application from "../../app";
import config from "../../config/environment";

import "./lookup"

export default function startApp(attrs) {
	let attributes = Ember.merge({}, config.APP);
	attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

	return Ember.run(() => {
		let application = Application.create(attributes);

		application.setupForTesting();
		application.injectTestHelpers();

		window.localStorage.clear();

		application.dao = lookup('service:dao/model-daos');
		application.storage = lookup('service:storage/permanent-storage-service');
		application.optionsService = lookup('service:options-service');
		application.monthsService = lookup('service:months-service');

		application.dao.get('expense').clearMemory();
		application.dao.get('.category').clearMemory();
		application.optionsService.clearMemory();

		application.optionsService.setInstallationFinished(true);

		return application;
	});
}
