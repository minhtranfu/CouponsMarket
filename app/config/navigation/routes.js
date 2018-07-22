import { FontIcons } from '../../assets/icons';
import * as Screens from '../../screens/index';
import _ from 'lodash';

export const MainRoutes = [
  {
    id: 'CouponCreate',
    title: 'Create Coupon',
    icon: FontIcons.mobile,
    screen: Screens.CouponCreate,
    children: []
  },
  {
    id: 'SettingApp',
    title: 'Settings',
    icon: FontIcons.profile,
    screen: Screens.SettingApp,
    children: []
  },
  {
    id: 'SendReport',
    title: 'Send Report',
    icon: FontIcons.profile,
    screen: Screens.SendReport,
    children: []
  },
  {
    id: 'ListCoupon',
    title: 'List Coupon',
    icon: FontIcons.mobile,
    screen: Screens.ListCoupon,
    children: [
      {
        id: 'CouponView',
        title: 'View Coupon',
        icon: FontIcons.mobile,
        screen: Screens.CouponView,
        children: []
      },
      {
        id: 'Comments',
        title: 'Comments',
        screen: Screens.Comments,
        children: []
      },
    ]
  },
  {
    id: 'Profile',
    title: 'User Profile',
    icon: FontIcons.profile,
    screen: Screens.Profile,
    children: [
      {
        id: 'ProfileV3',
        title: 'User Profile',
        screen: Screens.ProfileV3,
        children: []
      },
    ]
  },
  {
    id: 'Login',
    title: 'Login',
    screen: Screens.LoginV1,
    children: [
      {
        id: 'SignUp',
        title: 'Sign Up',
        screen: Screens.SignUp,
        children: []
      },
    ]
  },
  {
    id: 'Walkthrough',
    title: 'Walkthrough',
    screen: Screens.WalkthroughScreen,
    children: []
  },
  // {
  //   id: 'LoginMenu',
  //   title: 'Auth',
  //   icon: FontIcons.login,
  //   screen: Screens.LoginMenu,
  //   children: [
  //     {
  //       id: 'Login',
  //       title: 'Login V1',
  //       screen: Screens.LoginV1,
  //       children: []
  //     },
  //     {
  //       id: 'Login2',
  //       title: 'Login V2',
  //       screen: Screens.LoginV2,
  //       children: []
  //     },
  //     {
  //       id: 'SignUp',
  //       title: 'Sign Up',
  //       screen: Screens.SignUp,
  //       children: []
  //     },
  //     {
  //       id: 'password',
  //       title: 'Password Recovery',
  //       screen: Screens.PasswordRecovery,
  //       children: []
  //     },
  //   ]
  // },
  // {
  //   id: 'SocialMenu',
  //   title: 'Social',
  //   icon: FontIcons.profile,
  //   screen: Screens.SocialMenu,
  //   children: [
  //     {
  //       id: 'ProfileV1',
  //       title: 'User Profile V1',
  //       screen: Screens.ProfileV1,
  //       children: []
  //     },
  //     {
  //       id: 'ProfileV2',
  //       title: 'User Profile V2',
  //       screen: Screens.ProfileV2,
  //       children: []
  //     },
  //     {
  //       id: 'ProfileV3',
  //       title: 'User Profile V3',
  //       screen: Screens.ProfileV3,
  //       children: []
  //     },
  //     {
  //       id: 'ProfileSettings',
  //       title: 'Profile Settings',
  //       screen: Screens.ProfileSettings,
  //       children: []
  //     },
  //     {
  //       id: 'Notifications',
  //       title: 'Notifications',
  //       screen: Screens.Notifications,
  //       children: []
  //     },
  //     {
  //       id: 'Contacts',
  //       title: 'Contacts',
  //       screen: Screens.Contacts,
  //       children: []
  //     },
  //     {
  //       id: 'Feed',
  //       title: 'Feed',
  //       screen: Screens.Feed,
  //       children: []
  //     },
  //   ]
  // },
  // {
  //   id: 'ArticlesMenu',
  //   title: 'Articles',
  //   icon: FontIcons.article,
  //   screen: Screens.ArticleMenu,
  //   children: [
  //     {
  //       id: 'Articles1',
  //       title: 'Article List V1',
  //       screen: Screens.Articles1,
  //       children: []
  //     },
  //     {
  //       id: 'Articles2',
  //       title: 'Article List V2',
  //       screen: Screens.Articles2,
  //       children: []
  //     },
  //     {
  //       id: 'Articles3',
  //       title: 'Article List V3',
  //       screen: Screens.Articles3,
  //       children: []
  //     },
  //     {
  //       id: 'Articles4',
  //       title: 'Article List V4',
  //       screen: Screens.Articles4,
  //       children: []
  //     },
  //     {
  //       id: 'Blogposts',
  //       title: 'Blogposts',
  //       screen: Screens.Blogposts,
  //       children: []
  //     },
  //     {
  //       id: 'Article',
  //       title: 'Article View',
  //       screen: Screens.Article,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   id: 'MessagingMenu',
  //   title: 'Messaging',
  //   icon: FontIcons.mail,
  //   screen: Screens.MessagingMenu,
  //   children: [
  //     {
  //       id: 'Chat',
  //       title: 'Chat',
  //       screen: Screens.Chat,
  //       children: []
  //     },
  //     {
  //       id: 'ChatList',
  //       title: 'Chat List',
  //       screen: Screens.ChatList,
  //       children: []
  //     },
  //     {
  //       id: 'Comments',
  //       title: 'Comments',
  //       screen: Screens.Comments,
  //       children: []
  //     },
  //   ]
  // },
  // {
  //   id: 'DashboardsMenu',
  //   title: 'Dashboards',
  //   icon: FontIcons.dashboard,
  //   screen: Screens.DashboardMenu,
  //   children: [{
  //     id: 'Dashboard',
  //     title: 'Dashboard',
  //     screen: Screens.Dashboard,
  //     children: []
  //   },]
  // },
  // {
  //   id: 'WalkthroughMenu',
  //   title: 'Walkthroughs',
  //   icon: FontIcons.mobile,
  //   screen: Screens.WalkthroughMenu,
  //   children: [{
  //     id: 'Walkthrough',
  //     title: 'Walkthrough',
  //     screen: Screens.WalkthroughScreen,
  //     children: []
  //   }]
  // },
  // {
  //   id: 'EcommerceMenu',
  //   title: 'Ecommerce',
  //   icon: FontIcons.card,
  //   screen: Screens.EcommerceMenu,
  //   children: [
  //     {
  //       id: 'Cards',
  //       title: 'Cards',
  //       icon: FontIcons.card,
  //       screen: Screens.Cards,
  //       children: []
  //     },
  //     {
  //       id: 'AddToCardForm',
  //       title: 'Add Card Form',
  //       icon: FontIcons.addToCardForm,
  //       screen: Screens.AddToCardForm,
  //       children: []
  //     },

  //   ]
  // },
  // {
  //   id: 'NavigationMenu',
  //   icon: FontIcons.navigation,
  //   title: 'Navigation',
  //   screen: Screens.NavigationMenu,
  //   children: [
  //     {
  //       id: 'GridV1',
  //       title: 'Grid Menu V1',
  //       screen: Screens.GridV1,
  //       children: []
  //     },
  //     {
  //       id: 'GridV2',
  //       title: 'Grid Menu V2',
  //       screen: Screens.GridV2,
  //       children: []
  //     },
  //     {
  //       id: 'List',
  //       title: 'List Menu',
  //       screen: Screens.ListMenu,
  //       children: []
  //     },
  //     {
  //       id: 'Side',
  //       title: 'Side Menu',
  //       action: 'DrawerOpen',
  //       screen: Screens.SideMenu,
  //       children: []
  //     }
  //   ]
  // },
  {
    id: 'Settings',
    title: 'Settings',
    screen: Screens.Settings,
    children: []
  },
  // {
  //   id: 'Themes',
  //   title: 'Themes',
  //   icon: FontIcons.theme,
  //   screen: Screens.Themes,
  //   children: []
  // },
  {
    id: 'Logout',
    title: 'Logout',
    screen: Screens.Logout,
    children: []
  }
];

let menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift(
  {
    id: 'HomeMain',
    title: 'List Coupon',
    icon: FontIcons.mobile,
    screen: Screens.ListCoupon,
    children: []
  }
);

export const MenuRoutes = menuRoutes;
