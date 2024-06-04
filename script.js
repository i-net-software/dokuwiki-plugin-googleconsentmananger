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
        typeof window.gtag === 'function' && gtag('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted',
            /*functional_storage: 'granted',
            personalization_storage: 'granted',
            security_storage: 'granted',*/
        });
    };

    var consentDenied = function ( cookieValue ) {
        typeof window.gtag === 'function' && gtag('consent', 'update', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functional_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'denied',
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

    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({'gtm.start':new Date().getTime(), event: 'gtm.js'});
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
        j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', window.dataLayer[0][1] );

    $.cookieBar( 'cookies' ) && consentGiven( 'accepted' );

})(jQuery);});
