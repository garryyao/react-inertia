require.ensure(['../../scrollable'], function () {
  var React = require('react');
  var Scrollable = require('../../scrollable');

  class App extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      var itemElements = [];

      var color;
      for (var i = 0; i < this.props.itemsCount; i++) {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        itemElements.push(<div className="item" style={{'background-color':color}}>item {i}</div>);
      }

      return (
        <div>
          <Scrollable className="area" contentClassName="content">
            {itemElements}
          </Scrollable>
        </div>
      );
    }
  }

  App.defaultProps = {
    itemsCount: 100
  };

  module.exports = App;
});
