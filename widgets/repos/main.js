define(['text!./repos.html', 'underscore'], function (tpl, _) {

  var template = _.template(tpl);

  return {
    
    defaultParams: {
      per_page: 100,
      page: 1
    },

    initialize: function () {
      _.bindAll(this);
      this.setupPath();
      this.setupParams();
      this.fetch();
    },

    setupParams: function() {
      var params = this.defaultParams;
      _.each(_.keys(this.defaultParams), function(key) {
        if (this.options[key] != undefined) {
          params[key] = this.options[key];
        }
      }.bind(this));
      this.params = params;
    },

    setupPath: function() {
      if (this.options.path) {
        this.owner = this.options.path.split("/")[0];
        this.path = this.options.path;
        if (!/\/repos$/.test(this.path)) {
          this.path = this.path + '/repos';
        }
      } else if (this.options.user) {
        this.owner = this.options.user;
        this.path = 'users/' + this.options.user + '/repos';
      } else if (this.options.org) {
        this.owner = this.options.org;
        this.path = 'orgs/' + this.options.org + '/repos';
      } else {
        this.owner = 'user';
        this.path = 'user/repos';
      }
    },

    fetch: function() {
      if (!this.path) return;
      this.sandbox.github(this.path, 'get', this.params).then(function(repos){
        // Remove forked repositories 
        // we have to do this client side, Github API does not seem
        // to allow filtering on unauthenticated calls
        repos = _.reject(repos, function(repo) {
          return (repo.fork);
        });
        // And sort by popularity
        repos = _.sortBy(repos, function(repo) {
          return -1 * repo.watchers_count;
        });
        this.render(repos);
      }.bind(this));
    },

    render: function (repos) {
      this.html(template({
        repos: repos,
        relativeTime: this.sandbox.relativeTime,
        _: _
      }));
      this.sandbox.dom.attachEvents(this.events, this);
    },

    events: {
      'click .item-content': function(e) {
        if(!$(e.target).is('a')){
          var href = e.currentTarget.getAttribute('data-href');
          window.open(href);
        }
      }
    }
  };

});
