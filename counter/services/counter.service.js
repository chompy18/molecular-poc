"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "counter",

	/**
	 * Mixins
	 */
	mixins: [DbMixin("actions")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: ["_id", "name", "quantity"],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			price: "number|positive",
		},
	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		counter: {
			rest: {
				method: "GET",
				path: "/counter",
			},
			async handler() {
				return this.getById("t1D70gou15wwscua");
			},
		},

		// /**
		//  * Welcome, a username
		//  *
		//  * @param {String} name - User name
		//  */
		// welcome: {
		// 	rest: "/welcome",
		// 	params: {
		// 		name: "string"
		// 	},
		// 	/** @param {Context} ctx  */
		// 	async handler(ctx) {
		// 		return `Welcome, ${ctx.params.name}`;
		// 	}
		// }
	},

	/**
	 * Events
	 */
	events: {
		"counter.increment": {
			// Register handler to the "other" group instead of "payment" group.
			group: "other",
			async handler(ctx) {
				await this.adapter.updateById("t1D70gou15wwscua", {
					$inc: { quantity: 1 },
				});
				// console.log("Payload:", ctx.params);
				// console.log("Sender:", ctx.nodeID);
				// console.log("Metadata:", ctx.meta);
				// console.log("The called event name:", ctx.eventName);
			},
		},
		"counter.decrement": {
			// Register handler to the "other" group instead of "payment" group.
			group: "other",
			async handler(ctx) {
				await this.adapter.updateById("t1D70gou15wwscua", {
					$inc: { quantity: -1 },
				});
				// console.log("Payload:", ctx.params);
				// console.log("Sender:", ctx.nodeID);
				// console.log("Metadata:", ctx.meta);
				// console.log("The called event name:", ctx.eventName);

				// ctx.emit('counter.updated', { name: "counter", quantity: 0 })
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([{ name: "counter", quantity: 0 }]);
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
