<?php

use dokuwiki\Extension\ActionPlugin;
use dokuwiki\Extension\EventHandler;
use dokuwiki\Extension\Event;

/**
 * DokuWiki Plugin googleconsentmananger (Action Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author i-net /// software <tools@inetsoftware.de>
 */
class action_plugin_googleconsentmananger extends ActionPlugin
{
    const GTMID = 'GTMID';

    /** @inheritDoc */
    public function register(EventHandler $controller)
    {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this, 'handleTplMetaheaderOutput');
    }

    /**
     * Event handler for TPL_METAHEADER_OUTPUT
     *
     * @see https://www.dokuwiki.org/devel:events:TPL_METAHEADER_OUTPUT
     * @param Event $event Event object
     * @param mixed $param optional parameter passed when event was registered
     * @return void
     */
    public function handleTplMetaheaderOutput(Event $event, $param)
    {
        $GTMID = $this->getConf(self::GTMID);
        if(!$GTMID) {
            return;
        }

        $event->data['noscript'][] = array (
            '_data' => '<iframe src="//www.googletagmanager.com/ns.html?id='.$this->getConf(self::GTMID).'" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
        );
        $event->data['script'][] = array (
            'type' => 'text/javascript',
            '_data' => "
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('consent', 'default', {
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500,
            });
            gtag('js', new Date());
            gtag('config', '${GTMID}');
            ",
        );
    }
}
