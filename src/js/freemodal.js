function generateIframeModalHtml($options) {

    var $iframeModalTemplate = "<div id='{id}' class='freemodal freemodal-iframe loading'><button data-freemodal-target='#{id}' data-freemodal-overlay-target='#{overlay_id}' class='freemodal-close'>{close_text}</button><div class='freemodal-inner {loader}'><iframe height='{height}' src='{src}'></iframe></div></div><div id='{overlay_id}' class='freemodal-overlay'></div>";

    var $modalHtml = $iframeModalTemplate
        .replace(/{id}/g, $options.freemodalId)
        .replace(/{overlay_id}/g, $options.freemodalOverlayId)
        .replace(/{height}/g, $options.freemodalIframeHeight)
        .replace(/{close_text}/g, $options.freemodalIframeCloseHtml)
        .replace(/{loader}/g, $options.freemodalIframeLoader)
        .replace(/{src}/g, $options.freemodalIframeUrl);

    return $modalHtml;
}

jQuery(function () {

    /**
     * Apertura modale
     */
    jQuery("body").on("click", "button", function () {

        var $key = Math.floor((Math.random() * 1000000000) + 1);
        var $t = jQuery(this);
        var $options = {
            'freemodalId': "freemodal-" + $key,
            'freemodalOverlayId': "freemodal-overlay-" + $key,
            'freemodalIframeUrl': null,
            'freemodalIframeHeight': 400,
            'freemodalIframeLoader': '',
            'freemodalIframeCloseHtml': 'Close',
        };

        jQuery.extend($options, $t.data());

        if ($options['freemodalIframeUrl']) {
            var $modalHtml = generateIframeModalHtml($options);
            jQuery("body").append($modalHtml);
            var $modal = jQuery("#" + $options.freemodalId);
            $modal.find("iframe").on("load", function () {
                $modal.removeClass("loading");
            });
        }

    });


    /**
     * Chiusura modale
     */
    jQuery("body").on("click", "button.freemodal-close", function () {
        var $t = jQuery(this);
        var $target = $t.data("freemodal-target");
        var $overlayTarget = $t.data("freemodal-overlay-target");
        jQuery($target).remove();
        jQuery($overlayTarget).remove();
    });

});