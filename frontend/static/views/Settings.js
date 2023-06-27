import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
	constructor(params) {
		super(params)
		this.setTitle("Settings")
	}

	async getHtml() {
		return `
            <h1>Settings</h1>
            <p>
                Here is the Settings view.
            </p>

        `
	}
}
