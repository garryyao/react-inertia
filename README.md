# react-inertia

An inertia touch scroll [React](http://facebook.github.io/react/) component come up to native scrolling experience and performance.

[Demo](http://souhe.github.io/reactScrollbar)

```bash
npm install react-inertia --save
```

## Usage examples

```js
    var React = require('react');
    var ScrollArea = require('react-inertia');

    var App = React.createClass({
      render: function() {
        return (
          <Scrollable
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            ... lots of content here...
          </Scrollable>
        );
      }
    });

    React.render(<App/>, document.body);
```

### Run the example app

```bash
git clone https://github.com/souhe/reactScrollbar.git
cd reactScrollbar
npm install
gulp
```

then open [http://localhost:8003](http://localhost:80003).

## API

### Props

```js
    <ScrollArea
        speed={Number}
        className={String}
        contentClassName={String}
        horizontal={Boolean}
        vertical={Boolean}
    >
```

#### speed
Scroll speed applied to mouse wheel event.
**Default: 1**

#### className
CSS class names added to main scroll area component.

#### contentClassName
CSS class names added to element with scroll area content.

#### horizontal
When set to false, horizontal scrollbar will not be available.
**Default: true**

#### vertical
When set to false, vertical scrollbar will not be available, regardless of the content height.
**Default: true**
