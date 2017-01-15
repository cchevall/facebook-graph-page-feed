"use strict";

class _SettingsException {

    /**
     * constructor
     * @param  {[string]} message
     */
    constructor(message) {
        this.initMessages();
        this.name = "Settings Exception";
        if (typeof this.messages[message] === "undefined") {
            this.message = "There is an issue with your settings, please read the README.md of this package (cchevallay:facebook-graph-page-feed)";
        }
        this.message = this.messages[message];
    }

    /**
     * initMessages
     * sets bunch of settings related error messages.
     */
    initMessages() {
        this.messages = {
            "settingsMissing" : "You need to specify a 'facebook-graph-page-feed' index in your settings.json file and start meteor specifying this file: 'meteor --settings settings.json'. Please read the README.md documentation.",
            "appIdMissing" : "You need to specify a 'facebook-app-id' index in your settings.json file and start meteor specifying this file: 'meteor --settings settings.json'. Please read the README.md documentation.",
            "appSecretMissing" : "You need to specify a 'facebook-app-secret' index in your settings.json file and start meteor specifying this file: 'meteor --settings settings.json. Please read the README.md documentation.'",
            "pageIdMissing" : "You need to specify a 'facebook-page-id' index in your settings.json file and start meteor specifying this file: 'meteor --settings settings.json. Please read the README.md documentation.'"
        };
    }
}

export const SettingsException = _SettingsException;
