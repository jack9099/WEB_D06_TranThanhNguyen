class AvatarGroup {
    $container;
    
    $avatarImg;
    $loginName;
    $userId;

    $githubLinkContainer;
    $githubIcon;
    $githubLink;
    $btnOpenLink;

    constructor(imgSrc, loginName, userId, githubLink) {
        this.$container = document.createElement('div');
        this.$container.classList.add('avatar-group-container');

        this.$avatarImg =  document.createElement('img');
        this.$avatarImg.src = imgSrc;

        this.$loginName = document.createElement('div');
        this.$loginName.classList.add('login-name');
        this.$loginName.innerHTML = loginName;

        this.$userId = document.createElement('div');
        this.$userId.classList.add('user-id');
        this.$userId.innerHTML = 'ID: ' + userId;

        this.$githubLinkContainer = document.createElement('div');
        this.$githubLinkContainer.classList.add('github-link-container');

        this.$githubIcon = document.createElement('i');
        this.$githubIcon.classList.add('fa-brands', 'fa-github');

        this.$githubLink = document.createElement('div');
        this.$githubLink.classList.add('github-link');
        this.$githubLink.innerHTML = githubLink;

        this.$btnOpenLink = document.createElement('button');
        this.$btnOpenLink.classList.add('btn-open-link');
        this.$btnOpenLink.innerHTML = 'Open in Github.com';
        this.$btnOpenLink.addEventListener('click', () => {window.open(githubLink, '_blank')});
    }

    render() {
        this.$githubLinkContainer.appendChild(this.$githubIcon);
        this.$githubLinkContainer.appendChild(this.$githubLink);

        this.$container.appendChild(this.$avatarImg);
        this.$container.appendChild(this.$loginName);
        this.$container.appendChild(this.$userId);
        this.$container.appendChild(this.$githubLinkContainer);
        this.$container.appendChild(this.$btnOpenLink);

        return this.$container;
    }
}

export { AvatarGroup };