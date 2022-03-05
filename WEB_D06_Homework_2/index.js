import { UserInfomationPage } from "./components/user-infomation-page.js";

const app = document.getElementById('app');
const userInfomationPage = new UserInfomationPage();

app.appendChild(userInfomationPage.render());




