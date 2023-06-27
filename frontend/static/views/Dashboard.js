import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.setTitle('Dashboard')
    }

    async getHtml() {
        return `
            <h1>Welcome back, DOM</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vero quasi, aut debitis hic, sunt dolor dolores vitae dicta quisquam deserunt illum tempora molestias a? Deserunt pariatur quod explicabo iste.
            </p>
            <p>
                <a href='/posts' data-link>View recent posts</a>
            </p>
        `
    }
}