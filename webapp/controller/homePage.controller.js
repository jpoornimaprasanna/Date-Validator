sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/m/MessageToast",
], function (Controller, DateFormat, MessageToast) {
	"use strict";

	return Controller.extend("datetime.DateTime.controller.homePage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf datetime.DateTime.view.homePage
		 */
		onInit: function () {
			var dateFormat = DateFormat.getDateInstance({
				pattern: "yyyy-MMM-dd"
			});
			this.getOwnerComponent().getModel("homeModel").setProperty("/Year", []);
			var oDate = new Date();
			// oDate.setDate(oDate.getDate() - 1);
			oDate.setDate(oDate.getDate());
			var sDate = dateFormat.format(oDate);
			var stringYear = sDate.substr(0, 4);
			var year = Number(stringYear);
			var oObj;
			var startYear = year - 60;
			this.getOwnerComponent().getModel("homeModel").setProperty("/leapYear", false);
			for (var i = 0; i < 120; i++) {
				startYear = startYear + 1;
				oObj = {
					"year": startYear
				};
				this.getOwnerComponent().getModel("homeModel").getProperty("/Year").push(oObj);
				console.log(this.getOwnerComponent().getModel("homeModel").getProperty("/Year").length);
			}

		},

		onChangeDay: function (oEvent) {
			// var sSelectedDay =  this.getOwnerComponent().getModel("data").getProperty("/selDay");
			var sSelectedDay = oEvent.getSource().getValue();
			this.getOwnerComponent().getModel("data").setProperty("/Day", sSelectedDay);
			this.validate();
		},
		onChangeMonth: function (oEvent) {
			// var sSelectedMonth =  this.getOwnerComponent().getModel("data").getProperty("/selMonth");
			var sSelectedMonth = oEvent.getSource().getValue();
			this.getOwnerComponent().getModel("data").setProperty("/Month", sSelectedMonth);
			this.validate();
		},
		onChangeYear: function (oEvent) {
			// var sSelectedYear =  this.getOwnerComponent().getModel("homeModel").getProperty("/selYear");
			var sSelectedYear = oEvent.getSource().getValue();
			this.getOwnerComponent().getModel("homeModel").setProperty("/selectedYear", sSelectedYear);
			this.validate();
		},

		validate: function () {
			this.getOwnerComponent().getModel("homeModel").setProperty("/leapYear", false);
			var selDay = Number(this.getOwnerComponent().getModel("data").getProperty("/Day"));
			var selMonth = this.getOwnerComponent().getModel("data").getProperty("/Month");
			var selctedYear = Number(this.getOwnerComponent().getModel("homeModel").getProperty("/selectedYear"));

			var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			if (selMonth) {
				// if (selMonth === "Jan" || "Mar" || "May" || "Jul" || "Aug" || "Oct" || "Dec") {

				// }
				// if (selMonth === "Apr" || "Jun" || "Sep" || "Nov") {

				// }
				if (selMonth === "Feb") {
					if ((!(selctedYear % 4) && selctedYear % 100) || !(selctedYear % 400)) {
						this.getOwnerComponent().getModel("homeModel").setProperty("/leapYear", true);
					}
					var lyear = this.getOwnerComponent().getModel("homeModel").getProperty("/leapYear");
					if ((lyear == false) && (selDay >= 29)) {
						MessageToast.show("Invalid date format!");
						return false;
					}
					if ((lyear == true) && (selDay > 29)) {
						MessageToast.show("Invalid date format!");
						return false;
					}

				}
				// if (selMonth === "Jan" || "Mar" || "May" || "Jul" || "Aug" || "Oct" || "Dec") {
				// 	if(){
				// 		selDay
				// 	}

				// }
				if (selMonth === "Apr" || selMonth === "Jun" || selMonth === "Sep" || selMonth === "Nov") {
					if (selDay > 30) {
						MessageToast.show("Invalid date format!");
					}

				}

			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf datetime.DateTime.view.homePage
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf datetime.DateTime.view.homePage
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf datetime.DateTime.view.homePage
		 */
		//	onExit: function() {
		//
		//	}

	});

});