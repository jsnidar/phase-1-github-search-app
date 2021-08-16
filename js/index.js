// You are going to build a JavaScript application which searches GitHub for users by name and displays the results on the screen. Clicking on a specific user will show all the repositories for that user.

// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.


document.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('sbmt')
    submit.addEventListener('click', (event) => {
        const input = document.querySelector('#search').value
        getUserInfo(input)
        event.preventDefault();
    })
})

function getUserInfo(input) {
    fetch(`https://api.github.com/search/users?q=${input}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
          },
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('#user-list').innerHTML = ''
        data.items.forEach(user => renderOneUser(user))
    })
}

function renderOneUser(user) {
    avatar = user.avatar_url
    userName = user.login
    url = user['html_url']

    const userCard = document.createElement('li')
    userCard.className = 'userCards'
    userCard.id = userName
    userCard.innerHTML = 
        `<div>
            <p>
            <img src= ${avatar} class = 'avatars' heigth="30px"; width="30px">
            ${userName}
            <a href= ${url}>${url}</a>
            </p> 
        </div>`
    document.querySelector('#user-list').appendChild(userCard)
    userCard.addEventListener('click', (event) => {
        debugger;
        const repoOwner = event.target.parentNode.parentNode.id
        fetch(`https://api.github.com/users/${repoOwner}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
          },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('repos-list').innerHTML = ''
            data.forEach(repo => createRepos(repo['full_name']))
        })
    })
}

function createRepos(repoName) {
    const li = document.createElement('li')
    li.innerText = repoName
    document.getElementById('repos-list').appendChild(li)
}
// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.) 

// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.