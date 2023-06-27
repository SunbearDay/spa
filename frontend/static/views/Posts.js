import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
	constructor(params) {
		super(params)
		this.setTitle("Posts")
	}

	async getHtml() {
		return `
            <h1>Posts</h1>
            <p>
                Here is the Posts view.
            </p>

        `
	}
}
