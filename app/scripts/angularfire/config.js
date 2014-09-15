angular.module('firebase.config', [])
  .constant('FBURL', 'https://outdoola1.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');