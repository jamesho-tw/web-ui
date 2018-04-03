module.exports = {
  getRestUrl: function (path) {
    return process.env.REST_API_URL.concat(path);
  },
  getUserinfo: function () {
    var result = {};
    try {
      result = JSON.parse(atob(localStorage['USERINFO']));
    } catch (error) {
      console.log(error);
      result = {};
    }
    finally {
      return result;
    }
  },
  getAuthorization: function () {
    var userinfo = this.getUserinfo();
    var tokenType = (userinfo.token.token_type) ? userinfo.token.token_type : 'Bearer';
    var accessToken = (userinfo.token.access_token) ? userinfo.token.access_token : '';
    return tokenType.concat(' ').concat(accessToken);
  }
}