import Ember from "ember";

const MaxNotifications = 3;

const GlobalNotification = Ember.Object.extend({
	id: null,
	message: "",
	"class": "",
	hiding: false
});

export default Ember.Service.extend({
	idCounter: 0,
	notifications: Ember.A([]),

	addMessage(message, className, timeout){
		const notifications = this.get('notifications');
		const id = this.get('idCounter');
		notifications.pushObject(GlobalNotification.create({
			id: id,
			message: message,
			"class": className
		}));

		this.set('idCounter', id + 1);

		if (notifications.length > MaxNotifications){
			notifications.shiftObject();
		}

		Ember.run.later(this, this.removeNotification.bind(this, id), timeout);
	},

	addSuccess(message, timeout){
		this.addMessage(message, 'is-success', timeout);
	},

	addError(message, timeout){
		this.addMessage(message, 'is-danger', timeout);
	},

	addWarning(message, timeout){
		this.addMessage(message, 'is-warning', timeout);
	},

	removeNotification(id){
		const notifications = this.get('notifications');
		const notification = notifications.findBy('id', id);

		if (notification) {
			notifications.removeObject(notification);
		}
	}
});
