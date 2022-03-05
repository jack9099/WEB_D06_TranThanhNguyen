import { setScreen } from "./set-screen.js";
import { UserInfomationPage } from "./user-infomation-page.js"
import { getDataUserFromGitHub } from "./get-data-user-from-github.js";

class SearchBarGroup {
    $container;

    $title;
    $searchForm;
    $searchInput;
    $searchBtn;
    $searchIcon;
    $link;

    $loginName;
    $Id;
    $avatarUrl;

    

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('search-bar-container');

        this.$title = document.createElement('div');
        this.$title.classList.add('title');
        this.$title.innerHTML = 'GITHUB USER INFOMATION';
 
        this.$searchInput = document.createElement('input');
        this.$searchInput.classList.add('search-input');
        this.$searchInput.placeholder = 'Search...';

        this.$searchForm = document.createElement('form');
        this.$searchForm.classList.add('search-form');

        this.$searchBtn = document.createElement('button');
        this.$searchBtn.classList.add('search-btn');
        this.$searchBtn.type = 'submit';

        this.$searchIcon = document.createElement('i');
        this.$searchIcon.classList.add('fa', 'fa-search');
    }

    getInputValue() {
        return this.$searchInput.value;
    }

    render() {
        this.$searchBtn.appendChild(this.$searchIcon);

        this.$searchForm.appendChild(this.$searchInput);
        this.$searchForm.appendChild(this.$searchBtn);

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$searchForm);

        return this.$container;
    }
}

export { SearchBarGroup };

