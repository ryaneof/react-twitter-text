import React, { PropTypes } from 'react';
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
    this.props.redirectCallback(event.target.href);
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

