class CardGroup {
    $container;

    $row;
    $cardIcon;
    $cardName;
    $cardInfo;

    $btnMoreActions;
    $btnCheck;

    constructor(iconSrc, cardName, cardInfo, btnText) {
        this.$container = document.createElement('div');
        this.$container.classList.add('cards');

        this.$row = document.createElement('div');
        this.$row.classList.add('row');
            this.$cardIcon = document.createElement('i');
            this.$cardIcon.classList.add(...iconSrc);
            this.$cardName = document.createElement('div');
            this.$cardName.innerHTML = cardName;
        this.$cardInfo = document.createElement('p');
        this.$cardInfo.innerHTML = cardInfo;

        this.$btnMoreActions = document.createElement('button');
        this.$btnMoreActions.innerHTML = btnText;
            let arrow = document.createElement('i');
                arrow.classList.add('fa-solid', 'fa-arrow-right');
                arrow.style.marginLeft = '5px';
            this.$btnMoreActions.appendChild(arrow);
        this.$btnMoreActions.addEventListener('click', this.handleMoreActions);

        this.$btnCheck = cardName;
        if (cardName == 'FullName' || cardName == 'ID' || cardName == 'Location' || cardName == 'Hireable' || cardName == 'Bio'){
            this.$btnMoreActions.style.display = 'none';
        }
        if (cardInfo == null || cardInfo == "" || cardInfo == 0) {
            this.$btnMoreActions.style.display = 'none';
            this.$container.style.background = 'grey';
        }
    }

    handleMoreActions = () =>{
        if (this.$btnCheck == 'Company') {
            let linkToGoogle = 'https:/www.google.com/search?q=' + this.$cardInfo.innerHTML;
            window.open(linkToGoogle, '_blank'); //Search Google 
        } else if (this.$btnCheck == 'Email') {
            navigator.clipboard.writeText(this.$cardInfo.innerHTML); //Copy email to clipboard
            alert('Copied!');
        } else if (this.$btnCheck == 'Blog') {
            let linkToBlog = this.$cardInfo.innerHTML;
            window.open(linkToBlog, '_blank'); //Go to Blog
        } else if (this.$btnCheck == 'Twitter') {
            let linkToTwitter = 'https:/www.twitter.com/' + this.$cardInfo.innerHTML;
            window.open(linkToTwitter, '_blank'); //Go to Twitter;
        }
    }

    render() {
        this.$row.appendChild(this.$cardIcon);
        this.$row.appendChild(this.$cardName);

        this.$container.appendChild(this.$row);
        this.$container.appendChild(this.$cardInfo);
        this.$container.appendChild(this.$btnMoreActions);

        return this.$container;
    }
}

export { CardGroup };