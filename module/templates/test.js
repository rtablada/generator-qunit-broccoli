import <%= functionName %> from '<%= pathToModule %>';

module('<%= utils.slug(moduleName) %>', () => {
  test('it exists', (assert) => {
    assert.ok(<%= functionName %>, '<%= functionName %> exists');
  });
});
