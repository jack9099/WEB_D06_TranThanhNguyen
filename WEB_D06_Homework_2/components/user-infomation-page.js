import { SearchBarGroup } from "./search-bar-group.js";
import { AvatarGroup } from "./avatar-group.js";
import { getDataUserFromGitHub } from "./get-data-user-from-github.js";
import { CardGroup } from "./card-group.js";

class UserInfomationPage {
    $container;

    $searchBarGroup;
    $cardsGroup;

    $avatarGroup;
    $userFullName;
    $userLocation;
    $userEmail;
    $userCompany;
    $userBio;
    $userBlog;
    $userTwitter;
    $userFollowers;
    $userFollowing;

    constructor(){
        this.$container = document.createElement('div');
        this.$container.classList.add('user-infomation-page-container');
        
        this.$searchBarGroup = new SearchBarGroup();
        this.$searchBarGroup.render().addEventListener('submit', this.handleSubmit);

        this.$cardsGroup = document.createElement('div');
        this.$cardsGroup.classList.add('cards-group');
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        const githubUserUrl = "https://api.github.com/users/" + this.$searchBarGroup.getInputValue();
        console.log(githubUserUrl);

    getDataUserFromGitHub(githubUserUrl)
        .then(githubUserData => {
            const data = JSON.parse(githubUserData);
            console.log(data);

            this.$avatarGroup = new AvatarGroup(data.avatar_url, data.login, data.id, data.html_url);
            this.$container.appendChild(this.$avatarGroup.render());

            this.$userFullName = new CardGroup(['fa-solid', 'fa-user'], 'FullName', data.name, '');
            this.$cardsGroup.appendChild(this.$userFullName.render());

            this.$userLocation = new CardGroup(['fa-solid', 'fa-earth-asia'], 'Location', data.location, '');
            this.$cardsGroup.appendChild(this.$userLocation.render());

            this.$userEmail = new CardGroup(['fa-solid', 'fa-envelope'], 'Email', data.email, 'Copy this email');
            this.$cardsGroup.appendChild(this.$userEmail.render());

            this.$userCompany = new CardGroup(['fa-solid', 'fa-building'], 'Company', data.company, 'Search Google for this company');
            this.$cardsGroup.appendChild(this.$userCompany.render());

            this.$userBio = new CardGroup(['fa-solid', 'fa-book-atlas'], 'Bio', data.bio, '');
            this.$cardsGroup.appendChild(this.$userBio.render());

            this.$userBlog = new CardGroup(['fa-brands', 'fa-blogger-b'], 'Blog', data.blog, 'Go to this Blog');
            this.$cardsGroup.appendChild(this.$userBlog.render());

            this.$userTwitter = new CardGroup(['fa-brands', 'fa-twitter'], 'Twiiter', data.twitter_username, 'Go to this Twitter');
            this.$cardsGroup.appendChild(this.$userTwitter.render());

            this.$userFollowers = new CardGroup(['fa-solid', 'fa-users'], 'Followers', data.followers, 'Show more');
            this.$cardsGroup.appendChild(this.$userFollowers.render());

            this.$userFollowing = new CardGroup(['fa-solid', 'fa-child'], 'Following', data.following, 'Show mone');
            this.$cardsGroup.appendChild(this.$userFollowing.render());
        })
        .catch(error => {
            alert('No User Found!');
            console.log(error);
        })
    }

    render(){
        this.$container.appendChild(this.$searchBarGroup.render());
        this.$container.appendChild(this.$cardsGroup);
        

        return this.$container;
    }
}

export { UserInfomationPage };