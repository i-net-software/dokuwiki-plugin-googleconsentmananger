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

        if ( cookieValue != "accepted" ) {
            return;
        }

        gtag('consent', 'update', {
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });

        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', dataLayer['config'] );
    };

    $.cookieBar({
        fixed:              true,
        autoEnable:         false,
        bottom:             true,
        policyButton:       true,
        declineButton:      true,
        forceShow:          true,
        // acceptText:         LANG.template['inettpl-4-new'].cookieAcceptButton,
        // policyText:         LANG.template['inettpl-4-new'].cookiePrivacyButton,
        // policyURL:          '/de/company/privacy',
        // acceptOnContinue:   true,
        // message:            LANG.template['inettpl-4-new'].cookieAcceptBody,
        acceptFunction:     consentGiven,
        // declineFunction:    function(cookieValue) {
        // }
    }) && consentGiven();

})(jQuery);