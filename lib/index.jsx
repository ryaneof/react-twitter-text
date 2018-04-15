import React from 'react';
import PropTypes from 'prop-types';
import twttr from 'twitter-text';

export default React.createClass({

  displayName: 'ReactTwitterText',

  propTypes: {
    redirectCallback: PropTypes.func,
    tweetText: PropTypes.string,
    twitterTextOptions: PropTypes.object,
    twitterURLEntities: PropTypes.array
  },

  clone(targetObj) {
    const returnObj = {};

    for (const key in targetObj) {
      if (targetObj.hasOwnProperty(key)) {
        returnObj[key] = targetObj[key];
      }
    }

    return returnObj;
  },

  handleTweetTextLinkClick(event) {
    event.preventDefault();

    let eventTarget = event.target;

    if (event.target.nodeName === "SPAN") {
      eventTarget = event.target.parentNode;
    }

    if (eventTarget.nodeName === "A") {
      this.props.redirectCallback(eventTarget.href);
    }
  },

  render() {
    const { tweetText, twitterURLEntities, twitterTextOptions } = this.props;
    const options = this.clone(twitterTextOptions);
    const autoLinkedTweetText = twttr.autoLink(twttr.htmlEscape(tweetText), {
      ...options,
      urlEntities: twitterURLEntities
    });
    return (
      <p
        onClick={ this.handleTweetTextLinkClick }
        dangerouslySetInnerHTML={{ __html: autoLinkedTweetText }}
      />
    );
  }
});

