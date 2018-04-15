'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('prop-types');

var _CreateReactClass = require('create-react-class');

var _twitterText = require('twitter-text');

var _twitterText2 = _interopRequireDefault(_twitterText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _CreateReactClass({

  displayName: 'ReactTwitterText',

  propTypes: {
    redirectCallback: _PropTypes.func,
    tweetText: _PropTypes.string,
    twitterTextOptions: _PropTypes.object,
    twitterURLEntities: _PropTypes.array
  },

  clone: function clone(targetObj) {
    var returnObj = {};

    for (var key in targetObj) {
      if (targetObj.hasOwnProperty(key)) {
        returnObj[key] = targetObj[key];
      }
    }

    return returnObj;
  },
  handleTweetTextLinkClick: function handleTweetTextLinkClick(event) {
    event.preventDefault();

    var eventTarget = event.target;

    if (event.target.nodeName === "SPAN") {
      eventTarget = event.target.parentNode;
    }

    if (eventTarget.nodeName === "A") {
      this.props.redirectCallback(eventTarget.href);
    }
  },
  render: function render() {
    var _props = this.props;
    var tweetText = _props.tweetText;
    var twitterURLEntities = _props.twitterURLEntities;
    var twitterTextOptions = _props.twitterTextOptions;

    var options = this.clone(twitterTextOptions);
    var autoLinkedTweetText = _twitterText2.default.autoLink(_twitterText2.default.htmlEscape(tweetText), _extends({}, options, {
      urlEntities: twitterURLEntities
    }));
    return _react2.default.createElement('p', {
      onClick: this.handleTweetTextLinkClick,
      dangerouslySetInnerHTML: { __html: autoLinkedTweetText }
    });
  }
});