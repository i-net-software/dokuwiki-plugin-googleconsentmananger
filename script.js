/* DOKUWIKI:include jquery.cookiebar.js */

jQuery(function(){(function($) {
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
        cookieValue == 'accepted' && typeof window.gtag === 'function' && gtag('consent', 'update', {
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            ad_storage: 'granted',
            analytics_storage: 'granted'
        });

        (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({'gtm.start':new Date().getTime(), event: 'gtm.js'});
            var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
            j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', window.dataLayer[0][1] );
    };

    var consentDenied = function ( cookieValue ) {
        cookieValue != 'accepted' && typeof window.gtag === 'function' && gtag('consent', 'update', {
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            ad_storage: 'denied',
            analytics_storage: 'denied'
        });
    };

    var getTemplateOrPluginOption = function ( name ) {
        return ( LANG.template && LANG.template[ JSINFO.plugins.googleconsent.template ] ? LANG.template[ JSINFO.plugins.googleconsent.template ][ name ] : undefined ) || JSINFO.plugins.googleconsent[name];
    };

    
    $.cookieBar({
        fixed:              true,
        autoEnable:         false,
        bottom:             true,
        forceShow:          true,
        append:             true,

        message:            getTemplateOrPluginOption('acceptBody'),
        acceptText:         getTemplateOrPluginOption('acceptButton'),
        acceptButton:       !!getTemplateOrPluginOption('acceptButton'),
        declineText:        getTemplateOrPluginOption('declineButton'),
        declineButton:      !!getTemplateOrPluginOption('declineButton'),
        policyText:         getTemplateOrPluginOption('policyButton'),
        policyButton:       !!getTemplateOrPluginOption('policyButton'),
        policyURL:          getTemplateOrPluginOption('policyURL'),
        acceptOnContinue:   !!JSINFO.plugins.googleconsent.acceptOnContinue,
        acceptOnScroll:     !!JSINFO.plugins.googleconsent.acceptOnScroll,
        acceptAnyClick:     !!JSINFO.plugins.googleconsent.acceptAnyClick,
        expireDays:         !!JSINFO.plugins.googleconsent.expireDays,
        renewOnVisit:       !!JSINFO.plugins.googleconsent.renewOnVisit,
        forceShow:          !!JSINFO.plugins.googleconsent.forceShow,

        acceptFunction:     consentGiven,
        declineFunction:    consentDenied,
    });

    $.cookieBar( 'cookies' ) && consentGiven( 'accepted' );

})(jQuery);});
