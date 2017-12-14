export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Patient Order Tracking'
  },
  {
    name: 'Standard Orders',
    url: '/referrals',
    icon: 'icon-note',
    children: [
      {
        name: 'Create New',
        url: '/orders/new'
      },
      {
        name: 'View/Edit',
        url: '/orders/view'
      }
    ]
  },
];
// Old default navigation from Core UI, keeping for the sake of looking back if need be.
// export const navigation = [
//   {
//     name: 'Dashboard',
//     url: '/dashboard',
//     icon: 'icon-speedometer',
//     badge: {
//       variant: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     title: true,
//     name: 'Patient Order Tracking'
//   },
//   {
//     name: 'Standard Orders',
//     url: '/referrals',
//     icon: 'icon-note',
//     children: [
//       {
//         name: 'Create New',
//         url: '/orders/new'
//       },
//       {
//         name: 'View/Edit',
//         url: '/orders/view'
//       }
//     ]
//   },

//   {
//     title: true,
//     name: 'UI elements'
//   },
//   {
//     name: 'Components',
//     url: '/components',
//     icon: 'icon-puzzle',
//     children: [
//       {
//         name: 'Buttons',
//         url: '/components/buttons',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Social Buttons',
//         url: '/components/social-buttons',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Cards',
//         url: '/components/cards',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Forms',
//         url: '/components/forms',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Modals',
//         url: '/components/modals',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Switches',
//         url: '/components/switches',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tables',
//         url: '/components/tables',
//         icon: 'icon-puzzle'
//       },
//       {
//         name: 'Tabs',
//         url: '/components/tabs',
//         icon: 'icon-puzzle'
//       }
//     ]
//   },
//   {
//     name: 'Icons',
//     url: '/icons',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'Font Awesome',
//         url: '/icons/font-awesome',
//         icon: 'icon-star',
//         badge: {
//           variant: 'secondary',
//           text: '4.7'
//         }
//       },
//       {
//         name: 'Simple Line Icons',
//         url: '/icons/simple-line-icons',
//         icon: 'icon-star'
//       }
//     ]
//   },
//   {
//     name: 'Forms',
//     url: '/forms',
//     icon: 'icon-note',
//     children: [
//       {
//         name: 'Basic Forms',
//         url: '/forms/basic-forms',
//         icon: 'icon-note'
//       },
//       {
//         name: 'Advanced Forms',
//         url: '/forms/advanced-forms',
//         icon: 'icon-note'
//       },
//       {
//         name: 'Example Referrals',
//         url: '/forms/basic-forms',
//         icon: 'icon-note'
//       },
//       {
//         name: 'Example Referrals 2',
//         url: '/forms/advanced-forms',
//         icon: 'icon-note'
//       }
//     ]
//   },
//   {
//     name: 'Editors',
//     url: '/editors',
//     icon: 'fa fa-code',
//     children: [
//       {
//         name: 'Text Editors',
//         url: '/editors/text-editors',
//         icon: 'icon-note'
//       },
//       {
//         name: 'Code Editors',
//         url: '/editors/code-editors',
//         icon: 'fa fa-code'
//       }
//     ]
//   },
//   {
//     name: 'Plugins',
//     url: '/plugins',
//     icon: 'icon-energy',
//     children: [
//       {
//         name: 'Calendar',
//         url: '/plugins/calendar',
//         icon: 'icon-calendar'
//       },
//       {
//         name: 'DataTable',
//         url: '/plugins/datatable',
//         icon: 'icon-menu'
//       },
//       {
//         name: 'Draggable Cards',
//         url: '/plugins/draggable-cards',
//         icon: 'icon-cursor-move'
//       },
//       {
//         name: 'Loading Buttons',
//         url: '/plugins/loading-buttons',
//         icon: 'icon-cursor'
//       },
//       {
//         name: 'Notifications',
//         url: '/plugins/notifications',
//         icon: 'icon-info'
//       },
//       {
//         name: 'Spinners',
//         url: '/plugins/spinners',
//         icon: 'fa fa-spinner'
//       },
//     ]
//   },
//   {
//     name: 'Widgets',
//     url: '/widgets',
//     icon: 'icon-calculator',
//     badge: {
//       variant: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     name: 'Charts',
//     url: '/charts',
//     icon: 'icon-pie-chart'
//   },
//   {
//     divider: true
//   },
//   {
//     title: true,
//     name: 'Extras',
//   },
//   {
//     name: 'Pages',
//     url: '/pages',
//     icon: 'icon-star',
//     children: [
//       {
//         name: 'Login',
//         url: '/pages/login',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Register',
//         url: '/pages/register',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 404',
//         url: '/pages/404',
//         icon: 'icon-star'
//       },
//       {
//         name: 'Error 500',
//         url: '/pages/500',
//         icon: 'icon-star'
//       }
//     ]
//   },
//   {
//     name: 'UI Kits',
//     url: '/uikits',
//     icon: 'icon-layers',
//     children: [
//       {
//         name: 'Invoicing',
//         url: '/uikits/invoicing',
//         icon: 'icon-speech',
//         children: [
//           {
//             name: 'Invoice',
//             url: '/uikits/invoicing/invoice',
//             icon: 'icon-speech'
//           }
//         ]
//       },
//       {
//         name: 'Email',
//         url: '/uikits/email',
//         icon: 'icon-speech',
//         children: [
//           {
//             name: 'Inbox',
//             url: '/uikits/email/inbox',
//             icon: 'icon-speech'
//           },
//           {
//             name: 'Message',
//             url: '/uikits/email/message',
//             icon: 'icon-speech'
//           },
//           {
//             name: 'Compose',
//             url: '/uikits/email/compose',
//             icon: 'icon-speech'
//           }
//         ]
//       }
//     ]
//   }
// ];
