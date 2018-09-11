import { MockRequest } from '@delon/mock';




function getNavMenu(): any {
  return [
    {title : 'home', link: 'home', des: '首页' },
    {title: 'docs',  link:'docs', des: '文档'},
    {title: 'guides',link:'guides', des: '入门' }
  ]
}

function getSideNavMenu(): any[] {
  return [
    {
      routerFlag: 'dashboard',
      header : {
        icon: 'dashboard',
        description: 'dashboard',
      },
      lists: [
        {link: '/dashboard/dashboard', linkTitle: 'dashboard' },
        {link: '/dashboard/analysis', linkTitle: 'analysis' },
        {link: '/dashboard/monitor', linkTitle: 'monitor' },
        {link: '/dashboard/workplace', linkTitle: 'workplace' }
      ]
    },
    {
      routerFlag: 'maps',
      header : {
        icon: 'map',
        description: 'maps',
      },
      lists: [
        {link: '/maps/baidu', linkTitle: 'baidu' },
        {link: '/maps/minemap', linkTitle: 'minemap' },
      ]
    },
    {
      routerFlag: 'charts',
      header : {
        icon: 'pie_chart',
        description: 'charts',
      },
      lists: [
        {link: '/charts/echarts', linkTitle: 'echarts' },
      ]
    }
  ]
}

export const APIS = {
  '/api/navmenu': () => getNavMenu(),
  '/api/sidenavmenu': () => getSideNavMenu(),
};
