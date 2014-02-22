require(['aura/aura'], function (Aura) {
  var app = new Aura({
    github: { }
  });
  app.use('assets/js/extensions/aura-github');
  app.use('assets/js/extensions/aura-attachEvents');
  app.use(function(app) {
    window.App = app.createSandbox();
  });
  app.use('assets/js/extensions/aura-time');
  app.start({ widgets: 'body' });
});