/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {browserNodeBuiltinsPolyfill: {
  modules: {
    crypto: true,
    path: true,
    os: true,
  }
},ignoredRouteFiles: ['**/.*']}
// export default {
//   ignoredRouteFiles: ['**/.*'],
// }
