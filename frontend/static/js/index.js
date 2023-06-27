import Dashboard from "../views/Dashboard.js"
import Posts from "../views/Posts.js"
import Settings from "../views/Settings.js"
import PostView from "../views/PostView.js"

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$')

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]
    }))
}

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

const router = async() => {
    // console.log(pathToRegex('/posts/:id'))

    const routes = [
        { path: '/', view: Dashboard },
        { path: '/posts', view: Posts },
        { path: '/posts/:id', view: PostView },
        { path: '/settings', view: Settings },
        // { path: '/settings', view: () => console.log('Viewing Settings.') },
    ]

    // todo: the routes currently only match exact: "/posts/" or "/posts".

    // Text each route for potential match.
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            // isMatch: location.pathname === route.path,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })

    // let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match))

    document.querySelector('#app').innerHTML = await view.getHtml()

    // console.log(match.route.view())
}

window.addEventListener('popstate', router)

document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault()
        navigateTo(e.target.href)
    }
})

router()


// document.addEventListener('DOMContentLoaded', () => {
//     document.body.addEventListener('click', e => {
//         console.log(e.target)
//         if (e.target.matches('[data-link]')) {
//             e.preventDefault()
//             navigateTo(e.target.href)
//         }
//     })

//     router()
// })