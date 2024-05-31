/* DOKUWIKI:include jquery.cookiebar.js */

(function ($) {
    /** wrapping GA functions */
    window.ga = function () {
        if ('show' != JSINFO.ACT) {
            return;
        }

        if (typeof window.gtag === 'function' && arguments[0] === 'send' && arguments[1] === 'event') {
            window.gtag('event', arguments[3], {
                event_category: arguments[2],
                event_label: arguments[4],
            });
        }
    };

    if ('show' != JSINFO.ACT) {
        return;
    }

    var consentGiven = function ( cookieValue ) {
        cookieValue == 'accepted' && gtag('consent', 'update', {
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });
    };

    var consentDenied = function ( cookieValue ) {
        cookieValue != 'accepted' && gtag('consent', 'update', {
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            ad_storage: 'denied',
            analytics_storage: 'denied'
        });
    };

    $.cookieBar({
        fixed:              true,
        autoEnable:         false,
        bottom:             true,
        forceShow:          true,

        message:            JSINFO.plugins.googleconsent.acceptBody,
        acceptText:         JSINFO.plugins.googleconsent.acceptButton,
        acceptButton:       !!JSINFO.plugins.googleconsent.acceptButton,
        declineText:        JSINFO.plugins.googleconsent.declineButton,
        declineButton:      !!JSINFO.plugins.googleconsent.declineButton,
        policyText:         JSINFO.plugins.googleconsent.policyButton,
        policyButton:       !!JSINFO.plugins.googleconsent.policyButton,
        policyURL:          JSINFO.plugins.googleconsent.policyURL,
        acceptOnContinue:   !!JSINFO.plugins.googleconsent.acceptOnContinue,
        acceptOnScroll:     !!JSINFO.plugins.googleconsent.acceptOnScroll,
        acceptAnyClick:     !!JSINFO.plugins.googleconsent.acceptAnyClick,
        expireDays:         !!JSINFO.plugins.googleconsent.expireDays,
        renewOnVisit:       !!JSINFO.plugins.googleconsent.renewOnVisit,
        forceShow:          !!JSINFO.plugins.googleconsent.forceShow,

        acceptFunction:     consentGiven,
        declineFunction:    consentDenied,
    }) && consentGiven( 'accepted' );

    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({'gtm.start':new Date().getTime(), event: 'gtm.js'});
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
        j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', window.dataLayer[0][1] );

})(jQuery);
